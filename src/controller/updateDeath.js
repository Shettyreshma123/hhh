const express = require("express");
const router = express.Router();
const death = require("../models/deathreport");
const authenticate = require("../middleware/authentication");
// const {upload}=require("../middleware/uploads");


router.put("/:id", async (req, res) => {
	try {
		
	  const {username,chiefcomplaint,date } = req.body;
	  const id=req.params.id;
	  
	  if (!username || username == "") {
		return res.status(201).send("Username is required");
	  }
	 
	  if (!chiefcomplaint || chiefcomplaint == "") {
		return res.status(201).send("Chiefcomplaint is required");
	  }
	  if (!date || date == "") {
		return res.status(201).send("Date is required");
	  }
	
	  
	  const updateData={
		
		username:username,
		chiefcomplaint:chiefcomplaint,
		date:date,
	
	  };

	//   if(req.file){
	// 	updateData.image=req.file.originalname
	//   }

	  await death.findByIdAndUpdate(id,updateData);
	  res.status(200).send("updated successfully")
	}catch (error) {
		return res.status(500).send(error.stack);
	}
});
module.exports=router;