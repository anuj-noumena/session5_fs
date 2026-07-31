require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const tasksRoutes = require("./routes/tasks");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", authRoutes); // signup & login — public, no protect needed
app.use("/tasks", tasksRoutes);
app.get("/", (req, res) => {
  res.send("TaskFlow API is running 🚀");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
