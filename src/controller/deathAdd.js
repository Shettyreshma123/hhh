const express = require("express");
const router = express.Router();
// const bcrypt = require("bcrypt");
const death = require("../models/deathreport");
const salt_round = 10;
// const { upload } = require("../middleware/uploads");
const authenticate = require("../middleware/authentication");

router.post("/", authenticate,  async (req, res) => {
  try {
    const { username,chiefcomplaint,date,} = req.body;

    // if (req.user && req.user.role !== "Admin") {
    //   return res.send("Unauthorized user");
    // }


    if (!username || username === "") {
      return res.status(400).send("Username is required");
    }
    if (!chiefcomplaint || chiefcomplaint === "") {
      return res.status(400).send("Chiefcomplaint is required");
    }
  
    if (!date || date === "") {
      return res.status(400).send("Date is required");
    }
    
   
    

    
    const data = await death.create({
      username: username,
	  chiefcomplaint:chiefcomplaint,
      date:date,
	
    });

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
