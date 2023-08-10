const express = require("express");
const router = express.Router();
const patientModel = require("../models/User");
const authenticate = require("../middleware/authentication");
// const constants=require("../config/constants");


router.get("/",authenticate, async (req, res) => {
  try {
    // console.log(req.user);
    // if (req.user.role != "Doctor") {
    //   return res.status(225).send("Unauthorized user")
    // }
    const doctors = await patientModel.find({ role: "Doctor" })
    let data = await patientModel.find();
    data = data.map((item) => {
      return {
        id:item.id,
        username: item.username,
        email: item.email,
        gender: item.gender,
        age:item.age,
		phone: item.phone,
		dateofbirth:item.dateofbirth,
        chiefcomplaint:item. chiefcomplaint,
        bloodgroup: item.bloodgroup,
		sugarlevel: item.sugarlevel,
        bloodpressure: item.bloodpressure,
        timeofregistration: item.timeofregistration,
        date:item.date,
		time:item.time,
        address:item.address,
        message:item.message,
        doctorId: item.doctor ? item.doctor._id : null,
        doctorName:item.doctorName,
        message:item.message,
		status:item.status,
        
      };
    });

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;


