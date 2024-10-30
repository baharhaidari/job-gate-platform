const pool = require("../config/db");

const getTalents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM talents");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const findTalentsByName = async (req, res) => {
  const { name } = req.query;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM talents WHERE fullname ILIKE $1",
      [`%${name}%`]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const getTalentDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM talents WHERE id = $1", [
      id,
    ]);
    res.json(rows[0]); // Return the specific talent
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getTalents,
  findTalentsByName,
  getTalentDetails,
};
