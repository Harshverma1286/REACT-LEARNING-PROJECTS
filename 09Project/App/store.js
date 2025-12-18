import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "../src/Features/todo/todoslice"

export const store = configureStore({
    reducer:todoReducer
});