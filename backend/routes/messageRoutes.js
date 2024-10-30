const express = require("express");
const chatController = require("../controllers/messageController");
const authenticateToken = require("../middlewares/authMiddleware");
const router = express.Router();

// Get messages for a specific room
router.get("/rooms/:roomId/messages", authenticateToken, async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const messages = await chatController.getMessagesByRoom(roomId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
