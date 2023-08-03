const { default: mongoose } = require("mongoose");
// const { schema } = require("./User");
const { Router } = require("express");

const accounts = mongoose.Schema({
	
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
	address: {
		type:String,
		required:true,
	},
	image:{
		data: Buffer,
		type: String,
		required: true
	  },
	
	password:{
		type:String,
		required:true,
	},
	
	role: {
		type:String,
		required:true,
	},
	
	
});
	module.exports=mongoose.model("accounts", accounts);
