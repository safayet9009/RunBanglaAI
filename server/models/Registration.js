const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    eventId: {
      type: Number,
      required: true
    },
    eventName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    emergencyContact: {
      type: String,
      required: true
    },
    tshirtSize: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: true
    },
    category: {
      type: String,
      enum: ["5K", "10K", "21K"],
      required: true
    },
    medicalCondition: {
      type: String,
      default: ""
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "debit_card", "mobile_banking", "bank_transfer"],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    discountCode: {
      type: String,
      default: null
    },
    discountPercentage: {
      type: Number,
      default: 0
    },
    finalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending"
    },
    ticketId: {
      type: String,
      unique: true,
      sparse: true
    },
    qrCode: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Registration", registrationSchema);
