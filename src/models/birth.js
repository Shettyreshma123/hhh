// const { default: mongoose } = require("mongoose");
// const { schema } = require("./login");
// const { Router } = require("express");

const mongoose = require("mongoose");
const birth = mongoose.Schema({
// const acc = mongoose.Schema({
	
	username: {
		type:String,
		required:true,
	},
	birthtype:{
		type:String,
		required:true,
		// unique:true,
	},
	doctor:{
		type:String,
		required:true,
		unique:true,
	},
	date: {
		type:String,
		required:true,
	},
	time: {
		type:String,
		required:true,
	},
});
	// module.exports=mongoose.model("acc", acc);
	module.exports = mongoose.model("birth", birth);