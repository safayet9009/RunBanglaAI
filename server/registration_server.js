require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/runbangla_ai";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Registration Server: MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err.message));

// Registration Model
const registrationSchema = new mongoose.Schema({
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
  status: { type: String, default: "success" },
  ticketId: { type: String, unique: true, sparse: true },
  qrCode: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model("Registration", registrationSchema);

// Helper: Generate Ticket ID
function generateTicketId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `RB-${timestamp}${random}`;
}

// Helper: Generate QR Code
function generateQRCode(ticketId) {
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <rect fill="white" width="200" height="200"/>
      <rect x="10" y="10" width="180" height="180" fill="none" stroke="black" stroke-width="2"/>
      <text x="100" y="110" text-anchor="middle" font-size="12" fill="black">${ticketId}</text>
    </svg>`
  ).toString("base64")}`;
}

// Helper: Apply Promo Code
function applyPromoCode(code, baseAmount) {
  const promoCodes = {
    "RUN10": 10,
    "RUN20": 20,
    "BANGLA5": 5,
    "FITLIFE15": 15
  };

  const discount = promoCodes[code?.toUpperCase()];
  
  if (discount) {
    const discountAmount = (baseAmount * discount) / 100;
    return {
      valid: true,
      discountPercentage: discount,
      finalAmount: baseAmount - discountAmount
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

// Health check
app.get("/", (req, res) => {
  res.json({ message: "🎯 Marathon Registration API (Port 5001)" });
});

// Create Registration
app.post("/create", async (req, res) => {
  try {
    console.log("🟢 POST /create - Registration received");
    console.log("   Name:", req.body.name, "| Email:", req.body.email);

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
      console.log("❌ Validation failed - missing fields");
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

    console.log("✅ Generating ticket:", ticketId);

    // Create registration document
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

    // Save to MongoDB
    await registration.save();
    console.log("✅ Registration saved to MongoDB");

    // Send response
    return res.status(201).json({
      success: true,
      message: "✅ Registration successful!",
      data: {
        registrationId: registration._id,
        ticketId: registration.ticketId,
        eventName: registration.eventName,
        name: registration.name,
        category: registration.category,
        tshirtSize: registration.tshirtSize,
        amount: registration.amount,
        finalAmount: registration.finalAmount,
        discountPercentage: registration.discountPercentage,
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
app.get("/get/:id", async (req, res) => {
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
app.get("/user/:email", async (req, res) => {
  try {
    const registrations = await Registration.find({ email: req.params.email });
    return res.json({ success: true, data: registrations });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Get all registrations
app.get("/all", async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: registrations.length, data: registrations });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ==================
// START SERVER
// ==================
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`\n✅ Registration Server running on http://localhost:${PORT}\n`);
});
