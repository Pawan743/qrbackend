const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const User = require("./models/User"); // Import User model

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" })); // For handling large data like photos
app.use("/api", userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Route: Save Form Data
// app.post("/api/users", async (req, res) => {
//   try {
//     const userData = req.body;

//     const newUser = new User(userData);
//     const savedUser = await newUser.save();

//     res.status(201).json({ success: true, user: savedUser });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// Route: Get User Data by QR Code
app.get("/api/user-details/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching user", error });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const userData = req.body;

    // Generate unique QR code data
    userData.qrData = uuidv4(); // Example using UUID

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    res.status(201).json({ success: true, user: savedUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0"; // Ensure you bind to 0.0.0.0
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
