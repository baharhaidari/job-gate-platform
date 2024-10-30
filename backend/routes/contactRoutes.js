const express = require("express");
const pool = require("../config/db");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

// Contact form route
router.post("/contact", authenticateToken, async (req, res) => {
  const { name, email, message } = req.body;
  const userId = req.user?.id;

  console.log(name, email, message, userId);

  try {
    const result = await pool.query(
      "INSERT INTO contact_messages (name, email, message, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, message, userId]
    );
    res.status(200).json({ message: "Message received", data: result.rows[0] });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ message: "Failed to save message" });
  }
});

module.exports = router;
