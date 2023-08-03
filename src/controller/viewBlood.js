const express = require("express");
const router = express.Router();
const blood = require("../models/blood");
const authenticate = require("../middleware/authentication");
// const constants=require("../config/constants");


router.get("/",authenticate, async (req, res) => {
  try {
    let data = await blood.find();
    data = data.map((item) => {
      return {
        id:item.id,
        username: item.username,
        email: item.email,
        gender: item.gender,
        age:item.age,
		address:item.address,
		phone: item.phone,
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


