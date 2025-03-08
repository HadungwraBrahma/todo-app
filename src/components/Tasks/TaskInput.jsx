import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/thunks/taskThunks";

const TaskInput = () => {
  const [task, setTask] = useState({
    title: "",
    priority: "medium",
    location: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim()) {
      dispatch(
        addTask({
          id: Date.now(),
          title: task.title,
          priority: task.priority,
          completed: false,
          location: task.location,
          createdAt: new Date().toISOString(),
        })
      );
      setTask({ title: "", priority: "medium", location: "" });
    }
  };

  return (
    <div className="task-input-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Task</label>
            <input
              type="text"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter your task"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location (for weather info)</label>
          <input
            type="text"
            id="location"
            name="location"
            value={task.location}
            onChange={handleChange}
            placeholder="E.g., New York, London, etc."
          />
        </div>
        <button type="submit" className="add-task-btn">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskInput;
