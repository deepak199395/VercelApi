// ✅ MUST be first
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDb = require("./Config/Db");
const app = express();
const getStatusPage = require("./utils/statusPage")

// ✅ BLOCK direct access from vercel.app (optional but recommended)
app.use((req, res, next) => {
  const host = req.headers.host || "";

  if (host.includes("vercel.app")) {
    return res.status(403).send("Access denied");
  }

  next();
});


// ✅ CORS FIX (IMPROVED)
const allowedOrigins = [
  "https://www.shrigaar.com",
  "https://shrigaar-dashboard.web.app",
  "http://localhost:3000",
  "http://localhost:5001",
  "https://shringaars.com"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (mobile apps / postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


// ✅ Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());


// ✅ ROOT ROUTE
app.get("/", (req, res) => {
  res.send(getStatusPage());
});


// ✅ TEST ROUTE (VERY USEFUL)
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working 🚀"
  });
});


// ✅ ROUTES
app.use("/api/v1", require("./Mvc/Routers/AuthRouter"));
app.use("/api/v1", require("./Sesstions&Cookies/SessionRoutes"));


// ❌ HANDLE 404 (VERY IMPORTANT FOR VERCEL)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


// ❌ GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);

  res.status(500).json({
    success: false,
    message: err.message || "Server error",
  });
});


// ✅ EXPORT
module.exports = { app, connectDb };