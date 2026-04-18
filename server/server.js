require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ==================
// MIDDLEWARE
// ==================
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

// ==================
// CONNECT MONGODB
// ==================
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/runbangla_ai";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err.message));

// ==================
// IMPORT ROUTES
// ==================
const authRoutes = require("./routes/authRoutes");

// ==================
// REGISTRATION MODEL
// ==================
const registrationSchema = new mongoose.Schema({
  userId: { type: String, default: null },
  eventId: { type: Number, required: true },
  eventName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  tshirtSize: { type: String, required: true },
  category: { type: String, required: true },
  medicalCondition: { type: String, default: "" },
  paymentMethod: { type: String, required: true },
  amount: { type: Number, required: true },
  discountCode: { type: String, default: null },
  discountPercentage: { type: Number, default: 0 },
  finalAmount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "success", "failed"], default: "success" },
  ticketId: { type: String, unique: true, sparse: true },
  qrCode: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model("Registration", registrationSchema);

// ==================
// HELPER FUNCTIONS
// ==================
function generateTicketId() {
  return "RB-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function generateQRCode(ticketId) {
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <rect fill="white" width="200" height="200"/>
      <text x="100" y="100" text-anchor="middle" dy=".3em" font-size="14" fill="black">${ticketId}</text>
    </svg>`
  ).toString("base64")}`;
}

function applyPromoCode(code, baseAmount) {
  const promoCodes = {
    "RUN10": 10,
    "RUN20": 20,
    "BANGLA5": 5,
    "FITLIFE15": 15
  };

  const discount = promoCodes[code?.toUpperCase()];
  
  if (discount) {
    return {
      valid: true,
      discountPercentage: discount,
      finalAmount: baseAmount - (baseAmount * discount) / 100
    };
  }

  return {
    valid: false,
    discountPercentage: 0,
    finalAmount: baseAmount
  };
}

// ==================
// ROUTES
// ==================

app.get("/", (req, res) => {
  res.json({ message: "🎯 Marathon Registration API" });
});

// Create Registration
app.post("/api/registration/create", async (req, res) => {
  try {
    console.log("🟢 POST /api/registration/create");
    
    const {
      eventId,
      eventName,
      name,
      email,
      phone,
      emergencyContact,
      tshirtSize,
      category,
      medicalCondition,
      paymentMethod,
      amount,
      discountCode
    } = req.body;

    // Validation
    if (!eventId || !eventName || !name || !email || !phone || !emergencyContact || !tshirtSize || !category || !paymentMethod || !amount) {
      console.log("❌ Missing required fields");
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Apply promo code
    const discountResult = applyPromoCode(discountCode, amount);

    // Generate ticket
    const ticketId = generateTicketId();
    const qrCode = generateQRCode(ticketId);

    // Create registration
    const registration = new Registration({
      eventId,
      eventName,
      name,
      email,
      phone,
      emergencyContact,
      tshirtSize,
      category,
      medicalCondition: medicalCondition || "",
      paymentMethod,
      amount,
      discountCode: discountResult.valid ? discountCode?.toUpperCase() : null,
      discountPercentage: discountResult.discountPercentage,
      finalAmount: discountResult.finalAmount,
      status: "success",
      ticketId,
      qrCode
    });

    await registration.save();
    console.log("✅ Registration saved:", ticketId);

    return res.status(201).json({
      success: true,
      message: "✅ Registration successful!",
      data: {
        registrationId: registration._id,
        ticketId: registration.ticketId,
        eventName: registration.eventName,
        name: registration.name,
        email: registration.email,
        phone: registration.phone,
        category: registration.category,
        tshirtSize: registration.tshirtSize,
        amount: registration.amount,
        finalAmount: registration.finalAmount,
        discountPercentage: registration.discountPercentage,
        status: registration.status,
        qrCode: registration.qrCode,
        createdAt: registration.createdAt
      }
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message
    });
  }
});

// Get registration by ID
app.get("/api/registration/:id", async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.json({ success: true, data: registration });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Get user registrations
app.get("/api/registration/user/:userId", async (req, res) => {
  try {
    const registrations = await Registration.find({ userId: req.params.userId });
    return res.json({ success: true, data: registrations });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==================
// USE ROUTE MODULES
// ==================
app.use("/api/auth", authRoutes);

// ==================
// START SERVER
// ==================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}\n`);
});
