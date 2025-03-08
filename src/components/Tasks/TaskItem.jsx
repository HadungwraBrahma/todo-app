import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, toggleTask } from "../../redux/thunks/taskThunks";
import { fetchWeather } from "../../redux/thunks/weatherThunks";
import WeatherInfo from "../Weather/WeatherInfo";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const weather = useSelector(
    (state) => state.weather.data[task.location] || null
  );
  const weatherLoading = useSelector((state) => state.weather.loading);
  const weatherError = useSelector((state) => state.weather.error);

  useEffect(() => {
    if (task.location && !weather) {
      dispatch(fetchWeather(task.location));
    }
  }, [dispatch, task.location, weather]);

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  const getPriorityClass = () => {
    switch (task.priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "";
    }
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <div className="task-check-title">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="task-checkbox"
          />
          <div className="task-details">
            <h3 className="task-title">{task.title}</h3>
            <div className="task-meta">
              <span className={`task-priority ${getPriorityClass()}`}>
                {task.priority}
              </span>
              <span className="task-date">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {task.location && (
          <div className="task-weather">
            <WeatherInfo
              weather={weather}
              loading={weatherLoading}
              error={weatherError}
              location={task.location}
            />
          </div>
        )}
      </div>

      <button onClick={handleDelete} className="delete-btn">
        <span className="delete-icon">×</span>
      </button>
    </div>
  );
};

export default TaskItem;
