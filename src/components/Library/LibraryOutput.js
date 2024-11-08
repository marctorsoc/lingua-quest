import { StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import StoryList from "../StoryList";
import { useTranslation } from "react-i18next";

import ResumeStory from "./ResumeStory";
import { GlobalContext } from "../../context/global-context";
import { useContext } from "react";
import TutorialOverlay from "../UI/TutorialOverlay";
import { TUTORIAL_STAGES } from "../../constants/tutorial_stages";

function storyHasAcceptedChildren(story_id, stories, filters) {
  const children = stories.filter(
    (story) =>
      story.parent_id === story_id &&
      (story.is_leaf === false ||
        (Object.keys(story.languages).includes(
          filters.learningLanguage
        ) &&
          story.languages[filters.learningLanguage].includes(
            filters.knownLanguage
          )))
  );
  if (children.length > 0) {
    return true;
  }
  return false;
}

function storyPassesFilters(story, filters) {
  return (
    // no need to check for storyType. Already done in the parent
    Object.keys(story.languages).includes(filters.learningLanguage) &&
    story.languages[filters.learningLanguage].includes(
      filters.knownLanguage
    )
  );
}

function LibraryOutput({ stories, fallbackText, parentId = null }) {
  let defaultContent = (
    <Text style={styles.infoText}>
      {fallbackText || "No stories added yet"}
    </Text>
  );

  const { globalConfig } = useContext(GlobalContext);
  // console.log("globalConfig");
  // console.log(globalConfig);
  // console.log(globalConfig.filters);
  // console.log(stories);

  let content = undefined;
  if (stories.length > 0) {
    content = stories
      .filter(
        (story) =>
          story.parent_id === parentId &&
          // story.storyType === globalConfig.filters.storyType &&
          (story.is_leaf
            ? storyPassesFilters(story, globalConfig.filters)
            : storyHasAcceptedChildren(
                story.id,
                stories,
                globalConfig.filters
              ))
      )
      .sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <View style={styles.container}>
      {content === undefined ? (
        defaultContent
      ) : (
        <StoryList stories={content} />
      )}
      {globalConfig.tutorialStage === null ? (
        <ResumeStory stories={stories} disabled={parentId !== null} />
      ) : (
        <TutorialOverlay
          previousButtonDisabled={globalConfig.tutorialStage == 0}
          nextButtonDisabled={
            globalConfig.tutorialStage == TUTORIAL_STAGES.PRESS_STORY
          }
        />
      )}
    </View>
  );
}

export default LibraryOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.background,
  },
  infoText: {
    color: GlobalStyles.colors.textLight,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
