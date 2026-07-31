import { useState } from 'react';
import styles from './AddTaskForm.module.css';

function AddTaskForm({ onAddTask }) {
  // Each form field gets its own piece of state
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent browser page reload

    // Validation
    if (!title.trim()) {
      alert('Task title cannot be empty!');
      return;
    }

    // Call parent's handler with the new task data
    onAddTask({
      title: title.trim(),
      priority,
      status: 'pending',
    });

    // Reset the form
    setTitle('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Add New Task</h2>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Task Title</label>
          <input
            id="title"
            type="text"
            placeholder="What needs to be done?"
            value={title}             // Controlled: React owns the value
            onChange={(e) => setTitle(e.target.value)}  // Update state on every keystroke
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>

        <button type="submit" className={styles.submitBtn}>
          + Add Task
        </button>
      </div>
    </form>
  );
}

export default AddTaskForm;