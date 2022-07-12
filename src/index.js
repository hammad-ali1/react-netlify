import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import io from "socket.io-client";
import { SERVER_URL } from "./config";

axios.defaults.baseURL = `${SERVER_URL}/api`;
io(SERVER_URL, { transports: ["websocket"] });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
