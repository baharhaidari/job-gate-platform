const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const pool = require("../config/db");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = express.Router();

// Define the protected route with the middleware
router.get("/account", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const findUserById = async (id) => {
      const query = `
        SELECT id, fullname, username, email, skills, password, role, profile_description, profile_picture, location, created_at, updated_at
        FROM users
        WHERE id = $1
      `;
      const values = [userId];
      try {
        const result = await pool.query(query, values);
        return result.rows[0];
      } catch (error) {
        console.error("Error finding user by id:", error);
        throw error;
      }
    };

    // Get user ID from the token payload
    const user = await findUserById(userId); // Fetch user data by ID from your database

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data
    res.json({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      skills: user.skills,
      email: user.email,
      profile_description: user.profile_description,
      location: user.location,
      profile_picture: user.profile_picture,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/account/update", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { fullname, username, email, profile_description, location, skills } =
    req.body;

  if (!username || !email) {
    return res
      .status(400)
      .json({ message: "Username and email are required." });
  }

  try {
    const query = `
      UPDATE users 
      SET fullname = $1, username = $2, email = $3, profile_description = $4, location = $5, skills = $6, updated_at = NOW()
      WHERE id = $7
      RETURNING id, fullname, username, email, profile_description, location, skills, updated_at;
    `;

    const values = [
      fullname,
      username,
      email,
      profile_description,
      location,
      skills,
      userId,
    ];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = result.rows[0];
    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        fullname: updatedUser.fullname,
        username: updatedUser.username,
        email: updatedUser.email,
        profile_description: updatedUser.profile_description,
        location: updatedUser.location,
        skills: updatedUser.skills,
        updated_at: updatedUser.updated_at,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get(
  "/account/job-applications",
  authenticateToken,
  // roleMiddleware("Applicant"),
  async (req, res) => {
    const userId = req.user.id;

    try {
      // Query to fetch job applications submitted by the user
      const query = `
    SELECT job_applications.id, jobs.title, job_applications.status, job_applications.proposal, job_applications.created_at
    FROM job_applications
    JOIN jobs ON job_applications.job_id = jobs.id
    WHERE job_applications.user_id = $1
    ORDER BY job_applications.created_at DESC;
  `;

      const values = [userId];
      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "No job applications found" });
      }

      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching job applications:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

router.get(
  "/account/job-applications/:id",
  authenticateToken,
  async (req, res) => {
    const applicationId = req.params.id;
    const userId = req.user.id; // Assuming you're using JWT to authenticate the user

    try {
      // Fetch the job application from the database, ensuring it belongs to the authenticated user
      const query = `SELECT * FROM job_applications WHERE id = $1 AND user_id = $2`;
      const values = [applicationId, userId];

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Job application not found" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error fetching job application details:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

router.get(
  "/account/job-offers",
  authenticateToken,
  roleMiddleware("Client"),
  async (req, res) => {
    const userId = req.user.id;
    try {
      // Query to fetch job applications submitted by the user
      const query = `
    SELECT jobs.id, jobs.title, jobs.location, jobs.salary, jobs.description, jobs.created_at
    FROM jobs
    WHERE jobs.client_id = $1
    ORDER BY jobs.created_at DESC;
  `;

      const values = [userId];
      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "No job offers found" });
      }

      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching job offers:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

router.get("/get-users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json({ message: "Messages fetched", data: result.rows });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

router.get("/get-today-jobs", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM jobs");
    // Return as 'data' if you want to access it via response.data.data in the frontend
    res.status(200).json({ message: "Jobs fetched", data: result.rows });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

module.exports = router;
