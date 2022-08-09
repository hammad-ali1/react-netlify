import React, { createContext, useEffect, useState, useRef } from "react";
import socketio from "socket.io-client";
//Api
import { getUser } from "./api/auth.api";
//config
import { SERVER_URL } from "./config.ts";

export const UserContext = createContext();
export const SocketContext = createContext();
export const SnackbarContext = createContext();

//UserProvider
export const UserProvider = ({ children }) => {
  const [state, setState] = useState(undefined);
  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    if (token) {
      getUser(token).then((user) => {
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

//SocketProvider
export const SocketProvider = ({ children }) => {
  const [state, setState] = useState(undefined);
  const socketCreated = useRef(false);

  //retrieve token and create socket
  useEffect(() => {
    const authToken = localStorage.getItem("authtoken");
    if (authToken && !socketCreated.current) {
      const newSocket = socketio.connect(SERVER_URL, {
        auth: { token: authToken },
      });
      setState(newSocket);
      socketCreated.current = true;
    }
  }, []);

  return (
    <SocketContext.Provider value={[state, setState]}>
      {children}
    </SocketContext.Provider>
  );
};

//SnackbarProvider
export const SnackbarProvider = ({ children }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarButtons, setSnackBarButtons] = useState([]);

  return (
    <SnackbarContext.Provider
      value={{
        setSnackBarMessage,
        setSnackBarButtons,
        setOpenSnackBar,
        openSnackBar,
        snackBarMessage,
        snackBarButtons,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
