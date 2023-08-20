const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

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
    } = req.body;

    
    
    const patient = new Patient({
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



// const express = require("express");
// const router = express.Router();
// const Patient = require("../models/Patient");

// router.post("/", async (req, res) => {
//   try {
//     const {
//       username,
//       email,
//       gender,
//       age,
//       phone,
//       dateofbirth,
//       chiefcomplaint,
//       bloodgroup,
//       date,
//       time,
//       address,
//     } = req.body;

//     // Retrieve the email from the query string
//     // const queryEmail = req.query.email

//     // Validate and save patient data
//     // ... (perform validation and data saving as needed)

//     const patient = new Patient({
//       username,
//       email, // Use the email from the query string
//       gender,
//       age,
//       phone,
//       dateofbirth,
//       chiefcomplaint,
//       bloodgroup,
//       date,
//       time,
//       address,
//     });

//     await patient.save();

//     return res.status(201).json({
//       message: "Patient registered successfully",
//       patient,
//     });
//   } catch (error) {
//     console.error("Error registering patient:", error);
//     return res.status(500).send(error.stack);
//   }
// });

// module.exports = router;





