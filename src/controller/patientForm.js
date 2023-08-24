// const express = require("express");
// const router = express.Router();
// const Patient = require("../models/Patient");
// const authenticate = require('../middleware/authentication');

// // Route for patient registration
// router.post("/",authenticate, async (req, res) => {
//   try {
//     const {
//       username,
//       email,
//       gender,
//       dateofbirth,
//       phone,
//       age,
//       department,
//       chiefcomplaint,
//       bloodgroup,
//       date,
//       address,
//     } = req.body;

//   // console.log(req.user);
    
//     const patient = new Patient({
//       // userId:req.user. user_id,
//       username,
//       email,
//       gender,
//       dateofbirth,
//       phone,
//       age,
//       department,
//       chiefcomplaint,
//       bloodgroup,
//       date,
//       address,
//     });

//     // Save the patient record to the database
//     await patient.save();

//     res.status(201).json({ message: "Patient registered successfully", patient });
//   } catch (error) {
//     console.error("Error registering patient:", error);
//     res.status(500).send(error.stack);
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const userModel = require("../models/Patient");
const docModel = require("../models/login");
const authenticate = require("../middleware/authentication");
const mongoose = require("mongoose");

router.put("/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const {
      username,
      email,
      gender,
      dateofbirth,
      phone,
      age,
      department,
      chiefcomplaint,
      bloodgroup,
      address,
    } = req.body;

    const patient = await userModel.findById(id);
    if (!patient) {
      return res.status(404).send("Patient not found");
    }

    const updatedData = {
      id: id,
      username: username,
      email: email,
      gender: gender,
      phone: phone,
      dateofbirth: dateofbirth,
      age: age,
      department: department,
      chiefcomplaint: chiefcomplaint,
      bloodgroup: bloodgroup,
      address: address,
    };
    await userModel.findByIdAndUpdate(id, updatedData);
    const data = await userModel.findById(id);

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});
module.exports = router;