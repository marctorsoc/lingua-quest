import { StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import StoryList from "./StoryList";
import ResumeStory from "./ResumeStory";
import { GlobalContext } from "../../context/global-context";
import { useContext } from "react";

function LibraryOutput({
  stories,
  fallbackText,
  parentId: parentId,
}) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;
  const { globalConfig } = useContext(GlobalContext);

  if (stories.length > 0) {
    content = (
      <StoryList
        stories={stories
          .filter(
            (story) =>
              story.parent_id === parentId &&
              ((story.learning_lc === null &&
                story.known_lc == null) ||
                (story.learning_lc ===
                  globalConfig.learningLanguage &&
                  story.known_lc === globalConfig.knownLanguage)),
          )
          .sort((a, b) => a.title.localeCompare(b.title))}
      />
    );
  }

  return (
    <View style={styles.container}>
      {content}
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
});
