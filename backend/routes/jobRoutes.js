const express = require("express");
const {
  // createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  createJob,
} = require("../controllers/jobController");
const authenticateToken = require("../middlewares/authMiddleware");
const pool = require("../config/db");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

// Job routes
router.get(
  "/jobs",
  // authenticateToken,
  // roleMiddleware(["applicant"]),
  getAllJobs
);
router.get(
  "/jobs/:id",
  authenticateToken,
  roleMiddleware(["Applicant", "SuperAdmin"]),
  getJobById
);
router.post(
  "/post-job",
  authenticateToken,
  roleMiddleware(["Client", "SuperAdmin"]),
  createJob
);
router.put(
  "/jobs/update/:id",
  authenticateToken,
  // roleMiddleware(["Client"]),
  updateJob
);
router.delete(
  "/jobs/delete/:id",
  authenticateToken,
  roleMiddleware(["Client"]),
  deleteJob
);

router.post(
  "/save-job",
  authenticateToken,
  // roleMiddleware(["Applicant"]),
  async (req, res) => {
    const { jobId } = req.body;
    const userId = req.user.id;

    if (!jobId) {
      return res.status(400).json({ error: "Job ID is required" });
    }

    try {
      // Fetch job details from the jobs table
      const jobResult = await pool.query(
        "SELECT title, location, description, skills, created_at FROM jobs WHERE id = $1",
        [jobId]
      );

      if (jobResult.rows.length === 0) {
        return res.status(404).json({ error: "Job not found" });
      }

      const job = jobResult.rows[0];

      // Check if the job is already saved
      const checkSavedJob = await pool.query(
        "SELECT * FROM saved_jobs WHERE user_id = $1 AND job_id = $2",
        [userId, jobId]
      );

      if (checkSavedJob.rows.length > 0) {
        return res.status(400).json({ error: "Job already saved" });
      }

      // Insert the saved job with additional data
      const newSavedJob = await pool.query(
        "INSERT INTO saved_jobs (user_id, job_id, job_title, job_description, location, skills, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [
          userId,
          jobId,
          job.title,
          job.description,
          job.location,
          job.skills,
          job.created_at,
        ]
      );

      res.status(201).json({
        message: "Job saved successfully",
        savedJob: newSavedJob.rows[0],
      });
    } catch (error) {
      console.error("Error saving job:", error);
      res.status(500).json({ error: `Internal Server Error ${error}` });
    }
  }
);

// Get saved jobs for a user
router.get(
  "/saved-jobs",
  authenticateToken,
  // roleMiddleware(["Applicant", "SuperAdmin"]),
  async (req, res) => {
    const userId = req.user.id;

    try {
      const savedJobs = await pool.query(
        `SELECT jobs.id, jobs.title, jobs.description, jobs.created_at, jobs.type, jobs.salary, jobs.skills, jobs.location, jobs.experience_level, saved_jobs.saved_at 
       FROM saved_jobs 
       JOIN jobs ON saved_jobs.job_id = jobs.id 
       WHERE saved_jobs.user_id = $1
       ORDER BY created_at DESC`,
        [userId]
      );

      res.json(savedJobs.rows);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Delete a saved job
router.delete("/saved-jobs/:jobId", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { jobId } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM saved_jobs WHERE user_id = $1 AND job_id = $2 RETURNING *",
      [userId, jobId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Saved job not found" });
    }

    res.json({ message: "Saved job deleted successfully" });
  } catch (error) {
    console.error("Error deleting saved job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
