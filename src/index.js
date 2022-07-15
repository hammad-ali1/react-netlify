import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { SERVER_URL } from "./config";

axios.defaults.baseURL = `${SERVER_URL}/api`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
