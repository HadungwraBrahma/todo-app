import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadTasks = createAsyncThunk(
  "tasks/loadTasks",
  async (_, { rejectWithValue }) => {
    try {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      return tasks;
    } catch (error) {
      return rejectWithValue("Failed to load tasks");
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task, { rejectWithValue }) => {
    try {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = [...tasks, task];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return task;
    } catch (error) {
      return rejectWithValue("Failed to add task");
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return id;
    } catch (error) {
      return rejectWithValue("Failed to delete task");
    }
  }
);

export const toggleTask = createAsyncThunk(
  "tasks/toggleTask",
  async (id, { rejectWithValue }) => {
    try {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return id;
    } catch (error) {
      return rejectWithValue("Failed to update task");
    }
  }
);
