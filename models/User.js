const mongoose = require("mongoose");

const familyMemberSchema = new mongoose.Schema({
  name: String,
  relationship: String,
  foodPreference: String,
  age: Number,
});

const userSchema = new mongoose.Schema({
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
