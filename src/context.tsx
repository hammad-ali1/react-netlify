import React, { createContext, useEffect, useState, useRef } from "react";
import socketio, { Socket } from "socket.io-client";
//Api
import { getUser } from "./api/auth.api";
//config
import { SERVER_URL } from "./config";

//START USER CONTEXT
export type UserContextType =
  | []
  | [User | null, React.Dispatch<React.SetStateAction<User | null>>];

export const UserContext = createContext<UserContextType>([]);

//END USER CONTEXT

//START SOCKET CONTEXT
export type SocketContextType =
  | []
  | [Socket | null, React.Dispatch<React.SetStateAction<Socket | null>>];
export const SocketContext = createContext<SocketContextType>([]);

//END SOCKET CONTEXT

//START SNACKBAR CONTEXT
export type SnackbarContextType = {
  setSnackBarMessage: React.Dispatch<React.SetStateAction<string>>;
  setSnackBarButtons: React.Dispatch<React.SetStateAction<never[]>>;
  setOpenSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
  openSnackBar: boolean;
  snackBarMessage: string;
  snackBarButtons: never[];
};
export const SnackbarContext = createContext<SnackbarContextType>(
  {} as SnackbarContextType
);

//END SNACKBAR CONTEXT

//UserProvider
//@type
type UserProviderProps = { children: React.ReactNode };
export const UserProvider = ({ children }: UserProviderProps) => {
  const [state, setState] = useState<User | null>(null);
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
//@type
type SocketProviderProps = { children: React.ReactNode };
export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [state, setState] = useState<Socket | null>(null);
  const socketCreated = useRef(false);

  //retrieve token and create socket
  useEffect(() => {
    const authToken = localStorage.getItem("authtoken");
    if (authToken && !socketCreated.current) {
      const newSocket = socketio(SERVER_URL!, {
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
//@type
type SnackbarProviderProps = { children: React.ReactNode };
export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
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
