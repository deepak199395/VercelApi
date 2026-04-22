const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDb = require("./Config/Db");
const dotenv = require("dotenv");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const sessionRoutes = require("./Sesstions&Cookies/SessionRoutes");

dotenv.config();
connectDb();

const app = express();

// settings
app.set("etag", true);

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

app.use("/api/v1", require("./Mvc/Routers/AuthRouter"));
app.use("/api/v1", sessionRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

module.exports = app;