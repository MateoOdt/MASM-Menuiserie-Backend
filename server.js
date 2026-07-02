import "dotenv/config";
import express from "express";
import cors from "cors";
import opinionsRouter from "./src/routes/opinions.js";
import { connectDB } from "./src/config/db.js";

const app = express();

const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(
  cors({
    origin: corsOrigin === "*" ? "*" : corsOrigin.split(",").map((o) => o.trim()),
  })
);
app.use(express.json());

// Health check — kept ahead of the DB middleware so it works as a pure
// liveness probe even when the database is unreachable.
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Connect to MongoDB lazily on the first request. The connection is cached,
// so this is a no-op after the first call (important on serverless).
app.use(async (req, res, next) => {
  try {
    await connectDB(process.env.MONGODB_URI);
    next();
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Routes
app.use("/api/opinions", opinionsRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
