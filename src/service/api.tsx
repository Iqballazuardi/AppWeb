import axios from "axios";

const apiUsers = axios.create({
  baseURL: "http://localhost:3000/users", // Ganti dengan URL API Anda
});

export default apiUsers;
