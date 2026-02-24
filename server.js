require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/config/db");

const app = express();

const authRoutes = require("./src/routes/auth.routes");
const taskRoutes = require("./src/routes/task.routes");
const { errorHandler } = require("./src/middleware/error.middleware");

connectDB();

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// global error handler
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
