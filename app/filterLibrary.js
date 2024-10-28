import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../src/components/UI/Button";
import { useRouter } from "expo-router";
import { GlobalContext } from "../src/context/global-context";
import { storeData } from "../src/util/storage";
import { showInformativeAlert } from "../src/util/alert";
import SortAndFilterForm from "../src/components/Library/SortAndFilterForm";
import { GlobalStyles } from "../src/constants/styles";
import { useTranslation } from "react-i18next";

function SortAndFilterLibrary() {
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const router = useRouter();
  const { t } = useTranslation();

  // console.log(globalConfig.filters);

  function cancelHandler() {
    router.back();
  }

  async function submitHandler(filterData) {
    // save to context and local storage
    // console.log(filterData);
    const updatedGlobalConfig = {
      ...globalConfig,
      filters: filterData,
    };
    // console.log(updatedGlobalConfig);
    setGlobalConfig(updatedGlobalConfig);
    storeData(
      "globalConfig-" + globalConfig.userId,
      JSON.stringify(updatedGlobalConfig),
    );

    showInformativeAlert(t("FILTER.ALERT_DATA_FILTERED"));
    router.back();
  }
  return (
    <View style={styles.container}>
      <SortAndFilterForm
        onSubmit={submitHandler}
        onCancel={cancelHandler}
        defaultValues={globalConfig.filters}
      />
    </View>
  );
}

export default SortAndFilterLibrary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.background,
  },
});
