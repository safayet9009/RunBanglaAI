const express = require("express");
const router = express.Router();
const {
  createRegistration,
  getRegistrationById,
  getUserRegistrations,
  getAllRegistrations,
  getRegistrationStats
} = require("../controllers/registrationController");

console.log("🔷 Registration Routes: About to define routes");
console.log("  - createRegistration type:", typeof createRegistration);

// Create new registration
console.log("🔷 Registering POST /create route");
router.post("/create", createRegistration);
console.log("✅ POST /create registered");

// Get registration by ID
router.get("/:id", getRegistrationById);

// Get all registrations for a user
router.get("/user/:userId", getUserRegistrations);

// Get registration statistics - MUST BE BEFORE GET /
router.get("/stats/overview", getRegistrationStats);

// Get all registrations (admin) - MUST BE LAST
router.get("/", getAllRegistrations);

console.log("🔷 All registration routes defined, exporting router");
console.log("🔷 Router stack has", router.stack ? router.stack.length : 0, "routes");

module.exports = router;
