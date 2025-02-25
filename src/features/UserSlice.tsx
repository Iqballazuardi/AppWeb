import axios from "../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface User {
  username: string;
  // role: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUsers {
  users: User[];
  currentUser: string;
}

export const login = createAsyncThunk<LoginCredentials, LoginCredentials>("/login", async (credentials: LoginCredentials) => {
  const response = await axios.post("/login", credentials);
  console.log(response);
  return response.data;
});

export const register = createAsyncThunk<User, User>("/registrasi", async (userData: { username: string; email: string; password: string }) => {
  const response = await axios.post("/registrasi", userData);
  console.log(response);
  return response.data.status;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [
      {
        username: "admin",
        email: "admin@gmail.com",
        password: "1234",
      },
    ],
    currentUser: "",
  } as AuthUsers,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.users.push(action.payload);
        console.log(state.users);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload.email;
      });
  },
});
export default userSlice.reducer;
