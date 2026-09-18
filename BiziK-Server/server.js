const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("./middlewares/logger");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");

// Importing Routes
const register = require("./routes/register");
const login = require("./routes/login");
const profile = require("./routes/profile");
const card = require("./routes/card");

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(logger);
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  next();
});
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN
      ? process.env.CLIENT_ORIGIN.split(",").map((value) => value.trim())
      : true,
  })
);

// EndPoints
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/profile", profile);
app.use("/api/cards", card);

// Connect to MongoDB
mongoose
  .connect(process.env.db, { useNewUrlParser: true })
  .then(() => console.log("Connected To MongoDB"))
  .catch(() => console.log("Cannot connect to server"));

app.listen(PORT, () => console.log("Server Connected to port" + PORT));
