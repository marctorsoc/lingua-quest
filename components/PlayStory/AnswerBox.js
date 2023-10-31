import { View, FlatList, Text, StyleSheet } from "react-native";
import AnswerItem from "./AnswerItem";
import { GlobalStyles } from "../../constants/styles";
import NextButton from "./NextButton";

function AnswerBox({ answers, correct_answer_idx }) {
  const validSentence = correct_answer_idx !== -1;
  // if answers is undefined, set to array of 4 empty strings
  const validAnswers = answers !== null ? answers : ["", "", "", ""];
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
      {
        <FlatList
          data={validAnswers}
          renderItem={renderAnswerItem}
          keyExtractor={(item, index) => index}
          numColumns={2}
        />
      }
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
