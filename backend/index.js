const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoute");
const app = express();
const socket = require("socket.io");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.error(err);
  });
const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on Port ${process.env.PORT}`);
});
const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    console.log("Received send-msg event", data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      console.log("Emitting msg-recieve to", sendUserSocket);
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
