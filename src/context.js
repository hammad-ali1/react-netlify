import React, { createContext, useEffect, useState } from "react";
import { getUser } from "./api/auth.api";

export const UserContext = createContext();
export const SocketContext = createContext();

//Providers
export const UserProvider = ({ children }) => {
  const [state, setState] = useState(undefined);
  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    if (token) {
      getUser(token).then((user) => {
        // console.log(user);
        // console.log(token);
        setState(user);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export const SocketProvider = ({ children }) => {
  const [state, setState] = useState(undefined);

  return (
    <SocketContext.Provider value={[state, setState]}>
      {children}
    </SocketContext.Provider>
  );
};
