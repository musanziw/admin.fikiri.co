import axios from "axios";

export default axios.create({
  baseURL: "https://fikiri-solutions.com",
  headers: {
    "Content-Type": "application/json",
  },
});
