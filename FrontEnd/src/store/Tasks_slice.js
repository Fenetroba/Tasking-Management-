import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../lib/axios";

const initialState = {
  task: null,
  loading: false,
  error: null, // Added error state
};

export const createTask = createAsyncThunk(
  "task/create", // Use a unique string for the action type
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/task/create", taskData, {
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

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.task = action.payload; // Set task based on action payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true; // Set loading to true
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload; // Set task from payload (adjust as needed)
        state.error = null; // Clear any previous error
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false; // Set loading to false
        state.task = null; // Reset task on failure
        state.error = action.payload.message || "Task creation failed"; // Capture error message
      });
  },
});

export const { setTask } = taskSlice.actions; 
export default taskSlice.reducer; // Export reducer