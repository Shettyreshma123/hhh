const express = require("express");
const router = express.Router();
const disblood = require("../models/disblood");
const authenticate = require("../middleware/authentication");


router.delete("/:id",authenticate, async (req, res) => {
	try {
		const id=req.params.id;
	  	await disblood.findByIdAndRemove(id);
	  	res.status(200).send("delete successfully")
	}catch (error) {
		return res.status(500).send(error);
	}
	});
	module.exports=router;