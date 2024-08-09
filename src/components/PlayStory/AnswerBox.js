import { View, FlatList, Text, StyleSheet } from "react-native";
import AnswerItem from "./AnswerItem";
import { GlobalStyles } from "../../constants/styles";
import NextButton from "./NextButton";

function AnswerBox({ readingMode, answers, correct_answer_idx }) {
  // if answers is undefined, set to array of 4 empty strings
  const validAnswers = answers === null ? ["", "", "", ""] : answers;

  // console.log("AnswerBox");
  // console.log(correct_answer_idx);
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
      {/* Hide AnswerBox if readingMode */}
      {!readingMode && (
        <FlatList
          data={validAnswers}
          renderItem={renderAnswerItem}
          keyExtractor={(item, index) => index}
          numColumns={2}
        />
      )}
      <NextButton
        skip={readingMode || correct_answer_idx == -1}
      ></NextButton>
    </View>
  );
}

export default AnswerBox;

const styles = StyleSheet.create({
  AnswerBoxContainer: {
    backgroundColor: GlobalStyles.colors.primary500,
  },
});
