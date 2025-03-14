import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./userslice.js";
import  taskSlice from "./Tasks_slice";
export const Store = configureStore({
  reducer: {
    Auth: userAuthSlice,
    tasksName:taskSlice,
  },
});
