import axios from "axios";

export default axios.create({
  baseURL: "https://prioritask-api.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});