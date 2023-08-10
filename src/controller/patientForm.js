// routes/patient.js

const express = require("express");
const router = express.Router();
const userModel = require("../models/User");

// Route for patient registration
router.post("/", async (req, res) => {
  try {
    const {
      username,
      email,
      gender,
      age,
      phone,
      dateofbirth,
      chiefcomplaint,
	  bloodgroup,
      date,
      time,
      address,
      message,
    } = req.body;

    // Check if the patient already exists based on the email
    // const existingPatient = await Patient.findOne({ email });
    // if (existingPatient) {
    //   return res
    //     .status(400)
    //     .json({ error: "Patient with the same email already exists" });
    // }

    // Create a new patient record

    
    const patient = new userModel({
      username,
      email,
      gender,
      age,
      phone,
      dateofbirth,
      chiefcomplaint,
	  bloodgroup,
      date,
      time,
      address,
      message,
    });

    // Save the patient record to the database
    await patient.save();

    res.status(201).json({ message: "Patient registered successfully", patient });
  } catch (error) {
    console.error("Error registering patient:", error);
    res.status(500).send(error.stack);
  }
});

module.exports = router;
