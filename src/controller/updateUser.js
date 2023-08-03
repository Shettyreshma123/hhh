const express = require("express");
const router = express.Router();
const userModel = require("../models/login");
const authenticate = require("../middleware/authentication");
const {upload}=require("../middleware/uploads");


router.put("/:id",authenticate,upload.single("image"), async (req, res) => {
	try {
		
	  const { username, email, phone,address } = req.body;
	  const id=req.params.id;
	  if (!username || username == "") {
		return res.status(201).send("Name is required");
	  }
	  if (!email || email == "") {
		return res.status(201).send("email is required");
	  }
	  if (!phone || phone == "") {
		return res.status(201).send("phone is required");
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
	  const emailpattern = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (
      !emailpattern ||
      emailpattern.length <= 0 ||
      emailpattern.indexOf(" ") >= 0
    ) {
      return res.status(203).send("email is invalid");
    }
    const phonepattern = phone.match(/^\d{10}$/);
    if (
      !phonepattern ||
      phonepattern.length <= 0 ||
      phonepattern.indexOf(" ") >= 0
    ) {
      return res.status(203).send("phone is invalid");
    } 
	// if (!req.file) {
	// 	return res.status(201).send("image is required");
	//   }


	  const updateData={
		username:username,
		email:email,
		phone:phone,
		address:address
	  };

	  if(req.file){
		updateData.image=req.file.originalname
	  }

	  await userModel.findByIdAndUpdate(id,updateData);
	  res.status(200).send("updated successfully")
	}catch (error) {
		return res.status(500).send(error.stack);
	}
});
module.exports=router;