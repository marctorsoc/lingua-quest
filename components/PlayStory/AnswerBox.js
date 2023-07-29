import { View, FlatList, StyleSheet } from "react-native";
import AnswerItem from "./AnswerItem";
import { GlobalStyles } from "../../constants/styles";
import NextButton from "./NextButton";

function AnswerBox({ answers, correct_answer_idx }) {
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
      <FlatList
        data={answers}
        renderItem={renderAnswerItem}
        keyExtractor={(index) => index}
        numColumns={2}
      />
      <NextButton></NextButton>
    </View>
  );
}

export default AnswerBox;

const styles = StyleSheet.create({
  AnswerBoxContainer: {
    backgroundColor: GlobalStyles.colors.primary500,
  },
});
