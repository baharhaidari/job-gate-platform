const express = require("express");
const {
  createThread,
  getThreads,
  getThreadById,
  replyToThread,
  likeThread,
} = require("../controllers/CommunityController");
const authenticateToken = require("../middlewares/authMiddleware");
const router = express.Router();

// Community routes
router.post("/thread", authenticateToken, createThread);
router.get("/threads", getThreads);
router.get("/thread/:threadId", getThreadById);
router.post("/reply/:threadId", authenticateToken, replyToThread);
router.post("/like/:threadId", authenticateToken, likeThread);

module.exports = router;
