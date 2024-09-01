import { createServer } from "http";

import { Server } from "socket.io";
const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
export const getRecieverSocketId = (recieverId) => {
  return userSocketMap[recieverId];
};
const userSocketMap = {};
io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  //   socket.on("chat message", (msg) => {
  //     console.log("Message received:", msg);
  //     io.emit("chat message", msg);
  //   });
  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    delete userSocketMap[socket.id];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

server.listen(process.env.NEXT_PUBLIC_BACKEND_PORT || 8080);
