const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Assuming your user model is named User

// Get user details by ID
router.get("/user-details/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
