// const { default: mongoose } = require("mongoose");
// const { schema } = require("./login");
// const { Router } = require("express");

const mongoose = require("mongoose");
const userModel = mongoose.Schema({
// const acc = mongoose.Schema({
	firstname:{
		type:String,
	},
	lastname:{
		type:String,
	},
	
	username: {
		type: String,
		
	  },
	  email: {
		type: String,
		unique: true,
	  },
	  phone: {
		type: String,
		
	  },
	  gender: {
		type: String,
		
	  },
	  age: {
		type: String,
	  },
	  chiefcomplaint: {
		type: String,
	  },
	  bloodgroup: {
		type: String,
	  },
	  timeofregistration: {
		type: String,
	  },
	  date:{
		type:String,
	},
	time:{
		type:String,
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
	  },

	  doctor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Doctor",
	  },
	  doctorName:{
		type:String,
	  },
	  password:{
		type:String,
		
	},

	  patientId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Patient",
	  },
	  status:{
		type:String,
	},

	  loginDate: {
		type: Date,
		default: null,
	  },
	});
	// module.exports=mongoose.model("acc", acc);
	module.exports = mongoose.model("user", userModel);



