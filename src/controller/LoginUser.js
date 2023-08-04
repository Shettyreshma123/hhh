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
			return res.status(200).send({access_token:token,email:user.email});
		}else{
			return res.status(201).send("email and password not match");
		}
		


	} catch (error) {
		return res.status(500).send(error);
	}
});
module.exports=router;