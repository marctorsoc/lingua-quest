import { createContext, useState } from "react";
export const GlobalContext = createContext({});

export function GlobalContextProvider({ children }) {
  const [data, setData] = useState({
    // language: "en",
    // setLanguage: (language) => {},
    // theme: "dark",
    // setTheme: (theme) => {},
    showLibraryBackButton: false,
  });

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
}
