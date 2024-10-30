const pool = require("../config/db");

const createUser = async (
  fullname,
  username,
  email,
  password,
  role,
  profile_description,
  location,
  profilePicture,
  skills
) => {
  const query = `
    INSERT INTO users (
      fullname, username, email, password, role, profile_description, location, profile_picture, skills
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING *;
  `;

  const values = [
    fullname,
    username,
    email,
    password,
    role,
    profile_description,
    location,
    profilePicture,
    skills,
  ];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the newly created user
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const findUserByEmail = async (email) => {
  const query = `
    SELECT id, fullname, username, email, password, role, profile_description, profile_picture, location, created_at, updated_at
    FROM users
    WHERE email = $1
  `;
  const values = [email];
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};

const addTalent = async (
  userId,
  fullname,
  username,
  email,
  role,
  skills,
  profileDescription,
  location,
  profilePicture
) => {
  try {
    const query = `
      INSERT INTO talents (user_id, fullname, username, email, role, skills, profile_description, location, profile_picture)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    const values = [
      userId,
      fullname,
      username,
      email,
      role,
      skills,
      profileDescription,
      location,
      profilePicture,
    ];

    await pool.query(query, values);
  } catch (err) {
    console.error("Error adding talent:", err.message); // More specific error
    throw new Error("Error adding talent: " + err.message);
  }
};

module.exports = { createUser, findUserByEmail, addTalent };
