const express = require("express");
const router = express.Router();
const userModel = require("../models/User");
const docModel = require("../models/login");
const authenticate = require("../middleware/authentication");
// const {upload}=require("../middleware/uploads");


router.put("/:id", async (req, res) => {
	try {
		
	  const {username,email,gender,phone,age,chiefcomplaint,timeofregistration,address,doctorId } = req.body;
	  const id=req.params.id;
	  if (!username || username == "") {
		return res.status(400).send("Name is required");
	  }
	  if (!email || email == "") {
		return res.status(201).send("Email is required");
	  }
	  if (!gender || gender == "") {
		return res.status(201).send("Gender is required");
	  }
	  if (!phone || phone == "") {
		return res.status(201).send("phone is required");
	  }
	  if (!age || age == "") {
		return res.status(201).send("Age is required");
	  }
	 
	 
	  if (!chiefcomplaint || chiefcomplaint == "") {
		return res.status(201).send("Chiefcomplaint is required");
	  }
	  if (!timeofregistration || timeofregistration == "") {
		return res.status(201).send("Timeofregistration is required");
	  }
	  if (!address || address == "") {
		return res.status(201).send("address is required");
	  }
	  
	//   const oldEmail = await userModel.findOne({ email: email });
	//   if (oldEmail) {
	// 	return res.status(202).send(" Email is already exist");
	//   }
	//   const oldPhone = await userModel.findOne({ phone });
	//   if (oldPhone) {
	// 	return res.status(202).send(" Phone is already exist");
	//   }
	//   const emailpattern = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    // if (
    //   !emailpattern ||
    //   emailpattern.length <= 0 ||
    //   emailpattern.indexOf(" ") >= 0
    // ) {
    //   return res.status(203).send("email is invalid");
    // }
	// const phonePattern = phone.match(/^\+?[1-9][0-9]{7,14}$/);
    // if (
    //   !phonePattern ||
    //   phonePattern.length <= 0 ||
    //   phonePattern.indexOf(" ") >= 0
    // ) {
    //   return res.status(202).send("Phone Number is Invalid!!");
    // }
	// if (!req.file) {
	// 	return res.status(201).send("image is required");
	//   }

	const doctor = await docModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }

    const updatedData = {
		id: id,
		username: username,
		email: email,
		gender:gender,
		phone: phone,
		age:age,
		
		chiefcomplaint:chiefcomplaint,
		timeofregistration:timeofregistration,
		
		address: address,
      doctor: doctorId,
      doctorName: doctor.username,
	 
    };

    await userModel.findByIdAndUpdate(id, updatedData);
    const data = await userModel.findById(id);

	  const responseData={
		id: id,
		username: username,
		email: email,
		gender:gender,
		phone: phone,
		age:age,
		
		chiefcomplaint:chiefcomplaint,
		timeofregistration:timeofregistration,
		
		address: address,
		
      	doctorId:doctor.id,
      	doctorName: doctor.username,
	  };

	//   if(req.file){
	// 	updateData.image=req.file.originalname
	//   }

	//   await userModel.findByIdAndUpdate(id,updateData);
	// return  res.status(200).send("updated successfully")
	return  res.status(200).send(responseData)
	}catch (error) {
		return res.status(500).send(error.stack);
	}
});
module.exports=router;