import {
  React,
  useContext,
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import { StyleSheet, View } from "react-native";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import {
  GlobalStyles,
  ScreensStyles,
} from "../constants/styles";
import { StoryContext } from "../context/stories-context";
import { sentencesSample } from "../assets/mocks";
import { PickerInput } from "../components/ManageStory/Input";
import { sleep } from "../util/debug";
import SentenceList from "../components/PlayStory/SentenceList";
import AnswerBox from "../components/PlayStory/AnswerBox";
import { PlayContext } from "../context/play-context";
import { initialPlayData } from "../context/play-context";

function PlayStory({ navigation, route }) {
  // TODO: move all logic here into components
  const storyId = route.params.storyId;

  const { stories } = useContext(StoryContext);

  const story = stories.find(
    (story) => story.id === storyId
  );
  // console.log(story);

  const [sentences, setSentences] = useState();
  const { playData, setPlayData } = useContext(PlayContext);
  // TODO marc: isLoading = false fails. Why ¿?¿?
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: story.title,
      // TODO: this is a big hack
      headerTitleStyle: ScreensStyles.headerTitleStyle,
    });
  }, []);

  useEffect(() => {
    async function getSentences() {
      setIsLoading(true);
      try {
        // const expenses = await fetchSentences(storyId);
        console.log("loading sentences");
        const requestedSentences = [...sentencesSample];
        await sleep(3.5);
        setSentences(requestedSentences);
        // TODO: should we set loading false if error?
        return requestedSentences.length;
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
    const playLength = getSentences();
    console.log("resetting answers");
    setPlayData({
      ...initialPlayData,
      numSentences: playLength,
    });
  }, [navigation]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  console.log("sentences");
  console.log(sentences);
  const currentSentence =
    sentences[playData.currentSentenceIdx];

  console.log(currentSentence);
  return (
    <View style={styles.mainContainer}>
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
