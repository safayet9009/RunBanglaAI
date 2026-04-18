const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔵 Attempting to connect to MongoDB...");
    console.log("📍 MONGO URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    console.log("✅ MongoDB Connected Successfully! 🚀");
    console.log("📊 Database:", mongoose.connection.name);
  } catch (error) {
    console.error("🔴 DB Connection Error:", error.message);
    console.error("⚠️  WARNING: Database not available. Running in offline mode.");
    console.error("💡 Please make sure MongoDB is running on:", process.env.MONGO_URI);
    // Don't exit - allow server to continue for testing
  }
};

module.exports = connectDB;