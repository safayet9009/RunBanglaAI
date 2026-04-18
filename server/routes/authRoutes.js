const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

console.log("✅ Auth Routes Module Loading...");

// Debug route
router.get("/test", (req, res) => {
  console.log("🔷 Auth test route hit!");
  res.json({ message: "Auth routes are working!" });
});

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// POST /api/auth/signup - Register new user
router.post("/signup", async (req, res) => {
  try {
    console.log("\n📝 === SIGNUP REQUEST RECEIVED ===");
    console.log("📋 Body:", req.body);
    console.log("⏰ Time:", new Date().toISOString());

    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      console.log("❌ VALIDATION FAILED: Missing fields");
      console.log("   name:", name, "| email:", email, "| password:", password ? "***" : "null");
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      console.log("❌ VALIDATION FAILED: Passwords do not match");
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (password.length < 6) {
      console.log("❌ VALIDATION FAILED: Password too short");
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check if user already exists
    console.log("🔍 Checking if user exists:", email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ USER ALREADY EXISTS:", email);
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Create new user
    console.log("💾 Creating new user...");
    const newUser = new User({ name, email, password });
    console.log("📦 User object created (before save):", newUser);
    
    await newUser.save();
    console.log("✅ USER SAVED TO DATABASE");
    console.log("   ID:", newUser._id);
    console.log("   Email:", newUser.email);
    console.log("   Name:", newUser.name);

    // Generate token
    const token = generateToken(newUser._id);
    console.log("🎫 Token generated");

    const response = {
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        xp: newUser.xp,
        level: newUser.level,
        streak: newUser.streak,
      },
    };

    console.log("✅ SIGNUP SUCCESSFUL - Sending response");
    res.status(201).json(response);
  } catch (error) {
    console.error("\n🔴 === SIGNUP ERROR ===");
    console.error("❌ Error Message:", error.message);
    console.error("❌ Error Code:", error.code);
    console.error("❌ Error Name:", error.name);
    console.error("❌ Full Error:", error);
    if (error.errors) {
      console.error("❌ Validation Errors:", error.errors);
    }
    
    res.status(500).json({
      success: false,
      message: "Error during signup",
      error: error.message,
      errorCode: error.code,
    });
  }
});

// POST /api/auth/login - Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error during login",
      error: error.message,
    });
  }
});

// GET /api/auth/profile - Get user profile (protected)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message,
    });
  }
});

// POST /api/auth/logout - Logout (client-side token removal)
router.post("/logout", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = router;
