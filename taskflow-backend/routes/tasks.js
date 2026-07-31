const express = require("express");
const protect = require("../middleware/auth");
const Task = require("../models/Task");

const router = express.Router();

// ── Protected task routes — every one of these now requires a valid token ──
router.get("/", protect, async (req, res) => {
  try {
    // Only return tasks belonging to the logged-in user
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { title, status, priority } = req.body;
    const newTask = await Task.create({
      title,
      status,
      priority,
      user: req.userId, // taken from the verified token, never trusted from the client body
    });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch("/:id/status", protect, async (req, res) => {
  try {
    const { status } = req.body;
    // Match BOTH the task id AND ownership — a user can't update someone else's task
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { status },
      { returnDocument: "after", runValidators: true },
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
