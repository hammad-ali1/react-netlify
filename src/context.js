import React, { createContext, useEffect, useState, useContext } from "react";
import { getUser } from "./api/auth.api";
import socketio from "socket.io-client";
import { SERVER_URL } from "./config.ts";

export const UserContext = createContext();
export const SocketContext = createContext();
export const SnackbarContext = createContext();

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
  const [user] = useContext(UserContext);
  useEffect(() => {
    if (user) {
      const token = user.token;
      console.log("CREATING A NEW SOCKET");
      console.log(user);
      setState((prevSocket) => {
        if (prevSocket) {
          prevSocket.disconnect();
        }
        console.log("PREV SOCKET");
        console.log(prevSocket);
        const newSocket = socketio.connect(SERVER_URL, {
          auth: { token },
        });
        return newSocket;
      });
    }
  }, [user]);
  return (
    <SocketContext.Provider value={[state, setState]}>
      {children}
    </SocketContext.Provider>
  );
};

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
