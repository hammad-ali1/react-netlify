import axiosCreator from "axios";

const axios = axiosCreator.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});
//set axios configuration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
  }
);

//TYPES

export class User {
  email: string = "";
  password: string = "";
  name: string = "";
  isEmailVerified: boolean = false;
}

const API = {
  signUp: async (
    name: string,
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> => {
    return await (
      await axios.post(`users/signup`, { name, email, password })
    ).data;
  },
  logIn: async (
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> => {
    return await (
      await axios.post(`users/login`, { email, password })
    ).data;
  },
};

export default API;
