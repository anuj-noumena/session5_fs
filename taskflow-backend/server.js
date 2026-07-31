require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const tasksRoutes = require("./routes/tasks");

const allowedOrigins = [
  "http://localhost:5173", // local dev (Vite's default port)
  "https://session5-fs.vercel.app", // your live frontend URL
];

const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

connectDB();

app.use("/auth", authRoutes); // signup & login — public, no protect needed
app.use("/tasks", tasksRoutes);
app.get("/", (req, res) => {
  res.send("TaskFlow API is running 🚀");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
