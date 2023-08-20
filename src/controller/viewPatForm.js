
// const express = require("express");
// const router = express.Router();
// const patientModel = require("../models/Patient");
// const authenticate = require("../middleware/authentication");

// router.get("/", authenticate, async (req, res) => {
//   try {
//     const currentDate = new Date();
//     const formattedCurrentDate = formatDate(currentDate);

//     // Fetch patient data for the current date only
//     const data = await patientModel.find({
//       date: formattedCurrentDate,
//     });

//     const formattedData = data.map((item) => {
//       return {
//         id: item.id,
//         username: item.username,
//         email: item.email,
//         gender: item.gender,
//         age: item.age,
//         phone: item.phone,
//         dateofbirth: item.dateofbirth,
//         chiefcomplaint: item.chiefcomplaint,
//         bloodgroup: item.bloodgroup,
//         sugarlevel: item.sugarlevel,
//         bloodpressure: item.bloodpressure,
//         timeofregistration: item.timeofregistration,
//         date: item.date,
//         // time: item.time,
//         address: item.address,
//         message: item.message,
//         doctorId: item.doctor ? item.doctor._id : null,
//         doctorName: item.doctorName,
//         status: item.status,
//       };
//     });

//     return res.status(200).send(formattedData);
//   } catch (error) {
//     return res.status(500).send(error.stack);
//   }
// });

// function formatDate(inputDate) {
//   const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
//   const day = inputDate.getDate().toString().padStart(2, "0");
//   const year = inputDate.getFullYear();
//   return `${month}-${day}-${year}`;
// }

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const patientModel = require("../models/Patient");
// const { parse, format } = require("date-fns");
// const authenticate = require("../middleware/authentication");

// router.get("/", authenticate, async (req, res) => {
//   try {
//     const currentDate = new Date();
//     const formattedCurrentDate = formatDate(currentDate);

//     // Fetch patient data for the current date only
//     const data = await patientModel.find({
//       date: formattedCurrentDate,
//     });

//     const formattedData = data.map((item) => {
//       // Convert date strings from "dd-mm-yyyy" to JavaScript Date objects
//       const dateofbirth = parse(item.dateofbirth, "dd-MM-yyyy", new Date());
//       const date = parse(item.date, "dd-MM-yyyy", new Date());

//       return {
//         id: item.id,
//         username: item.username,
//         email: item.email,
//         gender: item.gender,
//         age: item.age,
//         phone: item.phone,
//         dateofbirth: format(dateofbirth, "dd-MM-yyyy"), // Format the date
//         chiefcomplaint: item.chiefcomplaint,
//         bloodgroup: item.bloodgroup,
//         sugarlevel: item.sugarlevel,
//         bloodpressure: item.bloodpressure,
//         timeofregistration: item.timeofregistration,
//         date: format(date, "dd-MM-yyyy"), // Format the date
//         // time: item.time,
//         address: item.address,
//         message: item.message,
//         doctorId: item.doctor ? item.doctor._id : null,
//         doctorName: item.doctorName,
//         status: item.status,
//       };
//     });

//     return res.status(200).send(formattedData);
//   } catch (error) {
//     return res.status(500).send(error.stack);
//   }
// });

// function formatDate(inputDate) {
//   const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
//   const day = inputDate.getDate().toString().padStart(2, "0");
//   const year = inputDate.getFullYear();
//   return `${day}-${month}-${year}`;
// }

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const patientModel = require("../models/Patient");
// const authenticate = require("../middleware/authentication");
// // const constants=require("../config/constants");


// router.get("/",authenticate, async (req, res) => {
//   try {
//     // console.log(req.user);
//     // if (req.user.role != "Doctor") {
//     //   return res.status(225).send("Unauthorized user")
//     // }
//     const doctors = await patientModel.find({ role: "Doctor" })
//     let data = await patientModel.find();
//     data = data.map((item) => {
//       return {
//         id:item.id,
//         username: item.username,
//         email: item.email,
//         gender: item.gender,
//         age:item.age,
// 		phone: item.phone,
// 		dateofbirth:item.dateofbirth,
//         chiefcomplaint:item. chiefcomplaint,
//         bloodgroup: item.bloodgroup,
// 		sugarlevel: item.sugarlevel,
//         bloodpressure: item.bloodpressure,
//         timeofregistration: item.timeofregistration,
//         date:item.date,
// 		time:item.time,
//         address:item.address,
//         message:item.message,
//         doctorId: item.doctor ? item.doctor._id : null,
//         doctorName:item.doctorName,
//         message:item.message,
// 		status:item.status,
        
//       };
//     });

//     return res.status(200).send(data);
//   } catch (error) {
//     return res.status(500).send(error.stack);
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const patientModel = require("../models/Patient");
const authenticate = require("../middleware/authentication");

router.get("/", authenticate, async (req, res) => {
  try {
    const currentDate = new Date();
    const formattedCurrentDate = formatDate(currentDate);

    // Fetch patient data for the current date only
    const data = await patientModel.find({
      date: formattedCurrentDate,
    });

    const formattedData = data.map((item) => {
      return {
        id: item.id,
        username: item.username,
        email: item.email,
        gender: item.gender,
        age: item.age,
        phone: item.phone,
        dateofbirth: item.dateofbirth,
        chiefcomplaint: item.chiefcomplaint,
        bloodgroup: item.bloodgroup,
        sugarlevel: item.sugarlevel,
        bloodpressure: item.bloodpressure,
        timeofregistration: item.timeofregistration,
        date: formattedCurrentDate,
        time: item.time,
        address: item.address,
        message: item.message,
        doctorId: item.doctor ? item.doctor._id : null,
        doctorName: item.doctorName,
        status: item.status,
      };
    });

    return res.status(200).json(formattedData);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

function formatDate(inputDate) {
  const day = inputDate.getDate().toString().padStart(2, "0");
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const year = inputDate.getFullYear();
  return `${day}-${month}-${year}`;
}

module.exports = router;
