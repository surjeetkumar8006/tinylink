// src/server.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const path = require("path");

const connectDB = require("./config/db");
const apiRoutes = require("./routes/apiRoutes");
const redirectRoutes = require("./routes/redirectRoutes");

const app = express();

/* ---------------------- DB Connection ---------------------- */
connectDB();

/* ---------------------- Security Middlewares ---------------------- */
app.disable("x-powered-by");

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use(cors({ origin: "*" }));
app.use(compression());

/* ---------------------- Body Parsing ---------------------- */
app.use(express.json({ limit: "10kb" }));

/* ---------------------- Logging ---------------------- */
const dev = process.env.NODE_ENV !== "production";
app.use(morgan(dev ? "dev" : "combined"));

/* ---------------------- Rate Limiters ---------------------- */
const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: { error: "Too many requests. Slow down." }
});
app.use(globalLimiter);

const redirectLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: "Too many redirect hits." }
});

/* ---------------------- Health Check ---------------------- */
app.get("/healthz", (req, res) => {
  res.json({
    ok: true,
    version: "1.0",
    uptime: process.uptime(),
    time: new Date().toISOString()
  });
});

/* ---------------------- API Routes ---------------------- */
app.use("/api", apiRoutes);

/* ---------------------- Frontend Build (React) ---------------------- */
const frontendPath = path.join(process.cwd(), "frontend", "build");
app.use(express.static(frontendPath));

/* ---------------------- Redirect Routes ---------------------- */
app.use("/", redirectLimiter, redirectRoutes);

/* ---------------------- SPA Fallback ---------------------- */
app.get("*", (req, res) => {
  if (req.method === "GET") {
    return res.sendFile(path.join(frontendPath, "index.html"));
  }
  res.status(404).json({ error: "Not found" });
});

/* ---------------------- Server Start ---------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
