const express = require("express");
const router = express.Router();
const userModel = require("../models/Patient");
const constant = require("../config/constants");

router.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const patients = await userModel.find({
      username: { $regex: username, $options: "i" },
    });

    const transformedPatients = patients.map((patient) => {
      return {
        id: patient._id,
        // firstname: patient.firstname,
        // lastname: patient.lastname,
        username:patient.username,
        email: patient.email,
        phone: patient.phone,
      };
    });

    if (transformedPatients.length > 0) {
      return res.status(200).json(transformedPatients);
    } else {
      return res.status(404).json({ message: "No patients found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while searching for patients" });
  }
});

module.exports = router;