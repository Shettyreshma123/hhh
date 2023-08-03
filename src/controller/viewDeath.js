const express = require("express");
const router = express.Router();
const death = require("../models/deathreport");
const authenticate = require("../middleware/authentication");
// const constants=require("../config/constants");


router.get("/",authenticate, async (req, res) => {
  try {
    let data = await death.find();
    data = data.map((item) => {
      return {
        id:item.id,
        username: item.username,
		chiefcomplaint:item.chiefcomplaint,
        date: item.date,
     
        
      };
    });

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;


