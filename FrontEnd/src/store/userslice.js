import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../lib/axios.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null, // Added error state
};

export const signupUser = createAsyncThunk(
  "/auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/signup", userData, {
        withCredentials: true,
      });
      return response.data; // Return the successful response data
    } catch (error) {
      // Handle errors appropriately
      if (error.response) {
        return rejectWithValue(error.response.data); // Return the entire error response
      } else if (error.request) {
        return rejectWithValue({ message: "No response from the server." });
      } else {
        return rejectWithValue({ message: "An error occurred: " + error.message });
      }
    }
  }
);


export const loginUser = createAsyncThunk(
     "/auth/login",
     async (loginUser, { rejectWithValue }) => {
       try {
         const response = await axios.post("/auth/login", loginUser, {
           withCredentials: true, // Include credentials if needed
         });
         return response.data; // Return the successful response data
       } catch (error) {
          console.error("Login Error:", error);
         
         // Check if the error response is available
         if (error.response) {
           const errorMessage = error.response.data.message || "An error occurred";
           return rejectWithValue(error.response.data); // Return the full error response
         } else if (error.request) {
           console.error("No response received:", error.request);
           const errorMessage = " Check Your Connection.";
           return rejectWithValue({ message: errorMessage }); // Return a structured error response
         } else {
           console.error("Error message:", error.message);
           const errorMessage = "An error occurred: " + error.message;
           toast.error(errorMessage); // Show the general error message
           return rejectWithValue({ message: errorMessage }); // Return a structured error response
         }
       }
     }
   );
export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post("/auth/logout", {}, {
      withCredentials: true,
    });
    return response.data;
   
  }
);


export const CheckAuths = createAsyncThunk(
  "/auth/checkAuth",
  async () => {
    const response = await axios.get("/auth/checkAuth", {
      withCredentials: true,
      headers: {
        "cache-control": "no-cache, no-store, must-revalidate, proxy-revalidate",
      },
    });
    return response.data; // Ensure you return the response data
  }
);

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload; // Set user based on action payload
    },
  
  },
  
  extraReducers: (builder) => {
    builder
    .addCase(signupUser.pending, (state) => {
      state.loading = true; // Set loading to true
    })
    .addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user || null; // Set user from payload
      state.isAuthenticated =false; // Set authentication state
      state.error = null; // Clear any previous error
    })
    .addCase(signupUser.rejected, (state, action) => {
      state.loading = false; // Set loading to false
      state.user = null; // Reset user on failure
      state.isAuthenticated = false; // Reset authentication state
      state.error = action.payload.error || "Signup failed"; // Capture error message
    })
      .addCase(loginUser.pending, (state) => {
        state.loading = true; // Set loading to true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null; // Set user from payload
        state.isAuthenticated = true// Set authentication state
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false; // Set loading to false
        state.user = null; // Reset user on failure
        state.isAuthenticated = false; // Reset authentication state
        state.error = action.payload ; // Capture error message

      })
      .addCase(CheckAuths.pending, (state) => {
        state.loading = true; // Set loading to true
      })
      .addCase(CheckAuths.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false
        state.isAuthenticated = true; // Set authenticated state
        state.user = action.payload.user || null; // Set user based on response
      })
      .addCase(CheckAuths.rejected, (state) => {
        state.loading = false; // Set loading to false
        state.user = null; // Reset user on failure
        state.isAuthenticated = false; // Reset authentication state
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

// Export actions
export const {SetUser } = authSlice.actions; 
export default authSlice.reducer; // Export reducer