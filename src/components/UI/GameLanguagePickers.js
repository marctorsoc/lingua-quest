import { View } from "react-native";
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
    <View style={LanguagePickers.inputsLanguagesRow}>
      {/* each of which in a col (label on top of a picker) */}
      <View style={LanguagePickers.inputLanguageCol}>
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
      <View style={LanguagePickers.inputLanguageCol}>
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
