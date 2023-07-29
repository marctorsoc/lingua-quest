import { createContext, useState } from "react";
export const PlayContext = createContext({});

export const initialPlayData = {
  currentSentenceIdx: 0,
  currentAnswerIdx: undefined,
  numSentences: undefined,
  numWrongAnswers: 0,
  numCorrectAnswers: 0,
  numAnswersToGo: 0,
  storyId: undefined,

  // these are global to the story, i.e. startIdx = story.done
  // used just for visualization, not meant to be modified
  startIdx: 0,
  endIdx: 0,
};

export function PlayContextProvider({ children }) {
  const [playData, setPlayData] = useState(initialPlayData);

  return (
    <PlayContext.Provider value={{ playData, setPlayData }}>
      {children}
    </PlayContext.Provider>
  );
}
