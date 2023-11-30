import axios from "axios";

export default axios.create({
  baseURL: "https://musanzi-wilfried.me",
  // baseURL: "http://localhost:8000",

  headers: {
    "Content-Type": "application/json",
  },
});
