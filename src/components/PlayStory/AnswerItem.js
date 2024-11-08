import { Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { StyleSheet } from "react-native";
import Button from "../UI/Button";
import { useContext } from "react";
import { PlayContext } from "../../context/play-context";
import { GlobalContext } from "../../context/global-context";
import { TUTORIAL_STAGES } from "../../constants/tutorial_stages";

function AnswerItem({ index, text, correct_answer }) {
  const { playData, setPlayData } = useContext(PlayContext);
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const thisAnswerSelected = playData.currentAnswerIdx === index;

  // default, keep white
  let textStyle = undefined;
  // if some answer selected
  if (playData.currentAnswerIdx !== undefined) {
    // select correct style if this answer is correct
    if (index == correct_answer) {
      textStyle = styles.answerTextSelectedCorrect;
    }
    // otherwise, select wrong style if selected
    // this will keep non-selected answers white
    else if (thisAnswerSelected) {
      textStyle = styles.answerTextSelectedWrong;
    }
  }
  let answerContainerStyle = styles.AnswerContainer;

  function onAnswerSelected() {
    // if there's already an answer, ignore
    // ignore if text is empty (invalid sentence) or if already answered
    if (playData.currentAnswerIdx !== undefined) return;
    if (text == "") return;

    if (globalConfig.tutorialStage == TUTORIAL_STAGES.ANSWER) {
      setGlobalConfig({
        ...globalConfig,
        tutorialStage: globalConfig.tutorialStage + 1,
      });
    } else if (globalConfig.tutorialStage != null) return;

    if (index == correct_answer) {
      setPlayData({
        ...playData,
        currentAnswerIdx: index,
        numCorrectAnswers: playData.numCorrectAnswers + 1,
      });
    } else {
      setPlayData({
        ...playData,
        currentAnswerIdx: index,
        numWrongAnswers: playData.numWrongAnswers + 1,
      });
    }
  }

  return (
    <Button style={answerContainerStyle} onPress={onAnswerSelected}>
      <Text
        // TODO marc: use composed styles here
        style={[styles.textBase, styles.answerText, textStyle]}
      >
        {text}
      </Text>
    </Button>
  );
}

export default AnswerItem;

const styles = StyleSheet.create({
  AnswerContainer: {
    flex: 1,
    justifyContent: "center",
    height: 70,
    borderColor: GlobalStyles.colors.background,
    borderWidth: 0.5,
    // backgroundColor: "blue",
  },
  textBase: {
    color: GlobalStyles.colors.white,
  },
  answerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },
  answerTextSelectedCorrect: {
    color: GlobalStyles.colors.correctAnswer,
  },
  answerTextSelectedWrong: {
    color: GlobalStyles.colors.incorrectAnswer,
  },
});
