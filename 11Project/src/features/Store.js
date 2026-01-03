import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../Slices/TodoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
