// import axios from "../services/api";
import { createSlice } from "@reduxjs/toolkit";

interface Books {
  id: number;
  tittle: string;
  writer: string;
  description: string;
  user_id: number;
}
interface AuthBooks {
  books: Books[];
}

// export const getBooks = createAsyncThunk("books/getBooks", async () => {
//   const response = await axios.get("http://localhost:3000/books");
//   return response.data;
// });

const booksSlice = createSlice({
  name: "books",
  initialState: [{ title: "Books", writer: "Writer", description: "Description", user_id: 1, id: 1 }] as unknown as AuthBooks,
  reducers: {
    getBooks: () => {
      return { books: [] };
    },
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    updateBook: (state, action) => {
      const bookIndex = state.books.findIndex((book) => book.id === action.payload.id);
      if (bookIndex !== -1) {
        state.books[bookIndex] = action.payload;
      }
    },
  },
});

export default booksSlice.reducer;
