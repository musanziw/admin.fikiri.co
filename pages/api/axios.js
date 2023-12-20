import axios from "axios";
export default axios.create({
  baseURL: "https://fikiri-solutions.co",
  headers: {
    "Content-Type": "application/json",
  },
});
