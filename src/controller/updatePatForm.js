const express = require("express");
const router = express.Router();
const userModel = require("../models/Patient");
const docModel = require("../models/login");
const authenticate = require("../middleware/authentication");
// const {upload}=require("../middleware/uploads");
// const mongoose = require("mongoose");


  
  router.put("/:id", authenticate, async (req, res) => {
	try {
	  const id = req.params.id;
	  const {
		name,
		email,
		phone,
		gender,
		age,
		chiefcomplaint,
		timeofregistration,
		address,
		bloodgroup,
		sugarlevel,
		bloodpressure,
		message,
		doctorId,
		status,
	  } = req.body;
  
	  const patient = await userModel.findById(id);
	  if (!patient) {
		return res.status(404).send("Patient not found");
	  }
  
	  // Fetch previous doctor information if present
	  const previousDoctorId = patient.doctor;
	  const previousDoctorName = patient.doctorName;
  
	  // Fetch doctor information if doctorId is provided in the update
	  let updatedDoctorId = previousDoctorId;
	  let updatedDoctorName = previousDoctorName;
	  if (doctorId) {
		const doctor = await docModel.findById(doctorId);
		if (doctor) {
		  updatedDoctorId = doctor._id;
		  updatedDoctorName = doctor.username;
		}
	  }
  
	  const updatedData = {
		doctor: updatedDoctorId,
		doctorName: updatedDoctorName,
		id: id,
		name: name,
		email: email,
		phone: phone,
		gender: gender,
		age: age,
		chiefcomplaint: chiefcomplaint,
		bloodgroup: bloodgroup,
		timeofregistration: timeofregistration,
		sugarlevel: sugarlevel,
		bloodpressure: bloodpressure,
		address: address,
		message: message,
		status:status,
	  };
  
	  await userModel.findByIdAndUpdate(id, updatedData);
	  const data = await userModel.findById(id);
  
	  // ... create responseData as needed
  
	  return res.status(200).send(data);
	} catch (error) {
	  return res.status(500).send(error.stack);
	}
  });
  
  
  
  module.exports = router;