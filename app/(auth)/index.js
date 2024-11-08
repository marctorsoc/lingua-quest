import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import {
  GlobalContext,
  initialGlobalData,
} from "../../src/context/global-context";
import { storeData } from "../../src/util/storage";
import { showInformativeAlert } from "../../src/util/alert";
import {
  AuthStyles,
  LibraryStyles,
} from "../../src/constants/styles";
import { useTranslation } from "react-i18next";

import WelcomeForm from "../../src/components/Auth/WelcomeForm";
import { PickerInput } from "../../src/components/UI/PickerInput";
import { LanguageOptionsNoLabel } from "../../src/constants/languages";
import i18next from "i18next";
import {
  initialPlayData,
  PlayContext,
} from "../../src/context/play-context";

function Welcome() {
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const { setPlayData } = useContext(PlayContext);
  const router = useRouter();
  const { t } = useTranslation();
  const [inputAppLanguage, setInputAppLanguage] = useState(
    i18next.language ? i18next.language : "en"
  );

  useEffect(() => {
    // setIsFetching(true);
    i18next.changeLanguage(inputAppLanguage);
    // setIsFetching(false);
  }, [inputAppLanguage]);

  useEffect(() => {
    setInputAppLanguage(globalConfig.appLanguage);
  }, [globalConfig.appLanguage]);

  async function signUpHandler(welcomeFormData) {
    // save to context and local storage
    const updatedGlobalConfig = {
      ...initialGlobalData,
      filters: {
        ...globalConfig.filters,
        ...welcomeFormData.filters,
      },
      appLanguage: welcomeFormData.appLanguage,
      userId: welcomeFormData.userInfo.userId,
      tutorialStage: welcomeFormData.skipTutorial ? null : 0,
    };
    setGlobalConfig(updatedGlobalConfig);
    setPlayData(initialPlayData);

    storeData("lastUser", updatedGlobalConfig.userId);
    storeData(
      "globalConfig-" + updatedGlobalConfig.userId,
      JSON.stringify(updatedGlobalConfig)
    );

    showInformativeAlert(t("AUTH.SIGNUP.ALERT_DATA_STORED"));
    router.navigate("library");
  }

  return (
    <View style={AuthStyles.container}>
      {/* TODO: remove if not needed anymore */}
      <Text style={[LibraryStyles.label, AuthStyles.title]}>
        {t("AUTH.SIGNUP.TITLE")}
      </Text>
      {/* {userInfo && <WelcomeForm></WelcomeForm>} */}
      {/* TODO: Create a component for this */}
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
      <Image
        source={require("../../assets/tutorial_mascot.png")}
        style={[AuthStyles.mascotImage]}
      />
      <WelcomeForm onSignUp={signUpHandler} />
    </View>
  );
}

export default Welcome;
