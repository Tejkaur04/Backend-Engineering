const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);

// ✅ Initialize Socket.IO with proper CORS setup
const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins for testing
    methods: ["GET", "POST"],
  },
});

const PORT = 5000;

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // serve frontend files

// ✅ Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("✅ User connected ->", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected ->", socket.id);
  });
});

// ✅ Simple test route
app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});

// ✅ Start server
server.listen(PORT, () => console.log(`🔥 Server running on http://localhost:${PORT}`));
