const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const internsModel = require("../models/interns");
const salt_round = 10;
// const {upload}=require("../middleware/uploads");
const authenticate = require("../middleware/authentication");


router.post("/",authenticate, async (req, res) => {
  try {
    const { username, email, phone,gender,dateofbirth,address,educationalinstitution,startdate,enddate,status } = req.body;

    // if (req.user && req.user.role && req.user.role !== "Admin") {
    //   return res.send("Unauthorized user");
    // }

    if (!username || username === "") {
      return res.status(400).send("Username is required");
    }
    if (!email || email === "") {
      return res.status(400).send("Email is required");
    }
    if (!phone || phone === "") {
		return res.status(400).send("Phone is required");
	  }
	  if (!gender || gender === "") {
		return res.status(400).send("Gender is required");
	  }
	  if (!dateofbirth ||  dateofbirth=== "") {
		return res.status(400).send("Dateofbirth is required");
	  }
    if (!address || address === "") {
      return res.status(400).send("address is required");
    }
	if (!educationalinstitution|| educationalinstitution === "") {
		return res.status(400).send("Educational Institution is required");
	  }
	  if (!startdate|| startdate === "") {
		return res.status(400).send("Start Date Institution is required");
	  }
	  if (! enddate|| enddate === "") {
		return res.status(400).send("End Date Institution is required");
	  }
	  // if (! department|| department === "") {
		// return res.status(400).send("Department Institution is required");
	  // }
	  if (! status|| status === "") {
		return res.status(400).send("Status Institution is required");
	  }
    // if (!req.file) {
    //   return res.status(201).send("image is required");
    // }
    // console.log(req.file);
   
    const oldEmail = await internsModel.findOne({ email: email });
    if (oldEmail) {
      return res.status(400).send("Email is already taken");
    }
    const oldPhone = await internsModel.findOne({ phone });
    if (oldPhone) {
      return res.status(400).send("Phone is already taken");
    }

    const emailPattern = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (!emailPattern || emailPattern.length <= 0 || emailPattern.indexOf(" ") >= 0) {
      return res.status(400).send("Invalid email");
    }
    const phonePattern = phone.match(/^\d{7,15}$/);
    if (!phonePattern || phonePattern.length <= 0 || phonePattern.indexOf(" ") >= 0) {
      return res.status(400).send("Invalid phone number");
    }

    // const encryptPassword = await bcrypt.hash(password, salt_round);
    // // console.log(req.file);

    const data = await internsModel.create({
      username: username,
      email: email,
      phone: phone,
	    gender:gender,
	    dateofbirth:dateofbirth,
      address:address,
	   educationalinstitution:educationalinstitution,
	     startdate:startdate,
	   enddate:enddate,
	    // department:department,
	     status:status,
      
      
    
    });

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;
