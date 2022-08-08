import axios from "axios";
import { SERVER_URL } from "../config.ts";
export let customAxios = axios.create();
function createCustomAxios(token, baseURL = SERVER_URL) {
  customAxios = axios.create();
  customAxios.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.baseURL = `${SERVER_URL}/api`;
    return config;
  });
}
const register = async (userData) => {
  try {
    const response = await (await axios.post(`/users`, userData)).data;
    const { token, ...user } = response.user;
    localStorage.setItem("authtoken", token); //save user token
    createCustomAxios(token);
    return user;
  } catch (err) {
    console.log(err);
    window.alert(err.response.data.err);
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await (await axios.post(`/users/login`, userData)).data;

    const { token, ...user } = response.user;
    localStorage.setItem("authtoken", token);
    createCustomAxios(token);

    return user;
  } catch (err) {
    console.log(err);
    window.alert(err.response.data.err);
  }
};

// Logout user
const logout = () => {
  console.log("logging out");
  localStorage.removeItem("authtoken");
};

//get user
const getUser = async (token) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(`/users/data`);
    createCustomAxios(token);

    return response.data.user;
  } catch (err) {
    console.log(err.response.data.err);
  }
};
export { register, getUser, logout, login };
