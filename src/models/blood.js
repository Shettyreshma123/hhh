// const { default: mongoose } = require("mongoose");
// const { schema } = require("./login");
// const { Router } = require("express");

const mongoose = require("mongoose");
const blood = mongoose.Schema({
// const acc = mongoose.Schema({
	
	username: {
		type:String,
		required:true,
	},
	email:{
		type:String,
		// required:true,
		unique:true,
	},
	phone:{
		type:String,
		required:true,
	},
	gender:{
		type:String,
		required:true,
		// unique:true,
	},
	age:{
		type:String,
		required:true,
	},
	
	bloodgroup:{
		type:String,
		required:true,
	},
	noofbags: {
		type:Number,
		required:true,
	},

	date: {
		type:String,
		required:true,
	},
	address: {
		type:String,
		required:true,
	},
});
	// module.exports=mongoose.model("acc", acc);
	module.exports = mongoose.model("blood", blood);