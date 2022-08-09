import axios, { AxiosError, AxiosInstance } from "axios";
import { SERVER_URL } from "../config";
//Types
import { SignUpType } from "../pages/signUp.page";
import { LogInType } from "../pages/logIn.page";

export let customAxios: AxiosInstance = axios.create();

function createCustomAxios(token: string, baseURL = SERVER_URL) {
  customAxios = axios.create();
  customAxios.interceptors.request.use((config) => {
    config.headers!["Authorization"] = `Bearer ${token}`;
    config.baseURL = `${SERVER_URL}/api`;
    return config;
  });
}
const register = async (userData: SignUpType): Promise<User | MyError> => {
  try {
    const response = await (await axios.post(`/users`, userData)).data;
    const { token } = response.user;
    const user: User = response.user;
    localStorage.setItem("authtoken", token); //save user token
    createCustomAxios(token);
    return user;
  } catch (err: any | AxiosError) {
    console.log(err);
    window.alert(err.response.data.err);
    const customError: MyError = {
      message: "Error occured in registering user",
      err: err,
    };
    return customError;
  }
};

// Login user
const login = async (userData: LogInType): Promise<User | MyError> => {
  try {
    const response = await (await axios.post(`/users/login`, userData)).data;

    const { token } = response.user;
    const user: User = response.user;
    localStorage.setItem("authtoken", token);
    createCustomAxios(token);

    return user;
  } catch (err: any | AxiosError) {
    console.log(err);
    window.alert(err.response.data.err);
    const customError: MyError = {
      message: "Error occured in logging in user",
      err: err,
    };
    return customError;
  }
};

// Logout user
const logout = () => {
  console.log("logging out");
  localStorage.removeItem("authtoken");
};

//get user
const getUser = async (token: string) => {
  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(`/users/data`);
    createCustomAxios(token);

    return response.data.user;
  } catch (err: any | AxiosError) {
    console.log(err.response.data.err);
  }
};
export { register, getUser, logout, login };
