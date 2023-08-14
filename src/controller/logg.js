const express = require("express");
const router = express.Router();
const userModel = require("../models/login");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Admin Login
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email: user.email, role: user.role },
        process.env.SECRET_KEY
      );
      return res
        .status(200)
        .send({ access_token: token, email: user.email, role: user.role });
    } else {
      return res.status(401).send("Email and Password do not match");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});
module.exports = router;