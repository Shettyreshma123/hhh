const express = require("express");
const router = express.Router();
const userModel = require("../models/login");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).send("New password and confirm password do not match");
    }

    // Fetch the user from the database based on the provided email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare the oldPassword from the request to the hashed password stored in the database
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      return res.status(401).send("Incorrect old password");
    }

    // Hash the new password before saving it
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and save the changes
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).send("Password changed successfully");
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;