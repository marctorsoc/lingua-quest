import MaskedText from "../UI/MaskedText";
import { GlobalStyles, ScreensStyles } from "../../constants/styles";
import { StyleSheet } from "react-native";
import {
  showInformativeAlert,
  showInformativeToast,
} from "../../util/alert";
import * as Clipboard from "expo-clipboard";
import { View, Text } from "react-native";
import { PlayContext } from "../../context/play-context";
import { useContext, useEffect, useState } from "react";
import Button from "../UI/Button";
import { GlobalContext } from "../../context/global-context";
import { TUTORIAL_STAGES } from "../../constants/tutorial_stages";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

function computeShowTranslation(
  playingThisItem,
  answerWasSelected,
  validItem,
  readingMode
) {
  return (
    playingThisItem &&
    (answerWasSelected || !validItem || readingMode)
  );
}

function SentenceItem({
  index,
  text,
  translations,
  masked_range,
  playingThisItem,
  validItem,
}) {
  const { playData, setPlayData } = useContext(PlayContext);
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const router = useRouter();
  const { t } = useTranslation();
  const currentAnswerIdx = playData.currentAnswerIdx;
  // console.log("currentAnswerIdx: ", currentAnswerIdx);
  const answerWasSelected = currentAnswerIdx !== undefined;
  const showMasked =
    playingThisItem &&
    !answerWasSelected &&
    validItem &&
    !globalConfig.readingMode;

  // maskStyle only matters when playing a valid item
  // and determines whether adding textColor=green for
  // for a revealed answer, or not doing so for a masked answer
  const maskStyle =
    playingThisItem && answerWasSelected
      ? styles.revealedMaskedText
      : {};
  const [showTranslation, setShowTranslation] = useState(
    computeShowTranslation(
      playingThisItem,
      answerWasSelected,
      validItem,
      globalConfig.readingMode
    )
  );
  // if (text == "-Hubertas.") {
  //   console.log("text: ", text);
  //   console.log("answerWasSelected: ", answerWasSelected);
  //   console.log("playingThisItem: ", playingThisItem);
  //   console.log("validItem: ", validItem);
  //   console.log("showMasked: ", showMasked);
  //   console.log("showTranslation: ", showTranslation);
  // }

  // const toast = useToast();
  // once an answer is selected, show translation
  useEffect(() => {
    setShowTranslation(
      computeShowTranslation(
        playingThisItem,
        answerWasSelected,
        validItem,
        globalConfig.readingMode
      )
    );
  }, [answerWasSelected, playingThisItem]);
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
    if (playingThisItem) return;
    setShowTranslation(!showTranslation);
    setPlayData({
      ...playData,
      processingClickedTranslation: true,
    });
    if (
      globalConfig.tutorialStage == TUTORIAL_STAGES.SHOW_TRANSLATION
    ) {
      setGlobalConfig({
        ...globalConfig,
        tutorialStage: globalConfig.tutorialStage + 1,
      });
    }
  }

  function showTranslationHandler() {
    return (
      showTranslation && (
        <Text style={[styles.textBase, styles.textTranslated]}>
          {translations[globalConfig.filters.knownLanguage]}
        </Text>
      )
    );
  }

  async function sentenceLongPressHandler() {
    Clipboard.setStringAsync(text);
    // googletranslate://?sl=en&tl=tr&text=hello%20world

    showInformativeToast("Copied to clipboard");

    if (
      globalConfig.tutorialStage == TUTORIAL_STAGES.COPY_CLIPBOARD
    ) {
      setGlobalConfig({
        ...globalConfig,
        tutorialStage: globalConfig.tutorialStage + 1,
      });
      showInformativeAlert(t("TUTORIAL.WELL_DONE"));
      router.navigate("(tabs)/settings");
    }
    // showInformativeToast(toast, text);
  }

  const sentenceItemStyle = [
    styles.SentenceItem,
    !playingThisItem && styles.alreadyPlayedSentenceItem,
  ];

  return (
    <View style={sentenceItemStyle}>
      <View style={styles.IndexItem}>
        <Text style={[styles.textBase, styles.IndexText]}>
          {index + 1}
        </Text>
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
    color: GlobalStyles.colors.white,
  },
  SentenceItem: {
    // TODO: extract some style from here to merge with
    // sentences in StoryItem
    padding: 10,
    marginTop: "3%",
    marginHorizontal: 24,
    backgroundColor: GlobalStyles.colors.interactiveItem,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    ...ScreensStyles.tileShadow,
  },
  alreadyPlayedSentenceItem: {
    backgroundColor: GlobalStyles.colors.interactiveItem,
  },
  textsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textBase: {
    color: GlobalStyles.colors.white,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    // fontWeight: "bold",
    textAlign: "center",
  },
  textTranslated: {
    color: GlobalStyles.colors.lightGray,
    fontStyle: "italic",
    // fontWeight: "bold",
    textAlign: "center",
  },
  revealedMaskedText: {
    color: GlobalStyles.colors.correctAnswer,
    fontStyle: "italic",
  },
});
