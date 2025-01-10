const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  photo: String, // Base64 encoded photo or file path
  fullName: String,
  email: String,
  mobile: String,
  address: String,
  zipCode: String,
  additionalPerson: String,
  members: Number,
  qrData: String, // Unique QR code data
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
