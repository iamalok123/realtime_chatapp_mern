import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/api`
        : import.meta.env.MODE === "development"
            ? "http://localhost:4000/api"
            : "/api",
    withCredentials: true,
});