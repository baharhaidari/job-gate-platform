const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const pool = require("../config/db");
const router = express.Router();

router.post("/newsletter", async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const result = pool.query(
      "INSERT INTO news_letter (email) VALUES ($1) RETURNING *",
      [email]
    );
    res
      .status(201)
      .json({ message: "Subscription successful", subscriber: result.rows });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    res.status(500).json({ message: "Error subscribing" });
  }
});

module.exports = router;
