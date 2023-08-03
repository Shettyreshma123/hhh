const express = require("express");
const router = express.Router();
const userModel = require("../models/User");
const authenticate = require("../middleware/authentication");
// const constants=require("../config/constants");


router.get("/",authenticate, async (req, res) => {
  try {
    // console.log(req.user);
    // if (req.user.role != "Doctor") {
    //   return res.status(225).send("Unauthorized user")
    // }
    const doctors = await userModel.find({ role: "Doctor" })
    let data = await userModel.find();
    data = data.map((item) => {
      return {
        id:item.id,
        username: item.username,
        email: item.email,
        gender: item.gender,
        phone: item.phone,
        age:item.age,
        chiefcomplaint:item. chiefcomplaint,
        timeofregistration: item.timeofregistration,
        address:item.address,
        doctorId: item.doctor ? item.doctor._id : null,
        doctorName:item.doctorName,
        
      };
    });

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;


