import { Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { StyleSheet } from "react-native";
import Button from "../UI/Button";
import { useContext } from "react";
import { PlayContext } from "../../context/play-context";
import { useNavigation } from "@react-navigation/native";

function NextButton() {
  const navigation = useNavigation();
  const { playData, setPlayData } = useContext(PlayContext);
  const answered = playData.currentAnswerIdx !== undefined;
  const isLastSentence =
    playData.currentSentenceIdx === playData.numSentences - 1;

  function onPressNext() {
    if (!answered) return;
    if (isLastSentence) {
      navigation.goBack();
      return;
    }
    setPlayData({
      ...playData,
      currentAnswerIdx: undefined,
      currentSentenceIdx: playData.currentSentenceIdx + 1,
    });
  }
  // console.log(text);
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
          {isLastSentence ? "Finish" : "Next"}
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
