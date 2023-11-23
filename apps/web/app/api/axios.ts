import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000",
  // baseURL : "http://203.161.53.130:8000"
});