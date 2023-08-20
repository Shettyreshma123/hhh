const express = require("express");
const router = express.Router();
const userModel = require("../models/User");
const bcrypt=require("bcrypt");
// const constants=require("../config/constants");
const jwt=require("jsonwebtoken");
require("dotenv").config();


router.post("/",async(req,res)=>{
	try {
		const{email,password}=req.body;
		const user=await userModel.findOne({email});

		if(user && (await bcrypt.compare(password,user.password))){
			const token=jwt.sign(
				{user_id:user._id,email:user.email},
				process.env.SECRET_KEY,
				// {expiresIn:"24h"}
			);
			return res.status(200).send({access_token:token,firstname:user.firstname,lastname:user.lastname,email:user.email,phone:user.phone,gender:user.gender,bloodgroup:user.bloodgroup});
		}else{
			return res.status(201).send("email and password not match");
		}
	} catch (error) {
		return res.status(500).send(error);
	}
});
module.exports=router;

// const express = require("express");
// const router = express.Router();
// const userModel = require("../models/User");
// const bcrypt=require("bcrypt");
// const jwt=require("jsonwebtoken");
// require("dotenv").config();

// router.post("/",async(req,res)=>{
// 	try {
// 		const{email,password}=req.body;
// 		const user=await userModel.findOne({email});
// 		// if (!req.user.firstLoginDate) {
// 		// 	// Update the firstLoginDate field if it's not set
// 		// 	req.user.firstLoginDate = new Date();
// 		// 	await req.user.save();
// 		//   }

//         if (!user) {
//             return res.status(201).send("The email you provided is not registered. Please sign up to create an account.");
//           }
          
// 		if(user && (await bcrypt.compare(password,user.password))){
// 			if (!user.firstLoginDate) {
// 				// Update the firstLoginDate field if it's not set
// 				user.firstLoginDate = new Date();
// 				await user.save();
// 			  }
// 			const token=jwt.sign(
// 				{user_id:user._id,email:user.email},
// 				process.env.SECRET_KEY,
// 			);
// 			return res.status(200).send({access_token:token,email:user.email});
// 		}else{
// 			return res.status(201).send("email and password not match");
// 		}
// 	} catch (error) {
// 		return res.status(500).send(error);
// 	}
// });
// module.exports=router;