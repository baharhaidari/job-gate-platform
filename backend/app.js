const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const jobApplicationRoutes = require("./routes/applicationRoutes");
const talentsRoute = require("./routes/talentsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const savedJobsRoute = require("./routes/jobRoutes");
const messageController = require("./controllers/messageController");
const messageRoutes = require("./routes/messageRoutes");
const communityRoute = require("./routes/CommunityRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
const newsLetterRoutes = require("./routes/newsLettersRoutes");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const path = require("path");
const pool = require("./config/db");
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://job-gate-repo-1-y6fv.vercel.app", // frontend URL
    methods: ["GET", "POST"], // allowed methods if needed
    credentials: true, // Required for cookie usage
  },
});

// Middleware for security
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use("/uploads/cv", express.static(path.join(__dirname, "uploads/cv")));

app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// Serve static files from the 'uploads' directory
app.use(
  "/uploads/profile",
  express.static(path.join(__dirname, "uploads/profile"))
);

// CORS settings
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://job-gate-repo-1-y6fv.vercel.app",
    ],
    credentials: true, // Ensure this if your requests require cookies or authentication headers
  })
);

// {
//     origin: "https://job-gate-repo-1-y6fv.vercel.app", // frontend URL
//     credentials: true,
//   }

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Adjust as needed
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// http://localhost:5000/${talent.profile_picture}

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 500, // Limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", jobRoutes);
app.use("/api", jobApplicationRoutes);
app.use("/api", talentsRoute);
app.use("/api/notifications", notificationRoutes);
app.use("/api", savedJobsRoute);
app.use("/api/community", communityRoute);
app.use("/api/chat", messageRoutes);
app.use("/api", contactRoutes);
app.use("/api", adminRoutes);
app.use("/api", newsLetterRoutes);

// Middleware for token authentication
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(new Error("Invalid token"));
    }

    socket.user = user;
    next();
  });
});

// Socket events
io.on("connection", (socket) => {
  // console.log("New connection", socket.id);

  // Socket event for joining a room, ensuring the user has access to it
  socket.on("joinRoom", async (chatRoomId) => {
    try {
      const { id: userId } = socket.user;

      // Verify the user has access to the chat room
      const result = await pool.query(
        "SELECT * FROM chat_rooms WHERE id = $1 AND (user_one = $2 OR user_two = $2)",
        [chatRoomId, userId]
      );

      if (result.rows.length > 0) {
        // User is authorized to join this room
        socket.join(chatRoomId);
        console.log(`User ${userId} joined room: ${chatRoomId}`);
      } else {
        console.error(
          `User ${userId} is not authorized to join room ${chatRoomId}`
        );
      }
    } catch (error) {
      console.error("Error joining room:", error);
    }
  });

  // When a message is received
  // When a message is received
  socket.on(
    "sendMessage",
    async ({ senderId, chatRoomId, receiverId, message }) => {
      try {
        // Save the message in the database
        const savedMessage = await messageController.saveMessage(
          senderId,
          receiverId,
          chatRoomId,
          message
        );

        // Emit the message only to users in this chat room
        io.to(chatRoomId).emit("newMessage", savedMessage);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    }
  );
});

app.get("/api/contacts", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, profile_picture FROM users"
    );

    const contacts = result.rows;
    res.json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
