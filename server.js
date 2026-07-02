import "dotenv/config";
import app from "./api/index.js";

const PORT = process.env.PORT || 3000;

// The DB connection is established lazily on the first request (see api/index.js),
// so local dev just needs to start listening.
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
