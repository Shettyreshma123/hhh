const express = require("express");
const router = express.Router();
const birth = require("../models/birth");
const authenticate = require("../middleware/authentication");
// const {upload}=require("../middleware/uploads");


router.put("/:id", async (req, res) => {
	try {
		
	  const {username,birthtype,doctor,date,time } = req.body;
	  const id=req.params.id;
	  
	  if (!username || username == "") {
		return res.status(201).send("Username is required");
	  }
	  if (!birthtype || birthtype == "") {
		return res.status(201).send("Birthtype is required");
	  }
	  if (!doctor || doctor == "") {
		return res.status(201).send("Doctor is required");
	  }
	  if (!date || date == "") {
		return res.status(201).send("Date is required");
	  }
	  if (!time || time == "") {
		return res.status(201).send("time is required");
	  }
	
	  
	  const updateData={
		
		username:username,
		birthtype:birthtype,
		doctor:doctor,
		date:date,
		time:time,
		
	  };

	//   if(req.file){
	// 	updateData.image=req.file.originalname
	//   }

	  await birth.findByIdAndUpdate(id,updateData);
	  res.status(200).send("updated successfully")
	}catch (error) {
		return res.status(500).send(error.stack);
	}
});
module.exports=router;