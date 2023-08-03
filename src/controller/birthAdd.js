const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");
const birthModel = require("../models/birth");
const loginModel = require("../models/login");
const salt_round = 10;
// const { upload } = require("../middleware/uploads");
const authenticate = require("../middleware/authentication");

router.post("/", authenticate,  async (req, res) => {
  try {
    const { username,birthtype,doctor,date,time} = req.body;

    // if (req.user && req.user.role !== "Admin") {
    //   return res.send("Unauthorized user");
    // }
    const doctorExists = await loginModel.exists({ username: doctor });
    if (!doctorExists) {
      return res.status(400).send("Invalid doctor name");
    }

    if (!username || username === "") {
      return res.status(400).send("Username is required");
    }
    if (!birthtype || birthtype === "") {
      return res.status(400).send("Birthtype is required");
    }
    if (!doctor || doctor === "") {
      return res.status(400).send("Doctor is required");
    }
    
    if (!date || date === "") {
      return res.status(400).send("Date is required");
    }
    if (!time || time === "") {
      return res.status(400).send("Time is required");
    }
   
    

    
    const data = await birthModel.create({
      username: username,
      birthtype:birthtype,
	  doctor:doctor,
      date:date,
	  time:time,
      
    });

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
