import axios from "axios";

export const getOnlineUsers = async () => {
  try {
    const response = await (await axios.get(`/online`)).data;
    return response;
  } catch (err) {
    console.log(err);
    window.alert(err.response.data.err);
  }
};
