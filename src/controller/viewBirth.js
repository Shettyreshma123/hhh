const express = require("express");
const router = express.Router();
const birth = require("../models/birth");
const authenticate = require("../middleware/authentication");
// const constants=require("../config/constants");


router.get("/",authenticate, async (req, res) => {
  try {
    let data = await birth.find();
    data = data.map((item) => {
      return {
        id:item.id,
        username: item.username,
		birthtype:item.birthtype,
		doctor:item.doctor,
        date: item.date,
        time:item.time,
        
      };
    });

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;


