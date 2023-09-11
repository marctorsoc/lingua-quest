import {
  React,
  useContext,
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import { StyleSheet, View } from "react-native";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles, ScreensStyles } from "../constants/styles";
import { StoryContext } from "../context/stories-context";
import data from "../assets/data_2023_09_11.json";
import { PickerInput } from "../components/UI/Input";
import { sleep } from "../util/debug";
import SentenceList from "../components/PlayStory/SentenceList";
import AnswerBox from "../components/PlayStory/AnswerBox";
import { PlayContext } from "../context/play-context";
import { initialPlayData } from "../context/play-context";
import { GlobalContext } from "../context/global-context";
import GameStatusBox from "../components/PlayStory/GameStatusBox";
import { storeData } from "../util/storage";

function PlayStory({ navigation, route }) {
  // TODO: move all logic here into components
  const { stories } = useContext(StoryContext);
  const { globalConfig } = useContext(GlobalContext);
  const { playData, setPlayData } = useContext(PlayContext);
  const [sentences, setSentences] = useState();
  // TODO marc: isLoading = false fails. Why ¿?¿?
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const storyId = route.params?.storyId || playData.storyId;
  const story = stories.find((story) => story.id === storyId);
  // TODO marc: this is shown multiple times so we are rendering
  // more than needed
  // console.log("story.done");
  // console.log(story.done);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: story.title,
      // TODO: this is a big hack
      // headerTitleStyle: ScreensStyles.headerTitleStyle,
    });
  }, []);

  useEffect(() => {
    async function getSentences() {
      setIsLoading(true);
      console.log("loading sentences");
      try {
        // const expenses = await fetchSentences(storyId);
        const sentencesForStory = data.sentences.filter(
          (sentence) => sentence.story_id === storyId
        );

        // console.log(globalConfig);

        // keep only next + last historyLength games
        const numPrevSentences =
          globalConfig.historyLength *
          globalConfig.numSentencesPerGame;
        const requestStartIdx = Math.max(
          0,
          story.done - numPrevSentences
        );
        const requestEndIdx = Math.min(
          story.total,
          story.done + globalConfig.numSentencesPerGame
        );
        const requestedSentences = [
          ...sentencesForStory.slice(requestStartIdx, requestEndIdx),
        ];
        // console.log("requested sentences");
        // console.log(requestedSentences);
        await sleep(0.1);
        setSentences(requestedSentences);
        const playLength = requestEndIdx - story.done;
        setPlayData({
          ...initialPlayData,
          numSentences: playLength,
          numAnswersToGo: playLength,
          currentSentenceIdx: story.done,
          startIdx: story.done,
          endIdx: requestEndIdx,
          startHistoryIdx: requestStartIdx,
          storyId: storyId,
        });
        storeData("last_story_id", storyId);
      } catch (error) {
        // setError("Could not fetch expenses!");
        // TODO: use the error state
        console.log("Could not fetch sentences!");
        console.log(error);
        navigation.goBack();
        return;
      } finally {
        // this is run even if there is an error
        setIsLoading(false);
      }
    }

    // this is run only when no error
    getSentences();
    console.log("done loading sentences");
  }, [navigation, story.done]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  // console.log("sentences");
  // console.log(sentences);
  let currentSentence = {};
  const localCurrentSentenceIdx =
    playData.currentSentenceIdx - playData.startHistoryIdx;
  currentSentence = { ...sentences[localCurrentSentenceIdx] };
  if (currentSentence.correctAnswerIdx == -1) {
    // skip this sentence and mark as correct
    // TODO marc: continue here
  }
  // console.log(currentSentence);
  return (
    <View style={styles.mainContainer}>
      <GameStatusBox />
      <SentenceList sentences={sentences} />
      <AnswerBox {...currentSentence}></AnswerBox>
    </View>
  );
}

export default PlayStory;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
