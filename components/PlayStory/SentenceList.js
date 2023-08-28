import { FlatList } from "react-native";
import SentenceItem from "./SentenceItem";
import { useContext, useEffect } from "react";
import { PlayContext } from "../../context/play-context";
import { useRef, useState } from "react";

function SentenceList(props) {
  const flatListRef = useRef(null);
  const { playData, setPlayData } = useContext(PlayContext);
  const [sentences, setSentences] = useState();
  const currentSentenceIdx = playData.currentSentenceIdx;
  const reviewingAnswer = playData.currentAnswerIdx !== undefined;

  // this little trick is needed to force a re-render
  // not ideal, but it works
  useEffect(() => {
    setSentences(props.sentences);
  }, [props.sentences]);

  function renderSentenceItem({ item, index }) {
    const globalIndex = playData.startHistoryIdx + index;
    const playingThisItem = currentSentenceIdx == globalIndex;
    const alreadyPlayedItem = currentSentenceIdx > globalIndex;
    const reviewingThisAnswer = reviewingAnswer && playingThisItem;
    // only show if already answered or current to answer
    const enabled = alreadyPlayedItem || playingThisItem;
    return (
      enabled && (
        <SentenceItem
          index={index + playData.startHistoryIdx}
          playingThisItem={playingThisItem}
          reviewingThisAnswer={reviewingThisAnswer}
          alreadyPlayedItem={alreadyPlayedItem}
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
        if (playData.processingClickedTranslation)
          setPlayData({
            ...playData,
            processingClickedTranslation: false,
          });
        else flatListRef.current?.scrollToEnd();
      }}
    />
  );
}

export default SentenceList;
