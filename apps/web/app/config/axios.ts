import axios from "axios";

export default axios.create({
  baseURL: "https://fikiri-solutions.co/",
  // baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});
