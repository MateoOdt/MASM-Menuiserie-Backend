import express from "express";
import cors from "cors";
import opinionsRouter from "./routes/opinions.js";

export function createApp() {
  const app = express();

  const corsOrigin = process.env.CORS_ORIGIN || "*";
  app.use(
    cors({
      origin: corsOrigin === "*" ? "*" : corsOrigin.split(",").map((o) => o.trim()),
    })
  );
  app.use(express.json());

  // Health check
  app.get("/health", (req, res) => res.json({ status: "ok" }));

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

  return app;
}
