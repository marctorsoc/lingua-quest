import { Platform, StyleSheet, View } from "react-native";
import { ScreensStyles } from "../../constants/styles";
import IconButton from "../UI/IconButton";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StoryContext } from "../../context/stories-context";
import { GlobalContext } from "../../context/global-context";
import { LanguageOptionsNoLabel } from "../../constants/languages";
import i18next from "i18next";
import { PickerInput } from "../UI/PickerInput";

export const HeaderLeft = () => {
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);

  const [inputAppLanguage, setInputAppLanguage] = useState(
    i18next.language ? i18next.language : "en"
  );

  useEffect(() => {
    // setIsFetching(true);
    i18next.changeLanguage(inputAppLanguage);
    setGlobalConfig({
      ...globalConfig,
      appLanguage: inputAppLanguage,
    });
    // setIsFetching(false);
  }, [inputAppLanguage]);

  useEffect(() => {
    setInputAppLanguage(globalConfig.appLanguage);
  }, [globalConfig.appLanguage]);

  return (
    <View style={styles.headerLeftView}>
      <View style={{ width: Platform.OS == "web" ? "100%" : "25%" }}>
        <PickerInput
          onChangeText={(text) => {
            setInputAppLanguage(text);
          }}
          zIndex={10000}
          value={inputAppLanguage}
          options={LanguageOptionsNoLabel}
        />
      </View>
    </View>
  );
};

export const HeaderRight = ({ tintColor }) => {
  const router = useRouter();

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

const styles = StyleSheet.create({
  headerLeftView: {
    marginLeft: 20,
  },
});
