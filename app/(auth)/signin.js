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
import WelcomeForm from "../../src/components/Library/WelcomeForm";

function Welcome() {
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const router = useRouter();
  // console.log(globalConfig.filters);

  async function signInHandler(welcomeFormData) {
    const globalConfigFromDisk = await loadData(
      "globalConfig-" + welcomeFormData.userInfo.userId,
    );
    setGlobalConfig(JSON.parse(globalConfigFromDisk));

    showInformativeAlert("Data restored. Ready to play");
    storeData("lastUser", welcomeFormData.userInfo.userId);
    router.navigate("(tabs)/library");
  }

  return (
    <View style={styles.container}>
      <Text style={LibraryStyles.label}>Resume a language quest</Text>
      <WelcomeForm
        onSignIn={signInHandler}
        //   onSignUp={signInHandler}
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
