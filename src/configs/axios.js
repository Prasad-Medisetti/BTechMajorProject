import axios from "axios";

const instance = axios.create({
  baseURL: "https://academic-bulletin-board.herokuapp.com/",
  // baseURL: "http://localhost:4000",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
});

export default instance;
