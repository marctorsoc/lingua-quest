import { useNavigation } from "@react-navigation/native";
import MaskedText from "../UI/MaskedText";
import { GlobalStyles } from "../../constants/styles";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { PlayContext } from "../../context/play-context";
import { useContext } from "react";

function SentenceItem({
  index,
  text,
  translation,
  masked_range,
  playingThisItem,
  reviewingThisAnswer,
}) {
  const showMasked = playingThisItem && !reviewingThisAnswer;
  const showTranslation = playingThisItem && reviewingThisAnswer;
  const maskStyle =
    playingThisItem && reviewingThisAnswer
      ? styles.revealedMaskedText
      : {};

  // TODO marc: this console.log appears many many times.
  // Might be due to the key. Check TODO in SentenceList
  // console.log(data.currentAnswer);

  function showTextHandler() {
    return (
      <View>
        <MaskedText
          style={[styles.textBase, styles.title]}
          text={text}
          masked_range={masked_range}
          maskEnabled={showMasked}
          maskStyle={maskStyle}
        ></MaskedText>
      </View>
    );
  }

  function showTranslationHandler() {
    return (
      showTranslation && (
        <Text style={[styles.textBase, styles.textTranslated]}>
          {translation}
        </Text>
      )
    );
  }

  return (
    <View style={styles.SentenceItem}>
      <View style={styles.IndexItem}>
        <Text style={styles.IndexText}>{index + 1}</Text>
      </View>
      <View style={styles.textsContainer}>
        {showTextHandler()}
        {showTranslationHandler()}
      </View>
    </View>
  );
}

export default SentenceItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  IndexItem: {
    marginLeft: 15,
  },
  IndexText: {
    fontWeight: "bold",
    color: "white",
  },
  SentenceItem: {
    // TODO: extract some style from here to merge with
    // sentences in StoryItem
    padding: 10,
    marginVertical: 15,
    marginHorizontal: 24,
    margin: "2%",
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    alignItems: "center",
    // flexDirection: "column",
    // justifyContent: "space-between",
    borderRadius: 12,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    textAlign: "center",
  },
  textsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
    textAlign: "center",
  },
  textTranslated: {
    color: "orange",
    fontStyle: "italic",
    textAlign: "center",
  },
  revealedMaskedText: {
    color: "green",
    fontStyle: "italic",
  },
});
