import { FlatList } from "react-native";

import StoryItem from "./Library/StoryItem";

function StoryList({ stories, renderer = renderStoryItem }) {
  return (
    <FlatList
      data={stories}
      renderItem={renderer}
      keyExtractor={(item) => item.id}
      numColumns={2}
      // TODO: add this
      refreshControl={null}
    />
  );
}

function renderStoryItem(itemData) {
  return <StoryItem {...itemData.item} />;
}

export default StoryList;
