const express = require("express");
const router = express.Router();
const dispatchModel = require("../models/disblood");
const bloodbankModel = require("../models/bloodbank");
const authenticate = require("../middleware/authentication");

router.post("/", authenticate,  async (req, res) => {
  try {
    const { username,bloodgroup, noofbags,date,} = req.body;

    // if (req.user && req.user.role !== "Admin") {
    //   return res.send("Unauthorized user");
    // }


    if (!username || username === "") {
      return res.status(400).send("Username is required");
    }
    if (!bloodgroup || bloodgroup === "") {
      return res.status(400).send("Bloodgroup is required");
    }
    if (!noofbags || noofbags === "") {
      return res.status(400).send("Noofbags is required");
    }
    if (!date || date === "") {
      return res.status(400).send("Date is required");
    }
   
    

   

    // const encryptPassword = await bcrypt.hash(password, salt_round);

    const bloodBank = await bloodbankModel.findOne({ bloodgroup: bloodgroup });
    if (!bloodBank || bloodBank.noofbags < noofbags) {
      return res.status(400).send("Insufficient blood bags available.");
    }

    // Create a new dispatch
    const newDispatch = await dispatchModel.create({
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

module.exports = router;
