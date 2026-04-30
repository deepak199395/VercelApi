// ✅ MUST be first
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDb = require("./Config/Db");

const app = express();
// ✅ CORS FIX (IMPORTANT)
app.use(cors({
   origin: [
    "https://shringaars.com",
    "https://www.shrigaar.com",
    "https://shrigaar-dashboard.web.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

app.use("/api/v1", require("./Mvc/Routers/AuthRouter"));
app.use("/api/v1", require("./Sesstions&Cookies/SessionRoutes"));

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Server error",
    error: err.message,
  });
});

// ✅ Export BOTH
module.exports = { app, connectDb };