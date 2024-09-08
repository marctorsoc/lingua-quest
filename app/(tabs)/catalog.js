import {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { GlobalStyles } from "../../src/constants/styles";
import { Text, View, StyleSheet } from "react-native";
import StoryList from "../../src/components/StoryList";
import ErrorOverlay from "../../src/components/UI/ErrorOverlay";
import LoadingOverlay from "../../src/components/UI/LoadingOverlay";
import { StoryContext } from "../../src/context/stories-context";
import { getDateMinusDays } from "../../src/util/date";
import { fetchStories } from "../../src/util/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayContext } from "../../src/context/play-context";
import { GlobalContext } from "../../src/context/global-context";
import CatalogItem from "../../src/components/Catalog/CatalogItem";
import { loadData } from "../../src/util/storage";

function Catalog() {
  // TODO marc: see example for this in https://reactnative.dev/docs/network
  const [isFetching, setIsFetching] = useState(true);

  // TODO: this library is a mock, but should be
  // retrieved from the API
  const { stories, setStories } = useContext(StoryContext);
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);

  const [error, setError] = useState();

  useEffect(() => {
    console.log("use effect in catalog");
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
      return loadData("settings").then((settings) => {
        if (settings) {
          setGlobalConfig(JSON.parse(settings));
        }
        return settings;
      });
    }
    setIsFetching(true);
    getSettings();
    getStories();
    // this should be triggered every time
    // setGlobalConfig({
    //   ...globalConfig,
    //   storyLongPressed: undefined,
    // });
    setIsFetching(false);
  }, []);

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
