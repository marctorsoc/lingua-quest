import { LinearTransition } from "react-native-reanimated";
import { Animated } from "react-native";
import StoryItem from "./Library/StoryItem";
import { View } from "react-native-web";

function StoryList({ stories, renderer = renderStoryItem }) {
  return (
    <Animated.FlatList
      data={stories}
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
