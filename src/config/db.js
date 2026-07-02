import mongoose from "mongoose";

// In a serverless environment the module is kept alive between invocations,
// so we cache the connection (and the in-flight promise) on the global object
// to avoid opening a new connection on every request.
let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export async function connectDB(uri) {
  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected");
    });
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });

    cached.promise = mongoose.connect(uri, {
      // Fail fast instead of buffering queries while disconnected —
      // important so serverless requests don't hang until timeout.
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    // Reset so the next invocation can retry the connection.
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
