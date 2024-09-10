// Not used atm

import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { GlobalContext } from "../../src/context/global-context";
import { loadData, storeData } from "../../src/util/storage";
import { showInformativeAlert } from "../../src/util/alert";
import SortAndFilterForm from "../../src/components/Library/SortAndFilterForm";
import {
  GlobalStyles,
  LibraryStyles,
} from "../../src/constants/styles";
import { useTranslation, Trans } from "react-i18next";

import WelcomeForm from "../../src/components/Auth/WelcomeForm";

function Welcome() {
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const router = useRouter();
  const { t } = useTranslation();

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
    storeData("lastUser", updatedGlobalConfig.userId);
    storeData(
      "globalConfig-" + updatedGlobalConfig.userId,
      JSON.stringify(updatedGlobalConfig),
    );

    showInformativeAlert("Data stored. Ready to play");
    router.navigate("library");
  }

  return (
    <View style={styles.container}>
      {/* TODO: remove if not needed anymore */}
      {/* <Text style={LibraryStyles.label}>
        {t("AUTH.SIGNUP.TITLE")}
      </Text> */}
      {/* {userInfo && <WelcomeForm></WelcomeForm>} */}
      <WelcomeForm
        onSignUp={signUpHandler}
        //   onSignIn={signInHandler}
      />
    </View>
  );
}

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
