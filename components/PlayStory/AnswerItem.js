import { Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { StyleSheet } from "react-native";
import Button from "../UI/Button";
import { useContext } from "react";
import { PlayContext } from "../../context/play-context";

function AnswerItem({ index, text, correct_answer }) {
  const { playData, setPlayData } = useContext(PlayContext);
  const thisAnswerSelected = playData.currentAnswerIdx === index;

  // default, keep white
  let textStyle = undefined;
  // if some answer selected
  if (playData.currentAnswerIdx !== undefined) {
    // select correct style if this answer is correct
    if (index == correct_answer)
      textStyle = styles.answerTextSelectedCorrect;
    // otherwise, select wrong style if selected
    // this will keep non-selected answers white
    else if (thisAnswerSelected)
      textStyle = styles.answerTextSelectedWrong;
  }

  function onAnswerSelected() {
    // console.log("Answer" + index + " selected");

    // if there's already an answer, ignore
    if (playData.currentAnswerIdx !== undefined) return;

    setPlayData({
      ...playData,
      currentAnswerIdx: index,
    });
  }
  // console.log(text);
  return (
    <View style={styles.AnswerContainer}>
      <Button style={styles.button} onPress={onAnswerSelected}>
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
    </View>
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
    // backgroundColor: GlobalStyles.colors.primary700,
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
