const {
  createUser,
  findUserByEmail,
  addTalent,
} = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile"); // Save files to the uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

exports.upload = multer({ storage });

exports.register = async (req, res) => {
  const {
    fullname,
    username,
    email,
    password,
    role,
    profile_description,
    location,
    skills,
  } = req.body;

  // Get the path of the uploaded profile picture
  const profilePicture = req.file.path;

  try {
    // Check if the user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await createUser(
      fullname,
      username,
      email,
      hashedPassword,
      role,
      profile_description,
      location,
      profilePicture,
      role === "Applicant" ? skills : null
    );

    if (role === "Applicant") {
      await addTalent(
        newUser.id,
        fullname,
        username,
        email,
        role,
        skills,
        profile_description,
        location,
        profilePicture
      );
    }

    // Generate a token for the new user (usually after signup is successful)
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    // Respond with the token and user data
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error("Error in register function:", error); // Log the error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Sign JWT token with the user ID
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );

    res.status(200).json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
