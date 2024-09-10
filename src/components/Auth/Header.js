import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { IconStyle, ScreensStyles } from "../../constants/styles";
import IconButton from "../UI/IconButton";
import {
  showConfirmation,
  showInformativeAlert,
} from "../../util/alert";
import { useNavigation, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StoryContext } from "../../context/stories-context";
import { GlobalContext } from "../../context/global-context";
import {
  findPropertyByKey,
  languageOptions,
  logos,
} from "../../constants/languages";
import i18next from "i18next";
import { PickerInput } from "../UI/Input";

export const HeaderRight = ({ tintColor }) => {
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const [inputAppLanguage, setInputAppLanguage] = useState(
    i18next.language ? i18next.language : "en",
  );

  useEffect(() => {
    // setIsFetching(true);
    i18next.changeLanguage(inputAppLanguage);
    // setIsFetching(false);
  }, [inputAppLanguage]);

  const languageOptionsProcessed = languageOptions.map((item) => ({
    ...item,
    label: "",
  }));
  function ChangeLanguagePicker() {
    return (
      <PickerInput
        style={styles.picker}
        onChangeText={(text) => {
          setInputAppLanguage(text);
        }}
        zIndex={3000}
        value={inputAppLanguage}
        options={languageOptionsProcessed}
      />
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {ChangeLanguagePicker()}
      {/* <Text style={{ color: tintColor }}>Marc</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: Platform.OS === "web" ? "100%" : "100%",
    height: "100%",
  },
});
