// src/pages/Home.jsx
import { useState, useEffect } from "react";
import TaskBoard from "../components/TaskBoard/TaskBoard";
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import TaskFilter from "../components/TaskFilter/TaskFilter";
import {
  fetchTasks,
  createTask,
  updateTaskStatus,
  deleteTaskById,
} from "../services/api";
import "./Home.css";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetchTasks()
      .then((res) => {
        if (!ignore) setTasks(res.data);
      })
      .catch((err) => {
        console.error("Failed to load tasks:", err);
        if (!ignore)
          setError("Could not load tasks. Is the backend server running?");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchTasks()
      .then((res) => setTasks(res.data))
      .catch(() =>
        setError("Could not load tasks. Is the backend server running?"),
      )
      .finally(() => setLoading(false));
  };

  // ADD a task — the server now generates the real `_id`.
  // We no longer fake an id with Date.now(); MongoDB owns that job now.
  const handleAddTask = async (newTaskData) => {
    try {
      const res = await createTask(newTaskData);
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to add task:", err);
      alert("Could not add task. Please try again.");
    }
  };

  // DELETE — filter by _id instead of id
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTaskById(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
      alert("Could not delete task. Please try again.");
    }
  };

  // UPDATE status — match by _id instead of id
  const handleStatusChange = async (taskId, newStatus) => {
    const previousTasks = tasks;

    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task,
      ),
    );

    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Could not update status. Reverting change.");
      setTasks(previousTasks);
    }
  };

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <main className="home-page">
      <div className="page-header">
        <h1>My Tasks</h1>
        <p>{tasks.length} total tasks</p>
      </div>

      <AddTaskForm onAddTask={handleAddTask} />
      <TaskFilter currentFilter={filter} onFilterChange={setFilter} />

      <TaskBoard
        tasks={filteredTasks}
        loading={loading}
        error={error}
        onDelete={handleDeleteTask}
        onStatusChange={handleStatusChange}
      />

      {error && (
        <button onClick={handleRetry} className="retry-btn">
          Retry
        </button>
      )}
    </main>
  );
}

export default Home;
