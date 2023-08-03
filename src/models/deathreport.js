// const { default: mongoose } = require("mongoose");
// const { schema } = require("./login");
// const { Router } = require("express");

const mongoose = require("mongoose");
const death = mongoose.Schema({
// const acc = mongoose.Schema({
	
	username: {
		type:String,
		required:true,
	},
		
	chiefcomplaint:{
		type:String,
		required:true,
	},
	date: {
		type:String,
		required:true,
	},
	
});
	// module.exports=mongoose.model("acc", acc);
	module.exports = mongoose.model("death", death);