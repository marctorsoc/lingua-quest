import React from "react";
import IconButton from "./IconButton";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../../context/global-context";
import { useContext } from "react";
import { ScreensStyles } from "../../constants/styles";

function BackButton({ tintColor, newPage }) {
  const navigation = useNavigation();
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  return (
    globalConfig.showLibraryBackButton && (
      <IconButton
        icon="arrow-back-outline"
        color={tintColor}
        size={24}
        containerStyle={ScreensStyles.headerButtonsContainers}
        onPress={() => {
          navigation.navigate(newPage);
          setGlobalConfig({
            ...globalConfig,
            showLibraryBackButton: false,
            storyLongPressed: undefined,
          });
        }}
      />
    )
  );
}

export default BackButton;
