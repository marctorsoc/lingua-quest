import {
  React,
  useContext,
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import { StyleSheet, View } from "react-native";
import LoadingOverlay from "../../src/components/UI/LoadingOverlay";
import {
  GlobalStyles,
  ScreensStyles,
} from "../../src/constants/styles";
import { StoryContext } from "../../src/context/stories-context";
import { sleep } from "../../src/util/debug";
import SentenceList from "../../src/components/PlayStory/SentenceList";
import AnswerBox from "../../src/components/PlayStory/AnswerBox";
import { PlayContext } from "../../src/context/play-context";
import { initialPlayData } from "../../src/context/play-context";
import { GlobalContext } from "../../src/context/global-context";
import GameStatusBox from "../../src/components/PlayStory/GameStatusBox";
import { storeData } from "../../src/util/storage";
import { fetchSentences } from "../../src/util/http";
import { useLocalSearchParams, useNavigation } from "expo-router";
import ConfettiCannon from "react-native-confetti-cannon";

function PlayStory() {
  // TODO: move all logic here into components
  const { stories } = useContext(StoryContext);
  const { globalConfig } = useContext(GlobalContext);
  const { playData, setPlayData } = useContext(PlayContext);
  const [sentences, setSentences] = useState();
  // TODO marc: isLoading = false fails. Why ¿?¿?
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  // console.log("currentAnswerIdx: " + playData.currentAnswerIdx);
  let { storyId } = useLocalSearchParams();
  storyId = storyId || playData.storyId;
  const story = stories.find((story) => story.id === storyId);
  // TODO marc: this is shown multiple times so we are rendering
  // more than needed
  // console.log("story.done");
  // console.log(story.done);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: story.title,
    });
  }, []);

  useEffect(() => {
    async function getSentences() {
      setIsLoading(true);
      console.log("loading sentences");
      try {
        // TODO: surely when not loading from disk we will
        // pass storyId here and avoid retrieving ALL sentences
        const learningLanguage =
          globalConfig.filters.learningLanguage;
        const sentencesForStory = await fetchSentences(
          storyId,
          learningLanguage
        );

        // console.log(globalConfig);

        // keep only next + last historyLength games
        const numPrevSentences =
          globalConfig.historyLength *
          globalConfig.numSentencesPerGame;
        const requestStartIdx = Math.max(
          0,
          story.done[learningLanguage] - numPrevSentences
        );
        const requestEndIdx = Math.min(
          story.total[learningLanguage],
          story.done[learningLanguage] +
            globalConfig.numSentencesPerGame
        );
        const requestedSentences = [
          ...sentencesForStory.slice(requestStartIdx, requestEndIdx),
        ];
        // console.log("requested sentences");
        // console.log(requestedSentences);
        await sleep(0.1);
        setSentences(requestedSentences);
        const playLength =
          requestEndIdx - story.done[learningLanguage];
        setPlayData({
          ...initialPlayData,
          // keep celebrate from previous iteration
          // so it's run just once
          celebrate: playData.celebrate,
          numSentences: playLength,
          numAnswersToGo: playLength,
          currentSentenceIdx: story.done[learningLanguage],
          startIdx: story.done[learningLanguage],
          endIdx: requestEndIdx,
          startHistoryIdx: requestStartIdx,
          storyId: storyId,
        });
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

  let currentSentence = {};
  const localCurrentSentenceIdx =
    playData.currentSentenceIdx - playData.startHistoryIdx;
  currentSentence = { ...sentences[localCurrentSentenceIdx] };
  if (currentSentence.correctAnswerIdx == -1) {
    // skip this sentence and mark as correct
    // TODO marc: continue here
  }
  return (
    <View style={styles.mainContainer}>
      <ConfettiCannon
        autoStart={playData.celebrate}
        count={150}
        explosionSpeed={500}
        // fallSpeed={3000}
        origin={{ x: -10, y: 0 }}
      />
      <GameStatusBox />
      <SentenceList sentences={sentences} />
      <AnswerBox
        readingMode={globalConfig.readingMode}
        {...currentSentence}
      ></AnswerBox>
    </View>
  );
}

export default PlayStory;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background,
  },
});
