import axios from "axios";
// import { User } from "../models/user";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Ganti dengan URL API Anda
});

export const login = async (data: { username: string; password: string }) => {
  try {
    const response = await axiosInstance.post("/login", data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const register = async (userData: { username: string; password: string; email: string }) => {
  try {
    const response = await axiosInstance.post("/registrasi", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const getBooks = async () => {
  try {
    const response = await axiosInstance.get("/books");
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const searchBook = async (title: string) => {
  try {
    const response = await axiosInstance.get(`/books/search?title=${title}`);
    return response.data;
  } catch (error) {
    console.error("Error searching books:", error);
    throw error;
  }
};

export const addBook = async (bookData: { author: string; title: string; description: string }) => {
  try {
    const response = await axiosInstance.post("/books/addBooks", bookData);
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
    return response.status;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

export default axiosInstance;
