import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Ganti dengan URL API Anda
});

export const getBooks = async () => {
  try {
    const response = await axiosInstance.get("/books");
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export default axiosInstance;
