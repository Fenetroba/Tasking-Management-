import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./userslice.js";
import  TaskSlice from "./Tasks_slice.js";
export const Store = configureStore({
  reducer: {
    Auth: userAuthSlice,
    Task:TaskSlice
  },
});
