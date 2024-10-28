import { Image, Platform, Text, View } from "react-native";
import { languageFlag, ScreensStyles } from "../../constants/styles";
import IconButton from "../UI/IconButton";
import { useNavigation, useRouter } from "expo-router";
import { useContext } from "react";
import { StoryContext } from "../../context/stories-context";
import { GlobalContext } from "../../context/global-context";
import { findPropertyByKey, logos } from "../../constants/languages";

export const HeaderRight = ({ tintColor }) => {
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const router = useRouter();
  const { deleteStory } = useContext(StoryContext);

  function logoutHandler() {
    return (
      <IconButton
        icon={"exit-outline"}
        size={24}
        color={tintColor}
        containerStyle={ScreensStyles.headerButtonsContainers}
        onPress={() => {
          router.navigate({
            pathname: "/(auth)",
            params: {
              logout: true,
            },
          });
        }}
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
      {logoutHandler()}
    </View>
  );
};
