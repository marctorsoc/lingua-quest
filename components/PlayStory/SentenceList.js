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

  // this little trick is needed to force a re-render
  // not ideal, but it works
  useEffect(() => {
    setSentences(props.sentences);
  }, [props.sentences]);

  function renderSentenceItem({ item, index }) {
    const globalIndex = playData.startHistoryIdx + index;
    const playingThisItem = currentSentenceIdx == globalIndex;
    // only show if already answered or current to answer
    const enabled = currentSentenceIdx >= globalIndex;
    return (
      enabled && (
        <SentenceItem
          index={index + playData.startHistoryIdx}
          playingThisItem={playingThisItem}
          validItem={item.correct_answer_idx !== -1}
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
        // TODO: this scrolling only works for Android, not web 🤷‍♂️
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
