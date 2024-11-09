import { Platform, StyleSheet, View } from "react-native";
import { LanguagePickers } from "../../constants/styles";
import { PickerInput } from "./PickerInput";
import { useTranslation } from "react-i18next";
import {
  LanguageOptionsLongNames,
  translationOptions,
} from "../../constants/languages";

export function GameLanguagePickers({
  inputKnownLanguage,
  inputLearningLanguage,
  setInputKnownLanguage,
  setInputLearningLanguage,
}) {
  const { t } = useTranslation();

  return (
    // two (label + picker) blocks in a row, side by side
    <View style={styles.rowContainer}>
      {/* each of which in a col (label on top of a picker) */}
      <View style={styles.inputLanguageCol}>
        <PickerInput
          // style={LanguagePickers.picker}
          label={t("GLOBAL.LEARNING_LANG")}
          onChangeText={(text) => setInputLearningLanguage(text)}
          zIndex={2000}
          value={inputLearningLanguage}
          options={LanguageOptionsLongNames}
        />
      </View>
      {/* A col with label on top of a picker */}
      <View style={styles.inputLanguageCol}>
        <PickerInput
          // style={LanguagePickers.picker}
          label={t("GLOBAL.IN_GAME_TRANSLATIONS")}
          onChangeText={(text) => setInputKnownLanguage(text)}
          zIndex={1000}
          value={inputKnownLanguage}
          options={translationOptions}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 500,
    marginHorizontal: Platform.OS == "web" ? "0" : "20%",
  },
  inputLanguageCol: {
    flexDirection: "column",
    alignItems: "center",
    zIndex: 500,
  },
  languagePicker: {
    // width: Platform.OS === "web" ? "20%" : "100%",
  },
});
