import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/styles";
import { useContext } from "react";
import { GlobalContext } from "../../context/global-context";
import MaskedText from "../UI/MaskedText";
function getEmoji(language) {
  return language.slice(0, 4);
}
import Button from "../UI/Button";

function StoryItem({
  id,
  title,
  learning_lc,
  known_lc,
  done,
  total,
  parent_id,
  is_leaf,
}) {
  const navigation = useNavigation();
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);

  let status = `${done} `;
  if (globalConfig.showTotals) status += `of ${total} `;
  status += `(${Math.floor((done / total) * 100)} %)`;

  function storyPressHandler() {
    // ignore if storyLongPressed is set
    if (globalConfig.storyLongPressed !== undefined) return;

    // if this is the leaf of a story, play
    if (is_leaf) {
      navigation.navigate("PlayStory", { storyId: id });
      return;
    }
    // TODO: make a setShowLibraryBackButton
    setGlobalConfig({ ...globalConfig, showLibraryBackButton: true });
    navigation.navigate("Library", {
      parentId: id,
      parentTitle: title,
    });
  }
  function storyLongPressHandler() {
    // if this is the leaf of a story, play
    // if (is_leaf) return;
    // TODO: make a setShowLibraryBackButton
    setGlobalConfig({
      ...globalConfig,
      showLibraryBackButton: true,
      storyLongPressed: id,
    });
  }
  let story_item_style = [styles.StoryItem];
  if (globalConfig.storyLongPressed === id) {
    story_item_style.push(styles.pressed);
  }

  return (
    <Button
      onPress={storyPressHandler}
      onLongPress={storyLongPressHandler}
      style={styles.StoryItemWrapper}
    >
      <View style={story_item_style}>
        <Text style={[styles.textBase, styles.title]}>{title}</Text>
        <View style={styles.statusContainer}>
          {is_leaf && <Text style={styles.status}>{status}</Text>}
        </View>
      </View>
    </Button>
  );
}

export default StoryItem;

const styles = StyleSheet.create({
  pressed: {
    borderColor: GlobalStyles.colors.primary50,
    borderWidth: 2,
  },
  StoryItemWrapper: {
    flex: 1 / 2,
  },
  StoryItem: {
    // TODO: extract some style from here to merge with
    // sentences in PlayStory
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 12,
    textAlign: "center",
    margin: "5%",
    // minHeight: 120,  // this was before removing langs
    minHeight: 90,
    justifyContent: "center",
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  title: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 4,
    fontWeight: "bold",
    textAlign: "center",
  },
  langsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  language: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
  },
  status: {
    color: "white",
    margin: 10,
    fontSize: 13,
    verticalAlign: "middle",
  },
});
