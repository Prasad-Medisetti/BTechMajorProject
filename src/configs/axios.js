import axios from "axios";

// Set config defaults when creating the instance
const axiosInstance = axios.create({
  baseURL: "https://academic-bulletin-board.herokuapp.com/"
  // baseURL: "http://localhost:4000",

  // headers: {
  //   Authorization: {
  //     toString() {
  //       const token = localStorage.getItem("token");
  //       return token ? `Bearer ${token}` : "";
  //     }
  //   }
  // }
});

// Alter defaults after instance has been created
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : null;
  return config;
});
export default axiosInstance;
