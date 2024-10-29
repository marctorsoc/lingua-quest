// Not used atm

import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { GlobalContext } from "../../src/context/global-context";
import { loadData, storeData } from "../../src/util/storage";
import { showInformativeAlert } from "../../src/util/alert";
import SortAndFilterForm from "../../src/components/Library/SortAndFilterForm";
import {
  AuthStyles,
  GlobalStyles,
  LibraryStyles,
} from "../../src/constants/styles";
import WelcomeForm from "../../src/components/Auth/WelcomeForm";
import { useTranslation } from "react-i18next";
import { PickerInput } from "../../src/components/UI/PickerInput";
import i18next from "i18next";
import {
  languageOptions,
  LanguageOptionsNoLabel,
} from "../../src/constants/languages";

function Welcome() {
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const router = useRouter();
  const { t } = useTranslation();
  const [inputAppLanguage, setInputAppLanguage] = useState(
    i18next.language ? i18next.language : "en"
  );
  // console.log(globalConfig.filters);

  async function signInHandler(welcomeFormData) {
    const globalConfigFromDisk = await loadData(
      "globalConfig-" + welcomeFormData.userInfo.userId
    );
    setGlobalConfig(JSON.parse(globalConfigFromDisk));

    showInformativeAlert(t("AUTH.SIGNIN.ALERT_DATA_RESTORED"));
    storeData("lastUser", welcomeFormData.userInfo.userId);
    router.navigate("(tabs)/library");
  }

  useEffect(() => {
    // setIsFetching(true);
    i18next.changeLanguage(inputAppLanguage);
    // setIsFetching(false);
  }, [inputAppLanguage]);

  return (
    <View style={AuthStyles.container}>
      <Text style={[LibraryStyles.label, AuthStyles.title]}>
        {t("AUTH.SIGNIN.TITLE")}
      </Text>
      {/* TODO: Reuse component from auth/index.js */}
      <View style={AuthStyles.appLangContainer}>
        <PickerInput
          style={{}}
          onChangeText={(text) => {
            setInputAppLanguage(text);
          }}
          zIndex={10000}
          value={inputAppLanguage}
          options={LanguageOptionsNoLabel}
        />
      </View>
      <WelcomeForm
        onSignIn={signInHandler}
        //   onSignUp={signInHandler}
      />
    </View>
  );
}

export default Welcome;

const styles = StyleSheet.create({});
