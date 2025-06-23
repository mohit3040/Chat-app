const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React app
    methods: ["GET", "POST"],
  },
});

let users = {};

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("join-room", ({ room, username }) => {
    socket.join(room);
    users[socket.id] = { room, username };
    console.log(`${username} joined room ${room}`);
  });

  socket.on("send-message", ({ room, message, username }) => {
    console.log(`Message from ${username} in ${room}: ${message}`);
    io.to(room).emit("receive-message", { message, username });
  });

  socket.on("typing", ({ room, username }) => {
    socket.to(room).emit("typing", username);
  });

  socket.on("stop-typing", ({ room }) => {
    socket.to(room).emit("stop-typing");
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      io.to(user.room).emit("user-left", user.username);
      delete users[socket.id];
    }
  });
});

server.listen(4000, () => {
  console.log("🚀 Server running on http://localhost:4000");
});
