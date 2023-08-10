const { default: mongoose } = require("mongoose");
// const { schema } = require("./User");
const { Router } = require("express");

const Patients = mongoose.Schema({
	firstname:{
		type:String,
	},
	lastname:{
		type:String,
	},
	
	email:{
		type:String,
		unique:true,
	},
	phone:{
		type:String,
		unique:true,
	},
	gender:{
		type:String,
	},
	
	bloodgroup:{
		type:String,
	},
	date:{
		type:String,
	},
	time:{
		type:String,
	},
	address: {
		type:String,
	},
	timeofregistration: {
		type: String,
	  },
	  sugarlevel: {
		type: String,
	  },
	  bloodpressure: {
		type: String,
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
	
});
	module.exports=mongoose.model("patients", Patients);
