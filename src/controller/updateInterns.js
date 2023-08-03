const express = require("express");
const router = express.Router();
const internsModel = require("../models/interns");
const authenticate = require("../middleware/authentication");
// const { upload } = require("../middleware/uploads");

router.put("/:id", authenticate, async (req, res) => {
  try {
    const { username, email, phone, gender, dateofbirth, address, educationalinstitution, startdate, enddate, status } = req.body;
    const id = req.params.id;

    // Check for missing fields
    if (!username || username == "") {
      return res.status(400).send("Name is required");
    }
    if (!email || email == "") {
      return res.status(400).send("Email is required");
    }
    if (!phone || phone == "") {
      return res.status(400).send("Phone is required");
    }
    if (!gender || gender == "") {
      return res.status(400).send("Gender is required");
    }
    if (!dateofbirth || dateofbirth == "") {
      return res.status(400).send("Date of birth is required");
    }
    if (!address || address == "") {
      return res.status(400).send("Address is required");
    }
    if (!educationalinstitution || educationalinstitution == "") {
      return res.status(400).send("Educational Institution is required");
    }
    if (!startdate || startdate == "") {
      return res.status(400).send("Start Date is required");
    }
    if (!enddate || enddate == "") {
      return res.status(400).send("End Date Institution is required");
    }
    // if (!department || department == "") {
    //   return res.status(400).send("Department Institution is required");
    // }
    if (!status || status == "") {
      return res.status(400).send("Status Institution is required");
    }

    // Validate email format
    const emailpattern = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (!emailpattern || emailpattern.length <= 0 || emailpattern.indexOf(" ") >= 0) {
      return res.status(400).send("Invalid email");
    }

    // Validate phone format
    const phonepattern = phone.match(/^\d{10}$/);
    if (!phonepattern || phonepattern.length <= 0 || phonepattern.indexOf(" ") >= 0) {
      return res.status(400).send("Invalid phone number");
    }

    // Check if file was uploaded
    // if (!req.file) {
    //   return res.status(400).send("Image is required");
    // }

    // Prepare update data
    const updateData = {
      username: username,
      email: email,
      phone: phone,
      gender: gender,
      dateofbirth: dateofbirth,
      address: address,
      educationalinstitution: educationalinstitution,
      startdate: startdate,
      enddate: enddate,
      // department: department,
      status: status,
    //   image: req.file.originalname,
    };
	// if(req.file){
	// 	updateData.image=req.file.originalname
	//   }

    // Update the record in the database
    await internsModel.findByIdAndUpdate(id, updateData);
    res.status(200).send("Updated successfully");
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;
