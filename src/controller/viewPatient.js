// // const express = require("express");
// // const router = express.Router();
// // const userModel = require("../models/Patient");
// // const authenticate = require("../middleware/authentication");
// // // const constants=require("../config/constants");


// // router.get("/",authenticate, async (req, res) => {
// //   try {
// //     // console.log(req.user);
// //     // if (req.user.role != "Doctor") {
// //     //   return res.status(225).send("Unauthorized user")
// //     // }
// //     // const doctors = await userModel.find({ role: "Doctor" })
// //     let data = await userModel.find();
// //     data = data.map((item) => {
// //       return {
// //         id:item.id,
// //         username: item.username,
// //         email: item.email,
// //         gender: item.gender,
// //         phone: item.phone,
// //         age:item.age,
// //         chiefcomplaint:item. chiefcomplaint,
// //         bloodgroup: item.bloodgroup,
// //         address:item.address,
// //         Prescribe:item.Prescribe,
// //         // doctorId: item.doctor ? item.doctor._id : null,
// //         doctorName:item.doctorName,

        
// //       };
// //     });

// //     return res.status(200).send(data);
// //   } catch (error) {
// //     return res.status(500).send(error.stack);
// //   }
// // });

// // module.exports = router;




// const express = require("express");
// const router = express.Router();
// const userModel = require("../models/Patient");
// const authenticate = require("../middleware/authentication");

// router.get("/", authenticate, async (req, res) => {
//   try {
//     const patients = await userModel.find();

//     const patientDetails = patients.map((patient) => {
//       return {
//         id: patient.id,
//         username: patient.username,
//         email: patient.email,
//         gender: patient.gender,
//         phone: patient.phone,
//         age: patient.age,
//         chiefcomplaint: patient.chiefcomplaint,
//         bloodgroup: patient.bloodgroup,
//         address: patient.address,
//         doctorName: patient.doctorName,
//         Prescribe: patient.Prescribe,
//       };
//     });

//     return res.status(200).json(patientDetails);
//   } catch (error) {
//     return res.status(500).json({ error: "An error occurred while fetching patient details" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const userModel = require("../models/User");
const docModel = require("../models/login");
const constants = require("../config/constants");
const authenticate = require("../middleware/authentication")

router.get("/", authenticate, async (req, res) => {
  try {
    let data = await userModel.find();
    data = data.map((item) => {
      return {
        id:item.id,
        username: item.username,
        email: item.email,
        phone: item.phone,
        gender: item.gender,
        age: item.age,
        chiefcomplaint:item.chiefcomplaint,
        bloodgroup: item.bloodgroup,
        sugarlevel: item.sugarlevel,
        bloodpressure: item.bloodpressure,
        timeofregistration: item.timeofregistration,
        address:item.address,
        message:item.message,
        doctorId: item.doctor ? item.doctor._id : null,
        doctorName: item.doctorName,
        status: item.status,
        prescribe: item.prescribe,
      };
    });
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;
