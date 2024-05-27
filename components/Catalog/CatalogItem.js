import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/styles";
import { useContext } from "react";
import { GlobalContext } from "../../context/global-context";
import Button from "../UI/Button";
import { Image } from "react-native";
import { langValueToLogo } from "../../constants/languages";

function CatalogItem({
  id,
  title,
  languages,
  num_episodes,
  done,
  total,
  parent_id,
}) {
  function renderLanguage(lang) {
    return (
      <Image
        id={`${id}_${lang.item}`}
        style={styles.languageIcon}
        source={{ uri: langValueToLogo(lang.item) }}
      />
    );
  }
  console.log(languages);
  return (
    <View style={styles.StoryItemWrapper}>
      <Text style={[styles.textBase, styles.title]}>{title}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{num_episodes}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.statusContainer}>
          <Text style={styles.status}>Learning</Text>
          <FlatList
            data={Object.keys(languages)}
            renderItem={renderLanguage}
            numColumns={2}
            style={{ alignItems: "center" }}
          />
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.status}>Translations</Text>
          <FlatList
            data={[...new Set(Object.values(languages).flat())]}
            renderItem={renderLanguage}
            numColumns={2}
            style={{ alignItems: "center" }}
          />
        </View>
      </View>
    </View>
    // </Button>
  );
}

export default CatalogItem;

const styles = StyleSheet.create({
  pressed: {
    borderColor: GlobalStyles.colors.primary50,
    borderWidth: 2,
  },
  StoryItemWrapper: {
    flex: 1 / 2,
    // TODO: extract some style from here to merge with
    // sentences in PlayStory
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 12,
    textAlign: "center",
    margin: "2%",
    minHeight: 150, // this was before removing langs
    // minHeight: 90,
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
    flex: 0.5,
  },
  language: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    fontSize: 20,
    margin: 5,
  },
  status: {
    color: "white",
    margin: 10,
    fontSize: 13,
    textAlign: "center",
  },
  languageIcon: {
    width: 25,
    height: 25,
    margin: 8,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 25,
    height: 25,
    borderRadius: 12,
    borderColor: GlobalStyles.colors.primary700,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 13,
  },
});
