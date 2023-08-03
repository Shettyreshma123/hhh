const express = require("express");
const router = express.Router();
const userModel = require("../models/login");
const authenticate = require("../middleware/authentication");
const { upload } = require("../middleware/uploads");
const constants=require("../config/constants");

router.get("/:id", authenticate, upload.single("image"), async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const profileData = {
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      image:constants.imagePath+user.image,
    };
    // if (req.file) {
    //   profileData.image = req.file.originalname;
    // }
   
    res.status(200).json({ profile: profileData });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
