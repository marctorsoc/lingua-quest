import { LinearTransition } from "react-native-reanimated";
import { Animated } from "react-native";
import StoryItem from "./Library/StoryItem";
import { GlobalContext } from "../context/global-context";
import { useContext } from "react";

function StoryList({ stories, renderer = renderStoryItem }) {
  const { globalConfig } = useContext(GlobalContext);

  // if we are in the tutorial, show only the 5 first stories
  // this will show the tutorial and mascot better
  const filteredStories =
    globalConfig.tutorialStage !== null
      ? stories.slice(0, 5)
      : stories;

  return (
    <Animated.FlatList
      data={filteredStories}
      renderItem={renderer}
      keyExtractor={(item) => item.id}
      numColumns={2}
      // TODO: add this
      refreshControl={null}
      itemLayoutAnimation={LinearTransition}
    />
  );
}

function renderStoryItem(itemData) {
  return <StoryItem {...itemData.item} />;
}

export default StoryList;
