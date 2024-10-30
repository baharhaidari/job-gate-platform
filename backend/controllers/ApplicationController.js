const pool = require("../config/db");
const { createNotification } = require("../controllers/notificationController");

const applyToJob = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user?.id;

  const {
    proposal,
    githubLink,
    // coverLetter,
    // rate,
    paymentSuggestion,
    rateIncrease,
  } = req.body;

  // Get the path of the uploaded CV file
  const cvPath = req.file?.path;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    // Check if the job exists
    const jobResult = await pool.query("SELECT * FROM jobs WHERE id = $1", [
      jobId,
    ]);
    const job = jobResult.rows[0];
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the user already applied for this job
    const existingApplicationResult = await pool.query(
      "SELECT * FROM job_applications WHERE user_id = $1 AND job_id = $2",
      [userId, jobId]
    );
    if (existingApplicationResult.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    // Insert the new application into the job_applications table
    const insertQuery = `
      INSERT INTO job_applications 
      (user_id, job_id, proposal, cv_path, github_link, payment_suggestion, rate_increase) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    await pool.query(insertQuery, [
      userId,
      jobId,
      proposal,
      cvPath,
      githubLink,
      paymentSuggestion,
      rateIncrease,
    ]);

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to apply for the job" });
  }
};

// Accept job application
const acceptApplication = async (req, res) => {
  const { applicationId } = req.params;

  try {
    // Check if the application exists and retrieve the job title
    const { rows: application } = await pool.query(
      `SELECT ja.id, ja.user_id, j.title as job_title 
       FROM job_applications ja 
       JOIN jobs j ON ja.job_id = j.id 
       WHERE ja.id = $1`,
      [applicationId]
    );

    if (application.length === 0) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Update the application status to 'accepted'
    await pool.query("UPDATE job_applications SET status = $1 WHERE id = $2", [
      "accepted",
      applicationId,
    ]);

    // Send in-app notification to the applicant with the job title
    const applicantId = application[0].user_id;
    const jobTitle = application[0].job_title;

    await createNotification(
      applicantId,
      `Your application for the job "${jobTitle}" has been accepted.`
    );

    res.status(200).json({ message: "Application accepted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to accept application" });
  }
};

// Reject job application
const rejectApplication = async (req, res) => {
  const { applicationId } = req.params;

  try {
    // Check if the application exists
    const { rows: application } = await pool.query(
      `SELECT ja.*, j.title AS job_title
       FROM job_applications ja
       JOIN jobs j ON ja.job_id = j.id
       WHERE ja.id = $1`,
      [applicationId]
    );

    if (application.length === 0) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Update the application status to 'rejected'
    const result = await pool.query(
      "UPDATE job_applications SET status = $1 WHERE id = $2",
      ["rejected", applicationId]
    );

    // Send in-app notification to the applicant
    const applicantId = application[0].user_id;
    const jobTitle = application[0].job_title;

    await createNotification(
      applicantId,
      `Your application for the job "${jobTitle}" has been rejected.`
    );

    res.status(200).json({ message: "Application rejected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to reject application" });
  }
};

const viewMyJobOffers = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user.id;

  console.log(userId);

  try {
    // Check if the user is the owner of the job offer
    const { rows: jobOwner } = await pool.query(
      "SELECT * FROM jobs WHERE id = $1 AND client_id = $2",
      [jobId, userId]
    );

    if (jobOwner.length === 0) {
      return res.status(403).json({
        error: "You are not authorized to view applications for this job offer",
      });
    }

    // Fetch applications for the specified job offer
    const { rows: applications } = await pool.query(
      "SELECT ja.id, ja.proposal, ja.status, ja.github_link, ja.payment_suggestion, ja.cv_path, ja.created_at, u.username " +
        "FROM job_applications ja " +
        "JOIN users u ON ja.user_id = u.id " +
        "WHERE ja.job_id = $1 " +
        "ORDER BY ja.created_at DESC",
      [jobId]
    );

    res.status(200).json({ applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch job applications" });
  }
};

// const viewMyJobOffers = async (req, res) => {
//   const { jobId } = req.params;
//   const userId = req.user.id;

//   try {
//     // Check if the user is the owner of the job offer
//     const { rows: jobOwner } = await pool.query(
//       "SELECT * FROM jobs WHERE id = $1 AND client_id = $2",
//       [jobId, userId]
//     );

//     if (jobOwner.length === 0) {
//       return res.status(403).json({
//         error: "You are not authorized to view applications for this job offer",
//       });
//     }

//     // Fetch applications for the specified job offer, including cv_path
//     const { rows: applications } = await pool.query(
//       "SELECT ja.id, ja.cover_letter, ja.status, ja.created_at, ja.github_link, ja.rate_increase, ja.payment_suggestion, ja.cv_path, u.username " +
//         "FROM job_applications ja " +
//         "JOIN users u ON ja.user_id = u.id " +
//         "WHERE ja.job_id = $1 " +
//         "ORDER BY ja.created_at DESC",
//       [jobId]
//     );

//     res.status(200).json({ applications });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch job applications" });
//   }
// };

module.exports = {
  applyToJob,
  acceptApplication,
  rejectApplication,
  viewMyJobOffers,
};
