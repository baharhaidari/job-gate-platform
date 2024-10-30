const pool = require("../config/db");

// Save message function
const saveMessage = async (senderId, receiverId, chatRoomId, content) => {
  try {
    // Check that receiverId and content are provided
    if (!receiverId || !content || !chatRoomId) {
      throw new Error(
        "Receiver ID, chat room ID, and message content are required"
      );
    }

    const query = `INSERT INTO messages (sender_id, receiver_id, chat_room_id, message, timestamp) 
       VALUES ($1, $2, $3, $4, NOW()) RETURNING *`;
    const values = [senderId, receiverId, chatRoomId, content]; // Make sure to include chatRoomId

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
};

// Function to get messages by room ID
const getMessagesByRoom = async (roomId) => {
  const result = await pool.query(
    "SELECT m.message, m.timestamp, u.username FROM messages m JOIN users u ON m.sender_id = u.id WHERE chat_room_id = $1 ORDER BY m.timestamp",
    [roomId]
  );
  return result.rows;
};

module.exports = {
  saveMessage,
  getMessagesByRoom,
};
