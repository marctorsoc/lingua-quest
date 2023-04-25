import { createContext, useState } from "react";
export const PlayContext = createContext({});

export const initialPlayData = {
  currentSentenceIdx: 0,
  currentAnswerIdx: undefined,
  numSentences: undefined,
};

export function PlayContextProvider({ children }) {
  const [playData, setPlayData] = useState(initialPlayData);

  return (
    <PlayContext.Provider value={{ playData, setPlayData }}>
      {children}
    </PlayContext.Provider>
  );
}
