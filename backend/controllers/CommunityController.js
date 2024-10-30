const pool = require("../config/db");

// Create a new thread
const createThread = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user?.id;

    const result = await pool.query(
      "INSERT INTO threads (user_id, content) VALUES ($1, $2) RETURNING *",
      [userId, content]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating thread" });
  }
};

// Get all threads
const getThreads = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM threads ORDER BY created_at DESC`
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching threads" });
  }
};

// Get a single thread by ID along with its replies
const getThreadById = async (req, res) => {
  try {
    const { threadId } = req.params;

    const thread = await pool.query(
      `SELECT *
       FROM threads
       WHERE threads.id = $1`,
      [threadId]
    );

    if (thread.rows.length === 0)
      return res.status(404).json({ message: "Thread not found" });

    // Fetch replies for the thread
    const replies = await pool.query(
      `SELECT *
       FROM replies
       WHERE thread_id = $1`,
      [threadId]
    );

    res.status(200).json({
      thread: thread.rows[0],
      replies: replies.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching thread" });
  }
};

// Post a reply to a thread
const replyToThread = async (req, res) => {
  try {
    const { content } = req.body;
    const { threadId } = req.params;
    const userId = req.user?.id;

    const threadExists = await pool.query(
      "SELECT * FROM threads WHERE id = $1",
      [threadId]
    );
    if (!threadExists.rows.length)
      return res.status(404).json({ message: "Thread not found" });

    const result = await pool.query(
      "INSERT INTO replies (thread_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
      [threadId, userId, content]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error posting reply" });
  }
};

// Like a thread
const likeThread = async (req, res) => {
  try {
    const { threadId } = req.params;
    const userId = req.user.userId;

    const threadExists = await pool.query(
      "SELECT * FROM threads WHERE id = $1",
      [threadId]
    );
    if (!threadExists.rows.length)
      return res.status(404).json({ message: "Thread not found" });

    // Check if the user has already liked this thread
    const liked = await pool.query(
      "SELECT * FROM likes WHERE thread_id = $1 AND user_id = $2",
      [threadId, userId]
    );
    if (liked.rows.length > 0)
      return res
        .status(400)
        .json({ message: "You have already liked this thread" });

    const result = await pool.query(
      "INSERT INTO likes (thread_id, user_id) VALUES ($1, $2) RETURNING *",
      [threadId, userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error liking thread" });
  }
};

module.exports = {
  createThread,
  getThreads,
  getThreadById,
  replyToThread,
  likeThread,
};
