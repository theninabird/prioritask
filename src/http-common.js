import axios from "axios";

export default axios.create({
  // baseURL: "https://prioritask-api.herokuapp.com/api",
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json"
  }
});
