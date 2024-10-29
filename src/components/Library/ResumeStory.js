import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { Pressable } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { PlayContext } from "../../context/play-context";
import Button from "../UI/Button";
import { useRouter } from "expo-router";
import { GlobalContext } from "../../context/global-context";
import { useTranslation } from "react-i18next";

function ResumeStory({ stories, disabled }) {
  // TODO: find story that was played the latest and surface
  // to the summary to resume
  // if never played any story, remove
  const { globalConfig } = useContext(GlobalContext);
  const router = useRouter();
  const { t } = useTranslation();

  const storyId = globalConfig.lastStoryId;
  const enabled = storyId !== undefined && !disabled;
  const story = stories.find((story) => story.id === storyId);
  let name = story?.title;

  let status = "";
  const done = story?.done[globalConfig.filters.learningLanguage];

  // skip if this story does not exist for this language
  if (done === undefined) return;

  status = `${done} `;
  const currentTotal =
    story?.total[globalConfig.filters.learningLanguage];
  status += `${t("GLOBAL.OF")} ${currentTotal}`;

  if (story?.parent_title !== null && /^S\d{1,2}E.*/.test(name))
    name = `${story?.parent_title} - ${name}`;
  const msg = `${t("LIBRARY.RESUME")} ${name} (${status})`;

  function ResumeHandler() {
    router.push({
      pathname: "/play/[storyId]",
      params: { storyId: storyId },
    });
    return;
  }

  return (
    enabled && (
      <View style={styles.container}>
        <Button style={styles.button} onPress={ResumeHandler}>
          <Text style={styles.text}>{msg}</Text>
        </Button>
      </View>
    )
  );
}

export default ResumeStory;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: GlobalStyles.colors.secondaryButton,
    borderRadius: 8,
    borderColor: GlobalStyles.colors.header,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {},
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: GlobalStyles.colors.header,
  },
});
