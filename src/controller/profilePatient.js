const express = require("express");
const router = express.Router();
const userModel = require("../models/User");

router.get("/:id", async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await userModel.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const patientDetails = {
      id: patient._id,
      firstname: patient.firstname,
      lastname: patient.lastname,
      email: patient.email,
      phone: patient.phone,
      gender: patient.gender,
      age: patient.age,
      // chiefcomplaint: patient.chiefcomplaint,
      bloodgroup: patient.bloodgroup,
      // timeofregistration: patient.timeofregistration,
      // sugarlevel: patient.sugarlevel,
      // bloodpressure: patient.bloodpressure,
      // message: patient.message,
      address: patient.address,
    };

    return res.status(200).json({ patient: patientDetails });
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const userModel = require("../models/User");

// router.get("/:id", async (req, res) => {
//   try {
//     const patientId = req.params.id;
//     const patient = await userModel.findById(patientId);

//     if (!patient) {
//       return res.status(404).json({ error: "Patient not found" });
//     }

//     const patientDetails = {
//       id: patient._id,
//       username: patient.username,
//       email: patient.email,
//       phone: patient.phone,
//       gender: patient.gender,
//       age: patient.age,
//       bloodgroup: patient.bloodgroup,
//       address: patient.address,
//     };

//     return res.status(200).json({ patient: patientDetails });
//   } catch (error) {
//     return res.status(500).send(error.stack);
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const userModel = require('../models/Patient');
// const authenticate = require('../middleware/authentication');

// router.get('/:id', authenticate, async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const user = await userModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const userData = {
//       username: user.username,
//       email: user.email,
//       phone: user.phone,
//       address: user.address,
//       // Add other user profile data as needed
//     };

//     res.status(200).json({ profile: userData });
//   } catch (error) {
//     console.error('Error fetching user profile data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;
