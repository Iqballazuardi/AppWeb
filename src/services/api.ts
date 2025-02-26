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

export const addBook = async (bookData: { author: string; title: string; description: string }) => {
  try {
    const response = await axiosInstance.post("/books/addBooks", bookData);
    console.log(response);
    return response.status;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

export const updateBookOnApi = async (id: number, book: { author: string; title: string; description: string }) => {
  console.log(id);
  try {
    const response = await axiosInstance.put(`/books/booksUpdate/${id}`, book);
    console.log(response);
    console.log(id);
    return response.status;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

export const getBookById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/books/books/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    throw error;
  }
};

export const deleteBook = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/books/delete/${id}`);
    console.log(response);
    return response.status;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

export default axiosInstance;
