import { createSlice } from "@reduxjs/toolkit";
import {
  loadTasks,
  addTask,
  deleteTask,
  toggleTask,
} from "../thunks/taskThunks";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load tasks cases
      .addCase(loadTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add task case
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      // Delete task case
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      // Toggle task case
      .addCase(toggleTask.fulfilled, (state, action) => {
        const task = state.tasks.find((task) => task.id === action.payload);
        if (task) {
          task.completed = !task.completed;
        }
      });
  },
});

export default taskSlice.reducer;
