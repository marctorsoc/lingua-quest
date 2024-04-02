// A modal appearing after clicking the
// filter button in the library

import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { GlobalStyles, ScreensStyles } from "../constants/styles";
import { GlobalContext } from "../context/global-context";
import { storeData } from "../util/storage";
import { showInformativeAlert } from "../util/alert";
import SortAndFilterForm from "../components/Library/SortAndFilterForm";

function SortAndFilterLibrary({ route, navigation }) {
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);

  console.log(globalConfig.filters);

  function goBack() {
    navigation.navigate("Library");
  }
  function cancelHandler() {
    // in this case, we do this here and not in goBack because
    // goBack is called by submitHandler too, so we'd be setting
    // globalConfig again and colliding with the submitted filters
    setGlobalConfig({
      ...globalConfig,
      showLibraryBackButton: false,
    });
    goBack();
  }

  async function submitHandler(filterData) {
    // save to context and local storage
    console.log(filterData);
    const updatedGlobalConfig = {
      ...globalConfig,
      filters: filterData,
      showLibraryBackButton: false,
    };
    console.log(updatedGlobalConfig);
    setGlobalConfig(updatedGlobalConfig);
    storeData("settings", JSON.stringify(updatedGlobalConfig));

    showInformativeAlert("Data filtered");
    goBack();
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
