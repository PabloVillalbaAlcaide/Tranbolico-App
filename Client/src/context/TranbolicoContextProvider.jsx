import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const AppContext = createContext();

export const TranbolicoContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({});

  useEffect(()=>{
    const tokenLocal = localStorage.getItem("token")
    if(tokenLocal){
      getUser(tokenLocal)
    }
  },[])

  const getUser = async (token) => {
    try {
      const res = await axios.get("http://localhost:4000/users/getOneUser",{
        headers: { Authorization: `Bearer ${token}` },
      });

      setGlobalState({...globalState,"token":token, "user":res.data[0]})
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AppContext.Provider value={{globalState, setGlobalState}}>
        {children}
      </AppContext.Provider>
    </>
  );
};
