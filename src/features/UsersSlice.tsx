import axios from "axios";
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export interface Users {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface AuthUsers {
  users: Users[];
  currentUser: Users | null;
}

export const getUser = createAsyncThunk("user/getUser ", async () => {
  const response = await axios.get("http://localhost:3000/users");
  return response.data;
});

export const addUser = createAsyncThunk("user/addUser", async (userData: { username: string; email: string; password: string; role: string }) => {
  const response = await axios.post("http://localhost:3000/users", userData);
  return response.data;
});

const userEntry = createEntityAdapter({
  selectId: (user: Users) => user.id,
});

const userSlice = createSlice({
  name: "users",
  initialState: userEntry.getInitialState({ currentUser: null }) as unknown as AuthUsers,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      // state.users.push(action.payload);
      userEntry.setAll(state, action.payload);
    });
  },
});
export const usersSelectors = userEntry.getSelectors<AuthUsers>((state) => state.users);
export default userSlice.reducer;
