// import axios from "axios";
// import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

// interface Books {
//   id: number;
//   tittle: string;
//   writer: string;
//   description: string;
//   user_id: number;
// }
// interface AuthBooks {
//   books: Books[];
// }

// export const getBooks = createAsyncThunk("books/getBooks", async () => {
//   const response = await axios.get("http://localhost:3000/books");
//   return response.data;
// });

// const booksSlice = createSlice({
//   name: "books",
//   initialState: [{ title: "Books", writer: "Writer", description: "Description", user_id: 1, id: 1 }] as unknown as AuthBooks,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(getBooks.fulfilled, (state, action) => {
//       state.books = action.payload;
//     });
//   },
// });

// export default booksSlice.reducer;
