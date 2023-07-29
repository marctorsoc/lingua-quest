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

function Library(navigation, route) {
  // TODO marc: see example for this in https://reactnative.dev/docs/network
  const [isFetching, setIsFetching] = useState(true);

  // TODO: this library is a mock, but should be
  // retrieved from the API
  const { stories, setStories } = useContext(StoryContext);
  const { playData, setPlayData } = useContext(PlayContext);

  const [error, setError] = useState();

  useEffect(() => {
    async function getStories() {
      try {
        // const expenses = await fetchExpenses();
        // load from mock
        // const allStories = [...data.stories];
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
    setIsFetching(true);
    getLastStoryId();
    getStories();
    setIsFetching(false);
  }, []);

  const parentId = navigation.route.params?.parentId || null;

  useLayoutEffect(() => {
    // console.log(parentId);
    const title =
      parentId !== null
        ? stories.find((story) => story.id === parentId).title
        : "Library";
    // console.log(title);
    navigation.navigation.setOptions({
      title: title,
      // TODO: this is a big hack
      // headerTitleStyle: ScreensStyles.headerTitleStyle,
    });
  }, [navigation]);

  return (
    <LibraryOutput
      stories={stories}
      fallbackText="No stories added yet."
      parentId={parentId}
    />
  );
}

export default Library;
