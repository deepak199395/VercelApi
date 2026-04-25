// ✅ MUST be first line (load env variables)
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDb = require("./Config/Db");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const sessionRoutes = require("./Sesstions&Cookies/SessionRoutes");

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

app.use("/api/v1", require("./Mvc/Routers/AuthRouter"));
app.use("/api/v1", sessionRoutes);

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Server error",
    error: err.message,
  });
});

// ✅ IMPORTANT: Connect DB before handling requests
const startServer = async () => {
  try {
    await connectDb();
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
    process.exit(1);
  }
};

startServer();

// ✅ Export app (needed for Vercel)
module.exports = app;