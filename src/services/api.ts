import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Ganti dengan URL API Anda
});

export default axiosInstance;
