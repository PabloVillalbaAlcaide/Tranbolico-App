import { createContext, useState } from "react";

export const AppContext = createContext();

export const TranbolicoContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({});
  return (
    <>
      <AppContext.Provider value={[globalState, setGlobalState]}>
        {children}
      </AppContext.Provider>
    </>
  );
};
