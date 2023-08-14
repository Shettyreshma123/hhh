const { default: mongoose } = require("mongoose");
// const { schema } = require("./User");
const { Router } = require("express");

const Patients = mongoose.Schema({
	firstLoginDate: {
		type: Date,
		default: null,
	  },
	firstname:{
		type:String,
	},
	lastname:{
		type:String,
	},
	username: {
		type: String,
		
	  },
	email:{
		type:String,
		// unique:true,
	},
	
	gender:{
		type:String,
	},
	age: {
		type: String,
	  },
	phone:{
		type:String,
		// unique:true,
	},
	dateofbirth:{
		type:String,
	},
	chiefcomplaint: {
		type: String,
	  },
	bloodgroup:{
		type:String,
	},
	sugarlevel: {
		type: String,
	  },
	bloodpressure: {
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
	address: {
		type:String,
	},
	
	message: {
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
	
});
	module.exports=mongoose.model("patient", Patients);
