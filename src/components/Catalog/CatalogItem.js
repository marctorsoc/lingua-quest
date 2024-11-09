import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/styles";
import { useContext } from "react";
import { GlobalContext } from "../../context/global-context";
import Button from "../UI/Button";
import { Image } from "react-native";
import { logos } from "../../constants/languages";
import { useTranslation } from "react-i18next";

function CatalogItem({
  id,
  title,
  languages,
  num_episodes,
  done,
  total,
  parent_id,
}) {
  const { t } = useTranslation();
  function renderLanguage(lang) {
    return (
      <Image
        id={`${id}_${lang.item}`}
        style={styles.languageIcon}
        source={logos[lang.item]}
      />
    );
  }
  return (
    <View style={styles.StoryItemWrapper}>
      {/* Movie Title */}
      <Text style={[styles.textBase, styles.title]}>{title}</Text>

      {/* Two columns for the labels of each type */}
      <View style={{ flexDirection: "row", marginTop: "3%" }}>
        <Text style={styles.languagesLabel}>
          {t("GLOBAL.LEARNING_LANG")}
        </Text>
        <View style={styles.verticalDivider} />
        <Text style={styles.languagesLabel}>
          {t("GLOBAL.TRANSLATIONS")}
        </Text>
      </View>

      <View style={styles.horizontalDivider} />

      {/* Two columns for the flags of each type */}
      <View style={{ flexDirection: "row" }}>
        <FlatList
          data={Object.keys(languages)}
          renderItem={renderLanguage}
          numColumns={2}
          style={styles.languagesList}
        />
        <View style={styles.verticalDivider} />
        <FlatList
          data={[...new Set(Object.values(languages).flat())]}
          renderItem={renderLanguage}
          numColumns={2}
          style={styles.languagesList}
        />
      </View>
      <View style={{ marginTop: "10%" }}></View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>x{num_episodes}</Text>
      </View>
    </View>
  );
}

export default CatalogItem;

const styles = StyleSheet.create({
  StoryItemWrapper: {
    flex: 1 / 2,
    flexDirection: "column",
    // TODO: extract some style from here to merge with
    // sentences in PlayStory
    // backgroundColor: GlobalStyles.colors.interactiveItem,
    borderColor: GlobalStyles.colors.interactiveItem,
    borderWidth: 1,
    borderRadius: 12,
    textAlign: "center",
    marginBottom: "5%",
    marginTop: "2%",
    marginHorizontal: "2%",
    minHeight: 150, // this was before removing langs
  },
  textBase: {
    color: GlobalStyles.colors.header,
  },
  title: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 4,
    fontWeight: "bold",
    textAlign: "center",
  },
  languagesLabel: {
    color: GlobalStyles.colors.header,
    marginHorizontal: 5,
    fontSize: 13,
    textAlign: "center",
    flex: 1 / 2,
  },
  languagesList: {
    flex: 1 / 2,
    alignItems: "center",
    borderTopWidth: 1, // Adding a border only at the bottom
    borderColor: "gray", // Color of the border
  },
  languageIcon: {
    width: 25,
    height: 25,
    margin: 10,
  },
  badge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 25,
    height: 25,
    borderRadius: 8,
    borderColor: "gray",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: GlobalStyles.colors.header,
    fontSize: 13,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: GlobalStyles.colors.gray,
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: GlobalStyles.colors.gray,
  },
});
