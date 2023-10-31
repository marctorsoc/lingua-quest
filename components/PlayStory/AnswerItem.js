import { Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { StyleSheet } from "react-native";
import Button from "../UI/Button";
import { useContext } from "react";
import { PlayContext } from "../../context/play-context";

function AnswerItem({ index, text, correct_answer }) {
  const { playData, setPlayData } = useContext(PlayContext);
  const thisAnswerSelected = playData.currentAnswerIdx === index;

  // console.log(correct_answer);
  // console.log(index);
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
    // console.log(playData.currentAnswerIdx);
    // console.log(index);
    console.log("onAnswerSelected");
    // ignore if text is empty (invalid sentence) or if already answered
    if (playData.currentAnswerIdx !== undefined) return;
    if (text == "") return;

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
        style={[
          styles.textBase,
          styles.title,
          styles.answerText,
          textStyle,
        ]}
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
    height: 80,
    borderColor: "white",
    borderWidth: 0.5,
    // backgroundColor: "blue",
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
    alignSelf: "center",
  },
  answerTextSelectedCorrect: {
    color: "green",
  },
  answerTextSelectedWrong: {
    color: "red",
  },
});
