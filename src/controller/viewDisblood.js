const express = require("express");
const router = express.Router();
const disblood = require("../models/disblood");
const authenticate = require("../middleware/authentication");
// const constants=require("../config/constants");


router.get("/",authenticate, async (req, res) => {
  try {
    let data = await disblood.find();
    data = data.map((item) => {
      return {
        id:item.id,
        username: item.username,
        bloodgroup: item.bloodgroup,
        noofbags:item. noofbags,
        date: item.date,
        
        
      };
    });

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;


