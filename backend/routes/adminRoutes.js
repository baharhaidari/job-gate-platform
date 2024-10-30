const express = require("express");
const pool = require("../config/db"); // Database connection
const authenticateToken = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Middleware to ensure the user is a SuperAdmin
const isSuperAdmin = roleMiddleware(["SuperAdmin"]);

// Admin login route
router.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch admin user by username from the database
    const result = await pool.query(
      "SELECT * FROM admins WHERE username = $1",
      [username]
    );
    const admin = result.rows[0];

    // If admin not found, return an error
    if (!admin) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = password === admin.password;
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const role = admin.role;

    // Send the token to the client
    res.json({ token, role });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all users
router.get("/users", authenticateToken, isSuperAdmin, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json({ message: "Messages fetched", data: result.rows });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Get contact messages
router.get(
  "/contact-messages",
  authenticateToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM contact_messages");
      res.status(200).json({ message: "Messages fetched", data: result.rows });
    } catch (err) {
      console.error("Error fetching contact messages:", err);
      res.status(500).json({ message: "Error fetching contact messages" });
    }
  }
);

// Get jobs listed per day
router.get("/today-jobs", authenticateToken, isSuperAdmin, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM jobs");
    // Return as 'data' if you want to access it via response.data.data in the frontend
    res.status(200).json({ message: "Jobs fetched", data: result.rows });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

router.get(
  "/get-newsletters",
  authenticateToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM news_letter ORDER BY created_at DESC"
      );
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      res.status(500).json({ message: "Error fetching subscribers" });
    }
  }
);

module.exports = router;
