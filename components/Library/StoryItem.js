import {
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/styles";
import { sentencesSample } from "../../assets/mocks";
import { useContext } from "react";
import { GlobalContext } from "../../context/global-context";
import MaskedText from "../UI/MaskedText";
function getEmoji(language) {
  return language.slice(0, 4);
}

function StoryItem({
  id,
  title,
  learning_lc,
  known_lc,
  status,
  isLeaf,
}) {
  const navigation = useNavigation();
  const { data, setData } = useContext(GlobalContext);

  function storyPressHandler() {
    // if this is the leaf of a story, play
    if (isLeaf == true) {
      navigation.navigate("PlayStory", { storyId: id });
      return;
    }
    // TODO: make a setShowLibraryBackButton
    setData({ ...data, showLibraryBackButton: true });
    navigation.navigate("Library", {
      parentId: id,
    });
  }

  //   return (
  //     <Pressable
  //       onPress={storyPressHandler}
  //       style={({ pressed }) => pressed && styles.pressed}
  //     >
  //       <View style={styles.StoryItem}>
  //         <View>
  //           <Text style={[styles.textBase, styles.title]}>
  //             {title}
  //           </Text>
  //           <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
  //         </View>
  //         <View style={styles.amountContainer}>
  //           <Text style={styles.amount}>{amount.toFixed(2)}</Text>
  //         </View>
  //       </View>
  //     </Pressable>
  //   );
  // }
  // console.log("in story item");
  // console.log(id);
  // const text = "this is barcelona, a very nice city";
  return (
    // TODO: use Pressable in Android and TouchableWithoutFeedback
    // for the web via Platform.select
    // TODO marc: start by using the same button everywhere
    <TouchableWithoutFeedback
      onPress={storyPressHandler}
      style={styles.StoryItemWrapper}
    >
      <View style={styles.StoryItem}>
        <View>
          <Text style={[styles.textBase, styles.title]}>{title}</Text>
        </View>
        <View style={styles.langsContainer}>
          <Text style={styles.language}>{getEmoji(learning_lc)}</Text>
          <Text style={styles.language}>{getEmoji(known_lc)}</Text>
        </View>
        <View style={styles.langsContainer}>
          <Text style={styles.status}>{status}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default StoryItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  StoryItemWrapper: {},
  StoryItem: {
    // TODO: extract some style from here to merge with
    // sentences in PlayStory
    margin: "2.5%",
    width: "45%",
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 12,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    textAlign: "center",
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  title: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 4,
    fontWeight: "bold",
    textAlign: "center",
  },
  langsContainer: {
    // paddingHorizontal: 12,
    // paddingVertical: 4,
    // backgroundColor: "white",
    // justifyContent: "center",
    // alignItems: "center",
    // borderRadius: 4,
    // minWidth: 80,
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
    fontSize: 15,
    textAlignVertical: "center",
  },
});
