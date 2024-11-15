import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles, ScreensStyles } from "../../constants/styles";
import { useContext } from "react";
import { GlobalContext } from "../../context/global-context";
import { TUTORIAL_STAGES } from "../../constants/tutorial_stages";

import Button from "../UI/Button";
import { useRouter } from "expo-router";
import { storeData } from "../../util/storage";
import { useTranslation } from "react-i18next";
import { showInformativeAlert } from "../../util/alert";

function StoryItem({ id, title, done, total, is_leaf }) {
  const router = useRouter();
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);
  const { t } = useTranslation();

  // leave like this in case we want to add showTotals again
  let status = "";
  if (is_leaf) {
    status = `${done[globalConfig.filters.learningLanguage]} `;
    const currentTotal = total[globalConfig.filters.learningLanguage];
    const currentDone = done[globalConfig.filters.learningLanguage];
    status += `${t("GLOBAL.OF")} ${currentTotal} `;
    status += `(${Math.floor((currentDone / currentTotal) * 100)} %)`;
  }

  function storyPressHandler() {
    // ignore if storyLongPressed is set
    if (globalConfig.storyLongPressed !== null) return;

    // if null, not in tutorial, so just go to story
    if (globalConfig.tutorialStage !== null) {
      // if in tutorial, ignore if leaf or not the stage to click
      const ignore =
        !is_leaf ||
        globalConfig.tutorialStage != TUTORIAL_STAGES.PRESS_STORY;
      if (ignore) {
        console.log(
          "Ignoring bc stage: " + globalConfig.tutorialStage
        );
        console.log("and th is " + TUTORIAL_STAGES.PRESS_STORY);
        return;
      }
    }

    // if this is the leaf of a story, play
    if (is_leaf) {
      let updatedGlobalConfig = {
        ...globalConfig,
        lastStoryId: id,
      };
      if (
        updatedGlobalConfig.tutorialStage ==
        TUTORIAL_STAGES.PRESS_STORY
      )
        updatedGlobalConfig.tutorialStage += 1;

      setGlobalConfig(updatedGlobalConfig);
      storeData(
        "globalConfig-" + globalConfig.userId,
        JSON.stringify(updatedGlobalConfig)
      );
      router.push({
        pathname: "/play/[storyId]",
        params: { storyId: id },
      });
      return;
    }
    router.push({
      pathname: "library/[parentId]",
      params: {
        parentId: id,
        parentTitle: title,
      },
    });
  }
  function storyLongPressHandler() {
    // if this is not the leaf of a story, ignore
    if (!is_leaf) return;

    // if we're in tutorial, just show alert and return
    // but only for the specific stage
    if (globalConfig.tutorialStage !== null) {
      if (globalConfig.tutorialStage !== TUTORIAL_STAGES.LONG_PRESS)
        return;
      showInformativeAlert(t("TUTORIAL.STORY_LONG_PRESS"));
      return;
    }

    setGlobalConfig({
      ...globalConfig,
      storyLongPressed: id,
    });
  }

  let storyItemStyle = [styles.StoryItem];
  if (globalConfig.storyLongPressed === id) {
    storyItemStyle.push(styles.longPressed);
  }

  return (
    <Button
      onPress={storyPressHandler}
      onLongPress={storyLongPressHandler}
      style={styles.StoryItemWrapper}
    >
      <View style={storyItemStyle}>
        <Text style={[styles.title]}>{title}</Text>
        <View style={styles.statusContainer}>
          {is_leaf && <Text style={styles.status}>{status}</Text>}
        </View>
      </View>
    </Button>
  );
}

export default StoryItem;

const styles = StyleSheet.create({
  longPressed: {
    borderColor: GlobalStyles.colors.accent,
    backgroundColor: GlobalStyles.colors.header,
    // borderColor: "orange",
    borderWidth: 2,
  },
  StoryItemWrapper: {
    flex: 1 / 2,
  },
  StoryItem: {
    // TODO: extract some style from here to merge with
    // sentences in PlayStory
    backgroundColor: GlobalStyles.colors.interactiveItem,
    borderRadius: 12,
    ...ScreensStyles.tileShadow,
    textAlign: "center",
    margin: "5%",
    // minHeight: 120,  // this was before removing langs
    minHeight: 90,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 4,
    fontWeight: "bold",
    textAlign: "center",
    color: GlobalStyles.colors.white,
    // backgroundColor: "green",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  status: {
    color: GlobalStyles.colors.lightGray,
    margin: 10,
    fontSize: 14,
    verticalAlign: "middle",
  },
});
