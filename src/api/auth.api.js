import axios from "axios";

const register = async (userData) => {
  try {
    const response = await (await axios.post(`/users`, userData)).data;
    const token = response.user.token;
    console.log(token);
    localStorage.setItem("authtoken", token); //save user token
  } catch (err) {
    window.alert(err.response.data.err);
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await (await axios.post(`/users/login`, userData)).data;
    const token = response.user.token;
    localStorage.setItem("authtoken", token);
  } catch (err) {
    window.alert(err.response.data.err);
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem("authtoken");
};

//get user
const getUser = async () => {
  try {
    const response = await axios.get(`/users/data`);
    return response.data.user;
  } catch (err) {
    console.log(err.response.data.err);
  }
};
export { register, getUser };
