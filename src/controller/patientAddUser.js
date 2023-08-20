const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/Patient");
const docModel = require("../models/login");
const authenticate = require("../middleware/authentication");
// const { upload } = require("../middleware/upload");
const salt_round = 10;
// const mongoose = require("mongoose");


router.post("/", authenticate, async (req, res) => {
  try {
    const { username, email, phone, gender, age, chiefcomplaint,bloodgroup, timeofregistration,sugarlevel, bloodpressure, address,message, doctorId} = req.body;

    
    const doctor = await docModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }

    

    const data = await userModel.create({
      username: username,
      email: email,
      phone: phone,
      gender: gender,
      age: age,
      chiefcomplaint: chiefcomplaint,
      bloodgroup: bloodgroup,
      timeofregistration: timeofregistration,
      sugarlevel: sugarlevel,
      bloodpressure: bloodpressure,
      address: address,
      message: message,
      doctor: doctorId, // Save the doctor's ID in the patient model
      doctorName: doctor.username, // Save the doctor's username in the patient model
    });

    const responseData = {
      id: data.id,
      username: data.username,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      age: data.age,
      chiefcomplaint: data.chiefcomplaint,
      bloodgroup: data.bloodgroup,
      timeofregistration: data.timeofregistration,
      sugarlevel: data.sugarlevel,
      bloodpressure: data.bloodpressure,
      address: data.address,
      doctorId: doctor.id, // Include the doctor's ID in the response
      doctorName: doctor.username, // Include the doctor's username in the response
    };

    return res.status(200).send(responseData);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;



