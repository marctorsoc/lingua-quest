import { createContext, useState } from "react";
export const GlobalContext = createContext({});

export const initialGlobalData = {
  // language: "en",
  // setLanguage: (language) => {},
  // theme: "dark",
  // setTheme: (theme) => {},
  storyLongPressed: null, // use null's so when priting state in json they are shown
  // storyLongPressed: "d599c6801b3eb562",
  numSentencesPerGame: 2,
  historyLength: 1,
  readingMode: false,
  filters: {
    learningLanguage: "es",
    knownLanguage: "en",
    storyType: "subtitle",
  },
  appLanguage: "en",
  userId: null,
  tutorialStage: null,
  lastStoryId: null,
  // numGamesPerDay: 3,  // TODO marc: implement this
};

export function GlobalContextProvider({ children }) {
  const [globalConfig, setGlobalConfig] = useState(initialGlobalData);

  return (
    <GlobalContext.Provider value={{ globalConfig, setGlobalConfig }}>
      {children}
    </GlobalContext.Provider>
  );
}
