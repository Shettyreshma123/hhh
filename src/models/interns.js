const { default: mongoose } = require("mongoose");
// const { schema } = require("./User");
const { Router } = require("express");

const interns = mongoose.Schema({
	
	username: {
		type:String,
		required:true,
	},
	email:{
		type:String,
		required:true,
		unique:true,
	},
	phone:{
		type:String,
		required:true,
		unique:true,
	},
	gender:{
		type:String,
		required:true,
	},
	dateofbirth:{
		type:String,
		required:true,
	},
	address: {
		type:String,
		required:true,
	},
	educationalinstitution: {
		type:String,
		required:true,
	},
	startdate:{
		type:String,
		required:true,
	},
	enddate:{
		type:String,
		required:true,
	},
	status:{
		type:String,
		required:true,
	},
	
	
});
	module.exports=mongoose.model("interns", interns);
