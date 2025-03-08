import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskInput from "./TaskInput";
import TaskItem from "./TaskItem";
import { loadTasks } from "../../redux/thunks/taskThunks";
import "../../styles/Tasks.css";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return (
      priorityOrder[a.priority] - priorityOrder[b.priority] ||
      (a.completed === b.completed ? 0 : a.completed ? 1 : -1)
    );
  });

  return (
    <div className="task-container">
      <TaskInput />

      <div className="task-list-container">
        <h2>Your Tasks</h2>

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : error ? (
          <div className="error-message">Error: {error}</div>
        ) : tasks.length === 0 ? (
          <div className="no-tasks">
            No tasks yet. Add a task to get started!
          </div>
        ) : (
          <div className="task-list">
            {sortedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
