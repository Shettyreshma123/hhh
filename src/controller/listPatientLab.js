const express = require("express");
const router = express.Router();
const userModel = require("../models/Patient");
const authenticate = require("../middleware/authentication")

router.get("/", authenticate, async (req, res) => {
  try {
    let data = await userModel.find();
    data = data
      .filter((item) => item.testtype) 
      .map((item) => {
        return {
          id: item.id,
          username: item.username,
          email: item.email,
          age: item.age,
          chiefcomplaint: item.chiefcomplaint,
          bloodgroup: item.bloodgroup,
          testtype: item.testtype,
        };
      });
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const userModel = require("../models/patient");
// const authenticate = require("../middleware/authentication");

// router.get("/", authenticate, async (req, res) => {
//   try {
//     const { testtype } = req.query; // Get the testType from query parameter

//     // Validate testType
//     if (!["BloodTest", "BPTest", "SugarTest", "UrineTest"].includes(testType)) {
//       return res.status(400).send("Invalid testType");
//     }

//     // Fetch patient data based on testType
//     let data = await userModel.find({ testtype: { $regex: new RegExp(testType, "i") } });

//     // Map the filtered data to the desired format
//     data = data.map((item) => {
//       return {
//         id: item.id,
//         username: item.username,
//         age: item.age,
//         chiefcomplaint: item.chiefcomplaint,
//         bloodgroup: item.bloodgroup,
//         testtype: item.testtype,
//       };
//     });

//     return res.status(200).send(data);
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// });

// module.exports = router;