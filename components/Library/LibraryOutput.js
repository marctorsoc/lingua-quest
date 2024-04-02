import { StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import StoryList from "./StoryList";
import ResumeStory from "./ResumeStory";
import { GlobalContext } from "../../context/global-context";
import { useContext } from "react";

function storyHasAcceptedChildren(story_id, stories, filters) {
  const children = stories.filter(
    (story) =>
      story.parent_id === story_id &&
      (story.is_leaf === false ||
        (story.learning_lc === filters.learningLanguage &&
          story.known_lc === filters.knownLanguage)),
  );
  if (children.length > 0) {
    return true;
  }
  return false;
}

function storyPassesFilters(story, filters) {
  return (
    // no need to check for storyType. Already done in the parent
    story.learning_lc === filters.learningLanguage &&
    story.known_lc === filters.knownLanguage
  );
}

function LibraryOutput({ stories, fallbackText, parentId }) {
  let defaultContent = (
    <Text style={styles.infoText}>{fallbackText}</Text>
  );

  const { globalConfig } = useContext(GlobalContext);
  // console.log(globalConfig.filters);

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
                globalConfig.filters,
              )),
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
      <ResumeStory stories={stories} />
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
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
  debugText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  filterParentContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    backgroundColor: "transparent",
  },
  filterContainer: {
    width: "40%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    backgroundColor: GlobalStyles.colors.primary500,
  },
});
