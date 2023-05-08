import { FlatList } from "react-native";
import SentenceItem from "./SentenceItem";
import { useContext } from "react";
import { PlayContext } from "../../context/play-context";
import { useRef } from "react";

function SentenceList({ sentences }) {
  const flatListRef = useRef(null);
  const { playData } = useContext(PlayContext);
  const currentSentenceIdx = playData.currentSentenceIdx;
  const reviewingAnswer = playData.currentAnswerIdx !== undefined;

  function renderSentenceItem({ item, index }) {
    const playingThisItem = currentSentenceIdx == index;
    const alreadyPlayedItem = currentSentenceIdx > index;
    const reviewThisAnswer = reviewingAnswer && playingThisItem;
    // only show if already answered or current to answer
    const enabled = alreadyPlayedItem || playingThisItem;
    return (
      enabled && (
        <SentenceItem
          playingThisItem={playingThisItem}
          reviewingThisAnswer={reviewThisAnswer}
          {...item}
        />
      )
    );
  }

  return (
    <FlatList
      ref={flatListRef}
      data={sentences}
      style={{ flex: 1 }}
      renderItem={renderSentenceItem}
      onContentSizeChange={() => {
        // TODO: this only works for Android, not web 🤷‍♂️
        flatListRef.current.scrollToEnd();
      }}
      keyExtractor={(item) => item.id}
    />
  );
}

export default SentenceList;
