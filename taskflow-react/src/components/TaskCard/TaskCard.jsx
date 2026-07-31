import styles from "./TaskCard.module.css";

function TaskCard({ task, onDelete, onStatusChange }) {
  // MongoDB documents use `_id` (a string), not a numeric `id`
  const { _id, title, priority, status } = task;

  return (
    <div className={`${styles.card} ${styles[priority]}`}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{title}</h3>
        <span className={`${styles.badge} ${styles[priority]}`}>
          {priority}
        </span>
      </div>

      <div className={styles.cardFooter}>
        <select
          value={status}
          onChange={(e) => onStatusChange(_id, e.target.value)}
          className={styles.statusSelect}
        >
          <option value="pending">⏳ Pending</option>
          <option value="in-progress">🔄 In Progress</option>
          <option value="done">✅ Done</option>
        </select>

        <button className={styles.deleteBtn} onClick={() => onDelete(_id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
