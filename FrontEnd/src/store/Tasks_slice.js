import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../lib/axios.js";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  fullTask:[]
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

export const fetchAllTasks = createAsyncThunk(
  "task/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/task/all", {
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

export const DeleteTask = createAsyncThunk(
  "task/delete",
  async (taskId, { rejectWithValue }) => {
    try {
      // Send the task ID as part of the URL
      const response = await axios.delete(`/task/delete/${taskId}`, {
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
export const updateTaskCompletion = createAsyncThunk(
  'task/update',
  async ({ taskId, isComplete }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/task/update/${taskId}`, // Ensure this matches your backend route
        { isCompleted: isComplete }, // Send the completion status
        { withCredentials: true }
      );
      return response.data; 
    } catch (error) {
      // Handle errors appropriately
      // Check if error has a response from the server
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      // Check if there was no response from the server
      else if (error.request) {
        return rejectWithValue({ message: 'No response from the server.' });
      }
      // Handle any other errors
      return rejectWithValue({ message: 'An error occurred: ' + error.message });
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
      })
      .addCase(updateTaskCompletion.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(updateTaskCompletion.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload; // Update the task in the state
        }
      })
      .addCase(updateTaskCompletion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle the error
      })
      .addCase(DeleteTask.pending, (state) => {
        state.loading = true; // Set loading to true when the delete action is pending
      })
      .addCase(DeleteTask.fulfilled, (state, action) => {
        state.loading = false; // Reset loading
        // Remove the deleted task from the state
        state.tasks = state.tasks.filter(task => task._id !== action.payload._id);
      })
      .addCase(DeleteTask.rejected, (state, action) => {
        state.loading = false; // Reset loading
        state.error = action.payload; // Set the error message
      })
     
      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true; // Set loading to true when fetching
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.loading = false; // Reset loading
        state.fullTask = action.payload; // Set the fetched tasks
        state.error = null; // Reset any previous error
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false; // Reset loading
        state.error = action.payload; // Set the error message
      });

  },
});

export const { setTask } = taskSlice.actions; 
export default taskSlice.reducer;