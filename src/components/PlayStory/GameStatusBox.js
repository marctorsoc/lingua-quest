import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PlayContext } from "../../context/play-context";
import { useContext } from "react";
import { GlobalStyles } from "../../constants/styles";

const GameStatusBox = () => {
  const { playData } = useContext(PlayContext);
  const sentencesIndex =
    playData.startIdx == playData.endIdx
      ? "-"
      : `${playData.startIdx + 1}-${playData.endIdx}`;
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Ionicons
          name="document"
          size={18}
          color={GlobalStyles.colors.white}
        />
        <Text style={styles.text}>{sentencesIndex}</Text>
      </View>
      <View style={styles.box}>
        <Ionicons
          name="checkmark-circle-outline"
          size={18}
          color="green"
        />
        <Text style={styles.text}>{playData.numCorrectAnswers}</Text>
      </View>
      <View style={styles.box}>
        <Ionicons name="close-circle-outline" size={18} color="red" />
        <Text style={styles.text}>{playData.numWrongAnswers}</Text>
      </View>
      <View style={styles.box}>
        <Ionicons
          name="exit"
          size={18}
          color={GlobalStyles.colors.white}
        />
        <Text style={styles.text}>{playData.numAnswersToGo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#8A8686",
    // backgroundColor: GlobalStyles.colors.secondaryButton,
    backgroundColor: GlobalStyles.colors.blackText,
  },
  box: {
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: "8%",
    // borderRadius: 5,
    // borderColor: "#8A8686",
    // borderWidth: 1,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default GameStatusBox;
