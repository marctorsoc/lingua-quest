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
import { useTranslation, Trans } from "react-i18next";

import WelcomeForm from "../../src/components/Auth/WelcomeForm";
import { PickerInput } from "../../src/components/UI/PickerInput";
import {
  languageOptions,
  LanguageOptionsNoLabel,
} from "../../src/constants/languages";
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
  // console.log(globalConfig.filters);

  async function signUpHandler(welcomeFormData) {
    // save to context and local storage
    const updatedGlobalConfig = {
      ...globalConfig,
      filters: {
        ...globalConfig.filters,
        ...welcomeFormData.filters,
      },
      appLanguage: welcomeFormData.appLanguage,
      userId: welcomeFormData.userInfo.userId,
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
      <WelcomeForm
        onSignUp={signUpHandler}
        //   onSignIn={signInHandler}
      />
    </View>
  );
}

export default Welcome;
