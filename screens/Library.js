import {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import LibraryOutput from "../components/Library/LibraryOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { StoryContext } from "../context/stories-context";
import { getDateMinusDays } from "../util/date";
import { fetchStories } from "../util/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayContext } from "../context/play-context";
import { GlobalContext } from "../context/global-context";

function Library(navigation, route) {
  // TODO marc: see example for this in https://reactnative.dev/docs/network
  const [isFetching, setIsFetching] = useState(true);

  // TODO: this library is a mock, but should be
  // retrieved from the API
  const { stories, setStories } = useContext(StoryContext);
  const { playData, setPlayData } = useContext(PlayContext);
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
    async function getLastStoryId() {
      // console.log("Getting storyId from disk");
      const storyId = await AsyncStorage.getItem("last_story_id");
      // console.log(storyId);
      if (storyId != playData.storyId) {
        // console.log("Setting storyId in playData");
        setPlayData({
          ...playData,
          storyId: storyId,
        });
      }
      return storyId;
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
    getLastStoryId();
    getStories();
    setIsFetching(false);
  }, []);

  const parentId = navigation.route.params?.parentId || null;

  useLayoutEffect(() => {
    navigation.navigation.setOptions({
      headerTitleStyle: {
        marginLeft: globalConfig.showLibraryBackButton ? 0 : 30,
      },
    });
  }, [navigation, globalConfig.showLibraryBackButton]);

  return (
    <LibraryOutput
      stories={stories}
      fallbackText="No stories added yet."
      parentId={parentId}
    />
  );
}

export default Library;
