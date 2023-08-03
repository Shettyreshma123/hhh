// const { default: mongoose } = require("mongoose");
// const { schema } = require("./login");
// const { Router } = require("express");

const mongoose = require("mongoose");
const userModel = mongoose.Schema({
// const acc = mongoose.Schema({
	username: {
		type: String,
		required: true,
	  },
	  email: {
		type: String,
		unique: true,
	  },
	  phone: {
		type: String,
		required: true,
		unique: true,
	  },
	  gender: {
		type: String,
		required: true,
	  },
	  age: {
		type: String,
		required: true,
	  },
	  chiefcomplaint: {
		type: String,
		required: true,
	  },
	  bloodgroup: {
		type: String,
	  },
	  timeofregistration: {
		type: String,
		required: true,
	  },
	  sugarlevel: {
		type: String,
	  },
	  bloodpressure: {
		type: String,
	  },
	  message: {
		type: String,
	  },
	  
	  address: {
		type: String,
		required: true,
	  },

	  doctor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Doctor",
		required: true,
		
	  },
	  doctorName:{
		type:String,
	  },

	  patientId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Patient",
	  },
	});
	// module.exports=mongoose.model("acc", acc);
	module.exports = mongoose.model("user", userModel);



