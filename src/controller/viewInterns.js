const express = require("express");
const router = express.Router();
const internsModal = require("../models/interns");
const authenticate = require("../middleware/authentication");
// const constants=require("../config/constants");


router.get("/",authenticate, async (req, res) => {
  try {
    let data = await internsModal.find();
    data = data.map((item) => {
      return {
       
	  id:item.id,
      username:item.username,
      email: item.email,
      phone: item.phone,
	  gender:item.gender,
	  dateofbirth:item.dateofbirth,
      address:item.address,
	  educationalinstitution:item.educationalinstitution,
	  startdate:item.startdate,
	  enddate:item.enddate,
	  // department:item.department,
	  status:item.status,
      // image:constants.imagePath+item.image,
        
      };
    });

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;


