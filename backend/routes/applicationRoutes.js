const express = require("express");
const {
  applyToJob,
  rejectApplication,
  acceptApplication,
  viewMyJobOffers,
} = require("../controllers/ApplicationController");
const authenticateToken = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = express.Router();

router.post(
  "/jobs/:jobId/apply",
  upload.single("cv"),
  authenticateToken,
  // roleMiddleware(["Applicant"]),
  applyToJob
);
router.put(
  "/applications/:applicationId/accept",
  authenticateToken,
  // roleMiddleware(["Client"]),
  acceptApplication
);
router.put(
  "/applications/:applicationId/reject",
  authenticateToken,
  // roleMiddleware(["Client"]),
  rejectApplication
);
router.get(
  "/jobs/:jobId/applications",
  authenticateToken,
  // roleMiddleware(["Client"]),
  viewMyJobOffers
);

module.exports = router;
