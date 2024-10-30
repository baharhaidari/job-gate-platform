const db = require("../config/db");

const Application = {};

// Create an application
Application.create = async (data) => {
  const {
    userId,
    jobId,
    proposal,
    cvUrl,
    githubLink,
    coverLetter,
    rate,
    paymentSuggestion,
    rateIncrease,
  } = data;

  const query = `
    INSERT INTO applications (user_id, job_id, proposal, cv_url, github_link, cover_letter, rate, payment_suggestion, rate_increase)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;
  const values = [
    userId,
    jobId,
    proposal,
    cvUrl,
    githubLink,
    coverLetter,
    rate,
    paymentSuggestion,
    rateIncrease,
  ];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error("Error creating application");
  }
};

module.exports = Application;
