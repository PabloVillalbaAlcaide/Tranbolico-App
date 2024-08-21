import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const AppContext = createContext();

export const TranbolicoContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({});
  const [loading, setloading] = useState(true)

  useEffect(()=>{
    const tokenLocal = localStorage.getItem("token")
    
    if(tokenLocal){
      getUser(tokenLocal)
    }
    setloading(false)
  },[])

  const getUser = async (token) => {
    try {
      const res = await axios.get("http://localhost:4000/users/getOneUser",{
        headers: { Authorization: `Bearer ${token}` },
      });

      setGlobalState({...globalState,"token":token, "user":res.data})
      
    } catch (err) {
      console.log(err);
    }
  };
  
  console.log("GLOBALSTATE",globalState);
  
  return (
    <>
      <AppContext.Provider value={{globalState, setGlobalState, loading}}>
        {children}
      </AppContext.Provider>
    </>
  );
};
