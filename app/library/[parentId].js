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
import {
  useRouter,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";

export default function storyGroup() {
  const { stories } = useContext(StoryContext);
  const navigation = useNavigation();
  const { parentId, parentTitle } = useLocalSearchParams();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: parentTitle,
    });
  }, []);
  return <LibraryOutput stories={stories} parentId={parentId} />;
}
