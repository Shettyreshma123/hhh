const express = require("express");
const router = express.Router();
const docModel = require("../models/login");
const constants = require("../config/constants");
const authenticate = require("../middleware/authentication");

router.get("/", authenticate, async (req, res) => {
  try {
    let data = await docModel.find({ role: "Doctor", specialist: "Orthopedics" }); 
    data = data.map((item) => {
      return {
        id: item.id,
        username: item.username,
        email: item.email,
        phone: item.phone,
        address: item.address,
        gender: item.gender,
        DOB: item.DOB,
        specialist: item.specialist,
        isAvailable: item.isAvailable,
        image: constants.imagePath + item.image,
      };
    });

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;