import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userReducer from "../features/UserSlice";

export const store = configureStore({
  reducer: {
    books: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
