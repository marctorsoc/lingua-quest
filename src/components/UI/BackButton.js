import React from "react";
import IconButton from "./IconButton";
import { GlobalContext } from "../../context/global-context";
import { useContext } from "react";
import { ScreensStyles } from "../../constants/styles";
import { useNavigation } from "expo-router";

function BackButton({ tintColor, newPage }) {
  const navigation = useNavigation();
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  return (
    <IconButton
      icon="arrow-back-outline"
      color={tintColor}
      size={24}
      containerStyle={ScreensStyles.headerButtonsContainers}
      onPress={() => {
        navigation.navigate(newPage);
        setGlobalConfig({
          ...globalConfig,
          storyLongPressed: undefined,
        });
      }}
    />
  );
}

export default BackButton;
