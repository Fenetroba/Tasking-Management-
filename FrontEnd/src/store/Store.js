import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./userslice.js";
export const Store = configureStore({
  reducer: {
    Auth: userAuthSlice,
  },
});
