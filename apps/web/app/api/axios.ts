import axios from "axios";

export default axios.create({
    // baseURL: "http://localhost:8000",
    baseURL: "https://musanzi-wilfried.me",
    withCredentials: true,
    headers: {
        "Content-type": "application/json"
    }
});