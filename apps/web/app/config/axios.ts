import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:4000/",
  baseURL: "https://https://fikiri-solutions.co/",
  headers: {
    "Content-Type": "application/json",
  },
});
