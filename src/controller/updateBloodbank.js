const express = require("express");
const router = express.Router();
const bloodbank = require("../models/bloodbank");
const authenticate = require("../middleware/authentication");
// const {upload}=require("../middleware/uploads");


router.put("/:id", async (req, res) => {
	try {
		
	  const { bloodgroup,noofbags } = req.body;
	  const id=req.params.id;
	  
	  if (!bloodgroup || bloodgroup == "") {
		return res.status(201).send("Bloodgroup is required");
	  }
	  if (!noofbags || noofbags == "") {
		return res.status(201).send("Noofbags is required");
	  }
	
	  
	  const updateData={
		
		bloodgroup:bloodgroup,
		noofbags:noofbags,
		
	  };

	//   if(req.file){
	// 	updateData.image=req.file.originalname
	//   }

	  await bloodbank.findByIdAndUpdate(id,updateData);
	  res.status(200).send("updated successfully")
	}catch (error) {
		return res.status(500).send(error.stack);
	}
});
module.exports=router;