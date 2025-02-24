import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/UserSlice";

// import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export const useAppDispatch: () => AppDispatch = useDispatch;
