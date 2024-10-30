const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const {
  getTalents,
  findTalentsByName,
  getTalentDetails,
} = require("../controllers/talentsController");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

// talents routes
router.get("/talents", getTalents);
router.get("/talents/search", authenticateToken, findTalentsByName);
router.get(
  "/talents/:id",
  authenticateToken,
  // roleMiddleware(["Client"]),
  getTalentDetails
);

module.exports = router;
