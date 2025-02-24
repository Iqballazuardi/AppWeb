import axios from "../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface User {
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface AuthUsers {
  users: User[];
  currentUser: User | null;
}

export const login = createAsyncThunk("/users", async () => {
  const response = await axios.get(`/users`);
  return response.data;
});

export const register = createAsyncThunk<User, User, { rejectValue: string }>("/registrasi", async (userData: { username: string; email: string; password: string; role: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post("/registrasi", userData);
    console.log(response);
    return response.data.status;
  } catch {
    return rejectWithValue("Failed to register user");
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [
      {
        username: "admin",
        role: "admin",
        email: "admin@gmail.com",
        password: "1234",
      },
    ],
    currentUser: null,
  } as AuthUsers,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
  },
});
export default userSlice.reducer;
