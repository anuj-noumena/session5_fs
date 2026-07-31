import TaskCard from "../TaskCard/TaskCard";
import styles from "./TaskBoard.module.css";

function TaskBoard({ tasks, loading, error, onDelete, onStatusChange }) {
  if (loading) {
    return (
      <div className={styles.stateBox}>
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.stateBox} ${styles.errorBox}`}>
        <p>⚠️ {error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className={styles.stateBox}>
        <p>No tasks here. Add one above! 🎯</p>
      </div>
    );
  }

  return (
    <div className={styles.taskList}>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskBoard;
