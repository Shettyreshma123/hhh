const express = require("express");
const router = express.Router();
const bloodModel = require("../models/blood");
const bloodbankModel = require("../models/bloodbank");
const authenticate = require("../middleware/authentication");

router.post("/", authenticate, async (req, res) => {
  try {
    const {
      username,
      email,
      phone,
      gender,
      age,
      bloodgroup,
      noofbags,
      date,
      address,
    } = req.body;

    // Validation checks for required fields

    const newDonor = await bloodModel.create({
      username,
      email,
      phone,
      gender,
      age,
      bloodgroup,
      noofbags,
      date,
      address,
    });

    // Update the blood bank information
    let bloodBank = await bloodbankModel.findOne({ bloodgroup: bloodgroup });
    if (bloodBank) {
      bloodBank.totalbags += parseInt(noofbags, 10);
    } else {
      bloodBank = new bloodbankModel({ bloodgroup, totalbags: parseInt(noofbags, 10) });
    }
    await bloodBank.save();

    return res.status(200).send(newDonor);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;
