import styles from './TaskFilter.module.css';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: '⏳ Pending' },
  { value: 'in-progress', label: '🔄 In Progress' },
  { value: 'done', label: '✅ Done' },
];

function TaskFilter({ currentFilter, onFilterChange }) {
  return (
    <div className={styles.filterGroup}>
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`${styles.filterBtn} ${currentFilter === value ? styles.active : ''}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;