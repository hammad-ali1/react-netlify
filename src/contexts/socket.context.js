import React from "react";
import socketio from "socket.io-client";
import { SERVER_URL } from "../config";

export const SocketContext = React.createContext();
export const SnackbarContext = React.createContext();
