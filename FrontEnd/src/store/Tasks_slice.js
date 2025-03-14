import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../lib/axios.js";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// Async thunk to create tasks
export const createTasks = createAsyncThunk(
  "task/create",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/task/create", taskData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ message: "No response from the server." });
      } else {
        return rejectWithValue({ message: "An error occurred: " + error.message });
      }
    }
  }
);

// Async thunk to find tasks by title
export const findTasks = createAsyncThunk(
  "task/single",
  async (FindTitle, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/task/single?title=${encodeURIComponent(FindTitle)}`, {
        withCredentials: true,
      });
      return response.data; 
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ message: "No response from the server." });
      } else {
        return rejectWithValue({ message: "An error occurred: " + error.message });
      }
    }
  }
);

export const taskSlice = createSlice({
  name: "tasksName",
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
        state.error = null;
      })
      .addCase(createTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Task creation failed";
      })
      .addCase(findTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(findTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = Array.isArray(action.payload) ? action.payload : [action.payload];
        state.error = null;
      })
      .addCase(findTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Failed to find tasks";
      });
  },
});

export const { setTask } = taskSlice.actions; 
export default taskSlice.reducer;