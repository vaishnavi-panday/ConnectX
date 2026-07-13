import axios from "axios";

const api = axios.create({
  baseURL: "https://connectx-evdy.onrender.com/api",
  withCredentials: true,
});

export default api;
