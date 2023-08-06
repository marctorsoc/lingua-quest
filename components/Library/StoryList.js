import { FlatList } from "react-native";

import StoryItem from "./StoryItem";

function renderStoryItem(itemData) {
  return <StoryItem {...itemData.item} />;
}

function StoryList({ stories }) {
  return (
    <FlatList
      data={stories}
      renderItem={renderStoryItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  );
}

export default StoryList;
