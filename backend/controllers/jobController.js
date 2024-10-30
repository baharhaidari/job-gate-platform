const pool = require("../config/db");

// Get all jobs
const getAllJobs = async (req, res) => {
  const { search, location } = req.query;
  let query = "SELECT * FROM jobs";
  let values = [];
  const conditions = [];

  // Check if either search or location is provided
  if (search) {
    conditions.push("(title ILIKE $1 OR type ILIKE $1)");
    values.push(`%${search}%`);
  }

  // Add location condition if it's provided
  if (location) {
    conditions.push("location ILIKE $" + (values.length + 1));
    values.push(`%${location}%`);
  }

  // Combine conditions with AND and append them to the query
  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  query += " ORDER BY created_at DESC"; // Keep ordering at the end of the query

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Error getting jobs:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new job
const createJob = async (req, res) => {
  const {
    title,
    type,
    location,
    salary,
    experience_level,
    description,
    project_length,
    skills, // Add skills to request body
  } = req.body;

  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID in request" });
    }

    const client_id = req.user.id;

    // Insert job into the database including skills array
    await pool.query(
      `INSERT INTO jobs (title, type, location, salary, experience_level, description, project_length, skills, client_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        title,
        type,
        location,
        salary,
        experience_level,
        description,
        project_length,
        skills, // Pass skills array to query
        client_id,
      ]
    );

    return res.status(201).json({ message: "Job posted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a job by ID
const updateJob = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    type,
    location,
    salary,
    experience_level,
    client_id,
    description,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE jobs
       SET title = $1, type = $2, location = $3, salary = $4, experience_level = $5, client_id = $6, description = $7
       WHERE id = $8 RETURNING *`,
      [
        title,
        type,
        location,
        salary,
        experience_level,
        client_id,
        description,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a job by ID
const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM jobs WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
