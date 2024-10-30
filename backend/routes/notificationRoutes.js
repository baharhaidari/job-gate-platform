const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const {
  getUserNotifications,
  markNotificationAsRead,
} = require("../controllers/notificationController");

const router = express.Router();

router.get("/notifications", authenticateToken, getUserNotifications);

router.put(
  "/notifications/:notificationId/read",
  authenticateToken,
  markNotificationAsRead
);

module.exports = router;
