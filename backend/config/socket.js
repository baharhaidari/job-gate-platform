const socketIO = require("socket.io");
const { authenticateSocket } = require("./middlewares/authMiddleware"); // Import the Socket.IO auth middleware
const { handleSocketEvents } = require("./controllers/chatController"); // Chat events handler

const setupSocketIO = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173/",
      methods: ["GET", "POST"],
    },
  });

  // Use authentication middleware before connection
  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.user.id}`); // Now you can access `socket.user` from JWT

    handleSocketEvents(socket, io); // Handle chat-related events

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.user.id}`);
    });
  });
};

module.exports = { setupSocketIO };
