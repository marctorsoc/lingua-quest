import {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { GlobalStyles } from "../constants/styles";
import { Text, View, StyleSheet } from "react-native";
import StoryList from "../components/StoryList";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { StoryContext } from "../context/stories-context";
import { getDateMinusDays } from "../util/date";
import { fetchStories } from "../util/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayContext } from "../context/play-context";
import { GlobalContext } from "../context/global-context";
import CatalogItem from "../components/Catalog/CatalogItem";

function Catalog(navigation, route) {
  // TODO marc: see example for this in https://reactnative.dev/docs/network
  const [isFetching, setIsFetching] = useState(true);

  // TODO: this library is a mock, but should be
  // retrieved from the API
  const { stories, setStories } = useContext(StoryContext);
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);

  const [error, setError] = useState();

  useEffect(() => {
    async function getStories() {
      try {
        const allStories = await fetchStories();
        console.log("loaded stories");
        setStories(allStories);
      } catch (error) {
        // setError("Could not fetch expenses!");
        console.log("Could not fetch stories!");
      }
    }
    async function getSettings() {
      // console.log("Getting settings from disk");
      const settings = await AsyncStorage.getItem("settings");
      if (settings) {
        // console.log("Setting settings in globalConfig");
        setGlobalConfig(JSON.parse(settings));
      }
      return settings;
    }
    setIsFetching(true);
    getSettings();
    getStories();
    setIsFetching(false);
  }, []);

  useLayoutEffect(() => {
    navigation.navigation.setOptions({
      headerTitleStyle: {
        marginLeft: globalConfig.showLibraryBackButton ? 0 : 30,
      },
    });
  }, [navigation, globalConfig.showLibraryBackButton]);

  let defaultContent = (
    <Text style={styles.infoText}>No stories added yet</Text>
  );

  // console.log(globalConfig.filters);
  // console.log(stories);

  let content = undefined;
  if (stories.length > 0) {
    content = stories
      .filter(
        (story) => story.parent_id === null,
        // story.parent_id === undefined &&
        // story.storyType === globalConfig.filters.storyType &&
      )
      .sort((a, b) => a.title.localeCompare(b.title));
  }
  return (
    <View style={styles.container}>
      {content === undefined || content.length === 0 ? (
        defaultContent
      ) : (
        <StoryList stories={content} renderer={renderCatalogStory} />
      )}
    </View>
  );
}

function renderCatalogStory(itemData) {
  // TODO: try using simply CatalogItem so this function can be removed
  return <CatalogItem {...itemData.item} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
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

export default Catalog;
