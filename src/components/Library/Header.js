import { Image, StyleSheet, Text, View } from "react-native";
import {
  GlobalStyles,
  languageFlag,
  ScreensStyles,
} from "../../constants/styles";
import IconButton from "../UI/IconButton";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { GlobalContext } from "../../context/global-context";
import { logos } from "../../constants/languages";
import { TUTORIAL_STAGES } from "../../constants/tutorial_stages";

import { useTranslation } from "react-i18next";

export const HeaderLeft = ({ tintColor }) => {
  const { globalConfig } = useContext(GlobalContext);
  const { t } = useTranslation();
  const highlightStyle =
    globalConfig.tutorialStage == TUTORIAL_STAGES.HIGHLIGHT_HEADER
      ? styles.highlightHeaderSection
      : {};
  return (
    <View style={[styles.headerLeftView, highlightStyle]}>
      {/* <Ionicons name="document" size={18} color="white" /> */}
      {/* <Text
        style={{ color: tintColor, fontSize: 18, fontWeight: "bold" }}
      >
        {/* LinguaQuest ({globalConfig.userId}) */}
      {/* {globalConfig.userId}
      </Text> */}
      <Text style={{ color: tintColor, fontSize: 14 }}>{"  "}</Text>
      <Image
        source={logos[globalConfig.filters.learningLanguage]}
        style={languageFlag}
      />
      <Text
        style={{ color: tintColor, fontWeight: "600", fontSize: 14 }}
      >
        {"  "}
        {t("GLOBAL.FROM")}
        {"  "}
      </Text>
      <Image
        source={logos[globalConfig.filters.knownLanguage]}
        style={languageFlag}
      />
    </View>
  );
};

export const HeaderRight = ({ tintColor }) => {
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const router = useRouter();
  // const { deleteStory } = useContext(StoryContext);

  function manageStoryHandler() {
    return (
      globalConfig.storyLongPressed && (
        <IconButton
          icon={"build-outline"}
          size={24}
          color={tintColor}
          containerStyle={ScreensStyles.headerButtonsContainers}
          onPress={() => {
            router.push({
              pathname: "/manageStory/[storyId]",
              params: { storyId: globalConfig.storyLongPressed },
            });
          }}
        />
      )
    );
  }

  // function addAndRemoveStoryHandler() {
  //   function deleteThisStory() {
  //     deleteStory(globalConfig.storyLongPressed);
  //     showInformativeAlert(t("LIBRARY.ALERT_REMOVED_STORY"));
  //   }
  //   return (
  //     <IconButton
  //       icon={globalConfig.storyLongPressed ? "trash-outline" : "add"}
  //       size={24}
  //       color={tintColor}
  //       containerStyle={ScreensStyles.headerButtonsContainers}
  //       onPress={() => {
  //         // if clicked with a story long pressed, delete it
  //         if (globalConfig.storyLongPressed) {
  //           try {
  //             // TODO: right now, only showing confirmation for web
  //             if (Platform.OS != "web") deleteThisStory();
  //             else if (showConfirmation("Remove story?"))
  //               deleteThisStory();
  //           } catch (error) {
  //             let msg =
  //               "Could not delete story - please try again later!";
  //             console.log(msg);
  //             showInformativeAlert(msg);
  //           }
  //           // update globalConfig.storyLongPressed
  //           setGlobalConfig({
  //             ...globalConfig,
  //             storyLongPressed: undefined,
  //           });
  //           return;
  //         }
  //         // otherwise, open modal to add story
  //         showInformativeAlert(t("LIBRARY.ALERT_ADD_STORY"));
  //         //   router.push("AddStory");
  //       }}
  //     />
  //   );
  // }

  function changeLanguagesHandler() {
    const highlightStyle =
      globalConfig.tutorialStage == TUTORIAL_STAGES.HIGHLIGHT_HEADER
        ? styles.highlightHeaderSection
        : {};
    const disabled = globalConfig.tutorialStage !== null;
    return (
      <View>
        <IconButton
          icon={
            globalConfig.storyLongPressed
              ? "close-circle-outline"
              : "language-outline"
          }
          size={24}
          color={tintColor}
          containerStyle={[
            ScreensStyles.headerButtonsContainers,
            highlightStyle,
          ]}
          onPress={() => {
            if (disabled) return;
            if (globalConfig.storyLongPressed) {
              setGlobalConfig({
                ...globalConfig,
                storyLongPressed: null,
              });
              return;
            }
            router.push("changeLanguages");
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {manageStoryHandler()}
      {/* {addAndRemoveStoryHandler()} */}
      {changeLanguagesHandler()}
    </View>
  );
};

const styles = StyleSheet.create({
  headerLeftView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  highlightHeaderSection: {
    borderColor: GlobalStyles.colors.error,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginLeft: 5,
  },
});
