import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/UsersSlice";

export const store = configureStore({
  reducer: {
    books: userReducer,
  },
});
