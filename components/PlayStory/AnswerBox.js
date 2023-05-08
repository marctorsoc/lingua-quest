import { Text, View, FlatList, StyleSheet } from "react-native";
import AnswerItem from "./AnswerItem";
import { GlobalStyles } from "../../constants/styles";
import Button from "../UI/Button";
import { useContext } from "react";
import { PlayContext } from "../../context/play-context";
import NextButton from "./NextButton";

function AnswerBox({ answers, correct_answer }) {
  function renderAnswerItem({ index, item }) {
    return (
      <AnswerItem
        index={index}
        text={item}
        correct_answer={correct_answer}
      />
    );
  }

  return (
    <View style={styles.AnswerBoxContainer}>
      <FlatList
        data={answers}
        style={{ flex: 1 }}
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
    // TODO marc: playing with this number not great
    // optimal for android is 31%
    // height: "31%",
    backgroundColor: GlobalStyles.colors.primary500,
    marginTop: "2%",
  },
});
