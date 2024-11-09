import { FlatList } from "react-native";
import SentenceItem from "./SentenceItem";
import { useContext, useEffect } from "react";
import { PlayContext } from "../../context/play-context";
import { useRef, useState } from "react";
import { GlobalContext } from "../../context/global-context";
import Animated, {
  FadingTransition,
  JumpingTransition,
  LinearTransition,
  SequencedTransition,
} from "react-native-reanimated";

function SentenceList(props) {
  const flatListRef = useRef(null);
  const { playData, setPlayData } = useContext(PlayContext);
  const { globalConfig } = useContext(GlobalContext);
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
    const validItem =
      item.correct_answer_idx !== -1 || globalConfig.readingMode;
    return (
      enabled && (
        <SentenceItem
          index={index + playData.startHistoryIdx}
          playingThisItem={playingThisItem}
          validItem={validItem}
          {...item}
        />
      )
    );
  }

  return (
    <Animated.FlatList
      // <FlatList
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
      // TODO: this is bouncing too much. Need to play a bit more with it
      // itemLayoutAnimation={LinearTransition}
      // itemLayoutAnimation={LinearTransition.springify().stiffness(0)}
      // itemLayoutAnimation={SequencedTransition.duration(1000)}
      // itemLayoutAnimation={JumpingTransition}
    />
  );
}

export default SentenceList;
