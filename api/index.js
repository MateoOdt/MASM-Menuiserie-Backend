import "dotenv/config";
import { createApp } from "../src/app.js";
import { connectDB } from "../src/config/db.js";

// The Express app is created once per warm serverless instance.
const app = createApp();

export default async function handler(req, res) {
  try {
    // Reuses the cached connection on warm invocations.
    await connectDB(process.env.MONGODB_URI);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    return res.status(500).json({ error: "Database connection failed" });
  }

  return app(req, res);
}
