import { FlatList, StyleSheet, Text, View } from "react-native";
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
      <Text style={[styles.textBase, styles.title]}>{title}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>x{num_episodes}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.languagesContainer}>
          <Text style={styles.languagesLabel}>
            {t("GLOBAL.LEARNING_LANG")}
          </Text>
          <FlatList
            data={Object.keys(languages)}
            renderItem={renderLanguage}
            numColumns={2}
            style={styles.languagesList}
          />
        </View>
        <View style={styles.separator} />
        <View style={styles.languagesContainer}>
          <Text style={styles.languagesLabel}>
            {t("GLOBAL.IN_GAME_TRANSLATIONS")}
          </Text>
          <FlatList
            data={[...new Set(Object.values(languages).flat())]}
            renderItem={renderLanguage}
            numColumns={2}
            style={styles.languagesList}
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
  languagesContainer: {
    flex: 0.5,
  },
  language: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    fontSize: 20,
    margin: 1,
  },
  languagesLabel: {
    color: GlobalStyles.colors.textLight,
    margin: 10,
    marginHorizontal: 5,
    fontSize: 13,
    textAlign: "center",
  },
  languagesList: {
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
    color: GlobalStyles.colors.textLight,
    fontSize: 13,
  },
  separator: {
    width: 1,
    backgroundColor: "gray",
    marginTop: 10, // Adjust the value to your needs
    marginBottom: 5, // Adjust the value to your needs
  },
});
