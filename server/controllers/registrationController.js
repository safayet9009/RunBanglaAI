const Registration = require("../models/Registration");
const User = require("../models/User");

// Generate unique ticket ID
function generateTicketId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `RB-${timestamp}${randomPart}`;
}

// Generate QR code (simple base64 format)
function generateQRCode(ticketId) {
  // Simple placeholder QR code - in production use qr-image or similar library
  return `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="white" width="200" height="200"/><text x="100" y="100" text-anchor="middle" dy=".3em" font-size="16" fill="black">${ticketId}</text></svg>`).toString("base64")}`;
}

// Apply promo code discount
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
      discountAmount: (baseAmount * discount) / 100,
      finalAmount: baseAmount - (baseAmount * discount) / 100
    };
  }

  return {
    valid: false,
    discountPercentage: 0,
    discountAmount: 0,
    finalAmount: baseAmount
  };
}

// Create Registration
exports.createRegistration = async (req, res) => {
  try {
    const {
      userId,
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

    // Validate required fields
    if (
      !eventId ||
      !eventName ||
      !name ||
      !email ||
      !phone ||
      !emergencyContact ||
      !tshirtSize ||
      !category ||
      !paymentMethod ||
      !amount
    ) {
      return res.status(400).json({
        success: false,
        message: "❌ All required fields must be provided"
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "❌ Invalid email format"
      });
    }

    // Validate phone format
    if (!/^\d{10,11}$/.test(phone.replace(/[\s\-]/g, ""))) {
      return res.status(400).json({
        success: false,
        message: "❌ Invalid phone number format"
      });
    }

    // Apply promo code discount
    const discountResult = applyPromoCode(discountCode, amount);

    // Generate ticket ID
    const ticketId = generateTicketId();
    const qrCode = generateQRCode(ticketId);

    // Create registration
    const registration = new Registration({
      userId: userId || null,
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
      discountCode: discountResult.valid ? discountCode.toUpperCase() : null,
      discountPercentage: discountResult.discountPercentage,
      finalAmount: discountResult.finalAmount,
      status: "success",
      ticketId,
      qrCode
    });

    await registration.save();

    // Add XP to user if userId provided
    if (userId) {
      try {
        await User.findByIdAndUpdate(
          userId,
          {
            $inc: { xp: 100 },
            $addToSet: { badges: "Marathon Challenger" }
          },
          { new: true }
        );
      } catch (error) {
        console.log("⚠️  Could not update user XP:", error.message);
        // Continue even if XP update fails
      }
    }

    console.log(`✅ Registration created successfully - Ticket: ${ticketId}`);

    return res.status(201).json({
      success: true,
      message: "✅ Registration successful!",
      data: {
        registrationId: registration._id,
        ticketId: registration.ticketId,
        eventName: registration.eventName,
        name: registration.name,
        email: registration.email,
        category: registration.category,
        tshirtSize: registration.tshirtSize,
        finalAmount: registration.finalAmount,
        discountPercentage: registration.discountPercentage,
        qrCode: registration.qrCode,
        createdAt: registration.createdAt
      }
    });
  } catch (error) {
    console.error("❌ Error creating registration:", error);
    return res.status(500).json({
      success: false,
      message: "❌ Error creating registration",
      error: error.message
    });
  }
};

// Get registration by ID
exports.getRegistrationById = async (req, res) => {
  try {
    const { id } = req.params;

    const registration = await Registration.findById(id).populate("userId", "name email");

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "❌ Registration not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: registration
    });
  } catch (error) {
    console.error("❌ Error fetching registration:", error);
    return res.status(500).json({
      success: false,
      message: "❌ Error fetching registration",
      error: error.message
    });
  }
};

// Get all registrations for a user
exports.getUserRegistrations = async (req, res) => {
  try {
    const { userId } = req.params;

    const registrations = await Registration.find({ userId }).sort({
      createdAt: -1
    });

    if (registrations.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No registrations found",
        data: []
      });
    }

    return res.status(200).json({
      success: true,
      data: registrations
    });
  } catch (error) {
    console.error("❌ Error fetching user registrations:", error);
    return res.status(500).json({
      success: false,
      message: "❌ Error fetching user registrations",
      error: error.message
    });
  }
};

// Get all registrations (admin)
exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({
      createdAt: -1
    });

    return res.status(200).json({
      success: true,
      total: registrations.length,
      data: registrations
    });
  } catch (error) {
    console.error("❌ Error fetching all registrations:", error);
    return res.status(500).json({
      success: false,
      message: "❌ Error fetching registrations",
      error: error.message
    });
  }
};

// Get registration statistics
exports.getRegistrationStats = async (req, res) => {
  try {
    const totalRegistrations = await Registration.countDocuments();
    const successfulRegistrations = await Registration.countDocuments({
      status: "success"
    });
    const totalRevenue = await Registration.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, total: { $sum: "$finalAmount" } } }
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalRegistrations,
        successfulRegistrations,
        totalRevenue: totalRevenue[0]?.total || 0,
        conversionRate: (
          (successfulRegistrations / totalRegistrations) *
          100
        ).toFixed(2) + "%"
      }
    });
  } catch (error) {
    console.error("❌ Error fetching registration stats:", error);
    return res.status(500).json({
      success: false,
      message: "❌ Error fetching registration stats",
      error: error.message
    });
  }
};
