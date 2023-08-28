import { View, FlatList, StyleSheet } from "react-native";
import AnswerItem from "./AnswerItem";
import { GlobalStyles } from "../../constants/styles";
import NextButton from "./NextButton";

function AnswerBox({ answers, correct_answer_idx }) {
  const validSentence = correct_answer_idx !== -1;
  // console.log("AnswerBox");
  // console.log(correct_answer_idx);
  // console.log(validSentence);
  function renderAnswerItem({ index, item }) {
    return (
      <AnswerItem
        index={index}
        text={item}
        correct_answer={correct_answer_idx}
      />
    );
  }

  return (
    <View style={styles.AnswerBoxContainer}>
      {validSentence && (
        <FlatList
          data={answers}
          renderItem={renderAnswerItem}
          keyExtractor={(index) => index}
          numColumns={2}
        />
      )}
      <NextButton skip={!validSentence}></NextButton>
    </View>
  );
}

export default AnswerBox;

const styles = StyleSheet.create({
  AnswerBoxContainer: {
    backgroundColor: GlobalStyles.colors.primary500,
  },
});
