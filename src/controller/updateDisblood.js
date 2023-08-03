const express = require("express");
const router = express.Router();
const disblood = require("../models/disblood");
const bloodbank = require("../models/bloodbank");
// const bloodBank = require("../models/bloodbank");
const authenticate = require("../middleware/authentication");
// const {upload}=require("../middleware/uploads");


router.put("/:id", async (req, res) => {
	try {
		
	  const {username, bloodgroup,noofbags,date } = req.body;
	  const id=req.params.id;
	  if (!username || username == "") {
		return res.status(400).send("Name is required");
	  }
	  if (!bloodgroup || bloodgroup == "") {
		return res.status(201).send("Bloodgroup is required");
	  }
	  if (!noofbags || noofbags == "") {
		return res.status(201).send("Noofbags is required");
	  }
	  if (!date || date == "") {
		return res.status(201).send("Date is required");
	  }
	  
  
	//   const oldEmail = await userModel.findOne({ email: email });
	//   if (oldEmail) {
	// 	return res.status(202).send(" Email is already exist");
	//   }
	//   const oldPhone = await userModel.findOne({ phone });
	//   if (oldPhone) {
	// 	return res.status(202).send(" Phone is already exist");
	//   }
	 


	//   const updateData={
	// 	username: username,
	// 	bloodgroup:bloodgroup,
	// 	noofbags:noofbags,
	// 	date:date,
		
	//   };

	//   if(req.file){
	// 	updateData.image=req.file.originalname
	//   }

	const bloodBank = await bloodbank.findOne({ bloodgroup: bloodgroup });
    if (!bloodBank || bloodBank.noofbags < noofbags) {
      return res.status(400).send("Insufficient blood bags available.");
    }

    // Create a new dispatch
    const newDispatch = await disblood.create({
      username,
      bloodgroup,
      noofbags,
      date,
    });

    // Update the blood bank information
    bloodBank.noofbags -= noofbags;
    await bloodBank.save();

    return res.status(200).send(newDispatch);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports=router;