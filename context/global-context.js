import { createContext, useState } from "react";
export const GlobalContext = createContext({});

export const initialGlobalData = {
  // language: "en",
  // setLanguage: (language) => {},
  // theme: "dark",
  // setTheme: (theme) => {},
  showLibraryBackButton: false,
  numSentencesPerGame: 2,
  showConfirmationDialog: true,
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
