const express = require("express");
const { register, login, upload } = require("../controllers/authController");
const uploadProfile = require("../middlewares/profileMulterConfig");
const router = express.Router();

router.post("/register", uploadProfile.single("profilePicture"), register);
router.post("/login", login);

module.exports = router;
