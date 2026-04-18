const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

console.log("✅ User Routes Module Loading...");

// GET /api/user/profile - Get current user profile (protected)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    console.log("📍 GET /api/user/profile - userId:", req.userId);

    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("✅ Profile fetched successfully for:", user.name);

    res.json({
      success: true,
      message: "Profile fetched successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        xp: user.xp || 0,
        level: Math.floor((user.xp || 0) / 100) + 1,
        streak: user.streak || 0,
        avatar: user.avatar || null,
        workouts_completed: user.workouts_completed || 0,
        calories_burned: user.calories_burned || 0,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching profile:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
    });
  }
});

// GET /api/user/leaderboard - Get top users by XP (public)
router.get("/leaderboard", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    console.log("📊 GET /api/user/leaderboard - limit:", limit);

    const users = await User.find()
      .select("name email xp streak avatar")
      .sort({ xp: -1 })
      .limit(limit);

    const leaderboard = users.map((user, index) => ({
      _id: user._id,
      rank: index + 1,
      name: user.name,
      email: user.email,
      xp: user.xp || 0,
      level: Math.floor((user.xp || 0) / 100) + 1,
      streak: user.streak || 0,
      avatar: user.avatar || null,
    }));

    console.log("✅ Leaderboard fetched successfully - count:", leaderboard.length);

    res.json({
      success: true,
      message: "Leaderboard fetched successfully",
      leaderboard: leaderboard,
    });
  } catch (error) {
    console.error("❌ Error fetching leaderboard:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching leaderboard",
    });
  }
});

// PUT /api/user/update - Update user profile (protected)
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { name, avatar } = req.body;
    console.log("📝 PUT /api/user/update - userId:", req.userId, "name:", name);

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        ...(name && { name }),
        ...(avatar && { avatar }),
      },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("✅ User updated successfully");

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: user,
    });
  } catch (error) {
    console.error("❌ Error updating profile:", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
    });
  }
});

// POST /api/user/add-workout - Add workout and update XP (protected)
router.post("/add-workout", authMiddleware, async (req, res) => {
  try {
    const { type, duration, calories } = req.body;
    console.log("💪 POST /api/user/add-workout - userId:", req.userId, "type:", type);

    if (!type || !duration || !calories) {
      return res.status(400).json({
        success: false,
        message: "Workout type, duration, and calories are required",
      });
    }

    const xpGain = Math.ceil(duration * 10 + calories / 10);
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $inc: {
          xp: xpGain,
          workouts_completed: 1,
          calories_burned: calories,
          streak: 1,
        },
      },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("✅ Workout added - XP gained:", xpGain);

    res.json({
      success: true,
      message: "Workout recorded successfully",
      xpGained: xpGain,
      user: {
        _id: user._id,
        name: user.name,
        xp: user.xp,
        level: Math.floor(user.xp / 100) + 1,
        streak: user.streak,
      },
    });
  } catch (error) {
    console.error("❌ Error adding workout:", error.message);
    res.status(500).json({
      success: false,
      message: "Error adding workout",
    });
  }
});

module.exports = router;
