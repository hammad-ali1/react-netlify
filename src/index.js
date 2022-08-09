import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
//config
import { SERVER_URL } from "./config.ts";
//Context
import { UserProvider, SocketProvider, SnackbarProvider } from "./context";

//setting up default baseURL
axios.defaults.baseURL = `${SERVER_URL}/api`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SocketProvider>
      <UserProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </UserProvider>
    </SocketProvider>
  </React.StrictMode>
);
