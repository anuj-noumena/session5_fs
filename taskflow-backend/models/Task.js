const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "done"], // only these 3 values allowed
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // now enforced for real, since every request carries a verified user
    },
  },
  { timestamps: true }, // auto-adds createdAt & updatedAt fields
);

module.exports = mongoose.model("Task", taskSchema);
