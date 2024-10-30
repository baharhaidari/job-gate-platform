const pool = require("../config/db"); // PostgreSQL pool connection

// Create a notification
const createNotification = async (userId, message) => {
  try {
    await pool.query(
      "INSERT INTO notifications (user_id, message) VALUES ($1, $2)",
      [userId, message]
    );
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

// Get notifications for a specific user
const getUserNotifications = async (req, res) => {
  const userId = req.user.id;

  try {
    const { rows: notifications } = await pool.query(
      "SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

// Mark notification as read
const markNotificationAsRead = async (req, res) => {
  const { notificationId } = req.params;
  try {
    await pool.query("UPDATE notifications SET is_read = true WHERE id = $1", [
      notificationId,
    ]);
    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
};

module.exports = {
  getUserNotifications,
  markNotificationAsRead,
  createNotification,
};
