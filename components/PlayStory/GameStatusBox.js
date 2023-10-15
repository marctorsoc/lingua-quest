import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PlayContext } from "../../context/play-context";
import { useContext } from "react";

const GameStatusBox = () => {
  const { playData } = useContext(PlayContext);
  //   console.log(playData);
  const sentencesIndex =
    playData.startIdx == playData.endIdx
      ? "-"
      : `${playData.startIdx + 1}-${playData.endIdx}`;
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>
          <Ionicons name="document" size={18} color="white" />:{" "}
          {sentencesIndex}
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>
          <Ionicons
            name="checkmark-circle-outline"
            size={18}
            color="green"
          />
          : {playData.numCorrectAnswers}
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>
          <Ionicons
            name="close-circle-outline"
            size={18}
            color="red"
          />
          : {playData.numWrongAnswers}
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>
          <Ionicons name="exit" size={18} color="white" />:{" "}
          {playData.numAnswersToGo}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#8A8686",
  },
  box: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default GameStatusBox;
