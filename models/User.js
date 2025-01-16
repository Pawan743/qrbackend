const mongoose = require("mongoose");

const familyMemberSchema = new mongoose.Schema({
  name: String,
  relationship: String,
  foodPreference: String,
  age: Number,
  photo: String, // Optional: Store photo path or base64
});

const userSchema = new mongoose.Schema({
  photo: String, // Base64 encoded photo or file path
  fullName: String,
  email: String,
  mobile: String,
  address: String,
  zipCode: String,
  foodPreference: String,
  age: Number,
  additionalPerson: String,
  members: Number,
  familyDetails: [familyMemberSchema], // Embed family member details
  qrData: String, // Unique QR code data
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
