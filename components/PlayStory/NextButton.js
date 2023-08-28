import { Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { StyleSheet } from "react-native";
import Button from "../UI/Button";
import { useContext } from "react";
import { PlayContext } from "../../context/play-context";
import { useNavigation } from "@react-navigation/native";
import { StoryContext } from "../../context/stories-context";
import { storeData } from "../../util/storage";
import { alert } from "../../util/alert";
import { GlobalContext } from "../../context/global-context";

function NextButton({ skip }) {
  const navigation = useNavigation();
  const { playData, setPlayData } = useContext(PlayContext);
  const { globalConfig } = useContext(GlobalContext);
  const { stories, setStories } = useContext(StoryContext);
  const storyId = playData.storyId;
  const answered = skip || playData.currentAnswerIdx !== undefined;
  const isLastSentence =
    playData.currentSentenceIdx ===
    playData.startIdx + playData.numSentences - 1;
  const allCorrect = playData.numWrongAnswers === 0;

  function resetGame() {
    setPlayData({
      ...playData,
      currentAnswerIdx: undefined,
      currentSentenceIdx: playData.startIdx,
      numWrongAnswers: 0,
      numCorrectAnswers: 0,
      numAnswersToGo: playData.numSentences,
    });
  }

  function onPressNext() {
    if (!answered) return;
    if (isLastSentence) {
      if (allCorrect) {
        // set new value for story.done
        const story = stories.find((story) => story.id === storyId);
        const updatedStory = {
          ...story,
          done: playData.endIdx,
        };
        // save to context and local storage
        const updatedStories = stories.map((story) =>
          story.id === updatedStory.id ? updatedStory : story
        );

        setStories(updatedStories);
        storeData("stories", JSON.stringify(updatedStories));

        // show a popup to continue "yes/no"
        if (globalConfig.showConfirmationDialog) askForContinue();

        return;
      }
      // reset game. Needs to be a clean sheet
      resetGame();
      return;
    }
    // not last sentence, so go to next
    setPlayData({
      ...playData,
      currentAnswerIdx: undefined,
      currentSentenceIdx: playData.currentSentenceIdx + 1,
      numAnswersToGo: playData.numAnswersToGo - 1,
    });
  }

  const askForContinue = () => {
    console.log("Asking for confirmation");
    alert(
      "Continue playing?",
      "Do you want to continue?",
      [
        {
          text: "No",
          style: "cancel",
          onPress: () => {
            // console.log("User chose No");
            navigation.goBack();
          },
        },
        {
          text: "Yes",
          onPress: () => {
            // console.log("User chose Yes");
          },
        },
      ],
      { cancelable: false }
    );
  };
  // console.log(playData);
  return (
    <View style={styles.AnswerContainer}>
      <Button onPress={onPressNext}>
        <Text
          // TODO marc: use composed styles here
          style={[
            styles.textBase,
            styles.title,
            styles.answerText,
            answered ? {} : styles.disabledButton,
          ]}
        >
          {isLastSentence
            ? allCorrect
              ? "Finish round"
              : "Repeat"
            : "Next"}
        </Text>
      </Button>
    </View>
  );
}

export default NextButton;

const styles = StyleSheet.create({
  AnswerContainer: {
    paddingVertical: "4%",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 0.5,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  answerText: {
    fontSize: 20,
    textAlign: "center",
  },
  disabledButton: {
    color: "transparent",
  },
});
