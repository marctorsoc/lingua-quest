import MaskedText from "../UI/MaskedText";
import { GlobalStyles } from "../../constants/styles";
import { StyleSheet } from "react-native";
import { showInformativeToast } from "../../util/alert";
import * as Clipboard from "expo-clipboard";
import { View, Text } from "react-native";
import { PlayContext } from "../../context/play-context";
import { useContext, useEffect, useState } from "react";
import Button from "../UI/Button";
// import { useToast } from "react-native-toast-notifications";

function SentenceItem({
  index,
  text,
  translation,
  masked_range,
  correct_answer_idx,
  playingThisItem,
  reviewingThisAnswer,
  alreadyPlayedItem,
}) {
  const validSentence = correct_answer_idx !== -1;
  const showMasked =
    playingThisItem && !reviewingThisAnswer && validSentence;
  const [showTranslation, setShowTranlsation] = useState(
    playingThisItem && reviewingThisAnswer,
  );
  const maskStyle =
    playingThisItem && (!validSentence || reviewingThisAnswer)
      ? styles.revealedMaskedText
      : {};

  const { playData, setPlayData } = useContext(PlayContext);
  // const toast = useToast();
  useEffect(() => {
    setShowTranlsation(reviewingThisAnswer);
  }, [reviewingThisAnswer]);
  // TODO marc: this console.log appears many many times.
  // Might be due to the key. Check TODO in SentenceList
  // console.log(data.currentAnswer);

  function showTextHandler() {
    const valid_masked_range =
      masked_range !== null ? masked_range : [0, 0];
    return (
      <View>
        <MaskedText
          style={[styles.textBase, styles.title]}
          text={text}
          masked_range={valid_masked_range}
          maskEnabled={showMasked}
          maskStyle={maskStyle}
        ></MaskedText>
      </View>
    );
  }
  function onSentenceSelected() {
    if (!alreadyPlayedItem) return;
    setShowTranlsation(!showTranslation);
    setPlayData({
      ...playData,
      processingClickedTranslation: true,
    });
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

  async function sentenceLongPressHandler() {
    Clipboard.setStringAsync(text);
    showInformativeToast(text);
    // showInformativeToast(toast, text);
  }

  const sentenceItemStyle = [
    styles.SentenceItem,
    alreadyPlayedItem && styles.alreadyPlayedSentenceItem,
  ];

  return (
    <View style={sentenceItemStyle}>
      <View style={styles.IndexItem}>
        <Text style={styles.IndexText}>{index + 1}</Text>
      </View>
      <Button
        style={styles.textsContainer}
        onPress={onSentenceSelected}
        onLongPress={sentenceLongPressHandler}
      >
        {showTextHandler()}
        {showTranslationHandler()}
      </Button>
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
    marginRight: 20,
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
    // elevation: 3,
    // boxshadowColor: GlobalStyles.colors.gray500,
    // boxShadowRadius: 4,
    // boxShadowOffset: { width: 1, height: 1 },
    // boxShadowOpacity: 0.4,
    textAlign: "center",
  },
  alreadyPlayedSentenceItem: {
    backgroundColor: GlobalStyles.colors.primary500a,
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
