import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (data: { username: string; password: string }) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const registrasi = async (userData: { username: string; password: string; email: string }) => {
  try {
    const response = await axiosInstance.post("/auth/registrasi", userData);
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
export const getGenre = async (genre: string) => {
  try {
    const response = await axiosInstance.get(`/books/genre?genre=${genre}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books by genre:", error);
    throw error;
  }
};

export const addBook = async (bookData: { author: string; title: string; genre: string; description: string }) => {
  try {
    const response = await axiosInstance.post("/books/add", bookData);
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

export const updateBookOnApi = async (id: number, book: { author: string; title: string; description: string; genre: string }) => {
  try {
    const response = await axiosInstance.put(`/books/update/${id}`, book);
    return response.status;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

export const getBookById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/books/${id}`);
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

export const borrowBook = async (data: { userId: number; bookId: number }) => {
  try {
    const response = await axiosInstance.post(`/books/borrow`, data);
    return response.data;
  } catch (error) {
    console.error("Error borrowing book:", error);
    throw error;
  }
};

export const returnBook = async (data: { userId: number; bookId: number }) => {
  try {
    const response = await axiosInstance.put(`/books/return`, data);
    return response.status;
  } catch (error) {
    console.error("Error returning book:", error);
    throw error;
  }
};

export default axiosInstance;
