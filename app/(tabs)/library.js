import {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import LibraryOutput from "../../src/components/Library/LibraryOutput";
import ErrorOverlay from "../../src/components/UI/ErrorOverlay";
import LoadingOverlay from "../../src/components/UI/LoadingOverlay";
import { StoryContext } from "../../src/context/stories-context";
import { getDateMinusDays } from "../../src/util/date";
import { fetchStories } from "../../src/util/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayContext } from "../../src/context/play-context";
import { GlobalContext } from "../../src/context/global-context";
import { React } from "react";
import { View, Text } from "react-native";
// import IconButton from "../src/components/UI/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { findPropertyByKey } from "../../src/constants/languages";
import { useNavigation } from "expo-router";
import { loadData } from "../../src/util/storage";

export default function Library() {
  // TODO marc: see example for this in https://reactnative.dev/docs/network
  const [isFetching, setIsFetching] = useState(true);

  // TODO: this library is a mock, but should be
  // retrieved from the API
  const { stories, setStories } = useContext(StoryContext);
  const { globalConfig, setGlobalConfig } = useContext(GlobalContext);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: `Caption Master - ${learningLanguageEmoji}`,
  //   });
  // }, []);
  useEffect(() => {
    async function getStories() {
      try {
        const allStories = await fetchStories({
          try_from_disk: true,
          userId: globalConfig.userId,
        });
        console.log("loaded stories");
        setStories(allStories);
      } catch (error) {
        // setError("Could not fetch expenses!");
        console.log("Could not fetch stories!");
      }
    }
    setIsFetching(true);
    getStories();
    setIsFetching(false);
  }, []);

  return (
    <LibraryOutput
      stories={stories}
      fallbackText="No stories added yet."
    />
  );
}
