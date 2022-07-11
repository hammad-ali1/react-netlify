import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { SERVER_URL } from "./config";

axios.defaults.baseURL = SERVER_URL;
const authtoken = localStorage.getItem("authtoken");
console.log("Authotoken is " + authtoken);
axios.defaults.headers.common["Authorization"] = `Bearer ${authtoken}`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
