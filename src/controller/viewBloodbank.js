const express = require("express");
const router = express.Router();
const bloodModel = require("../models/blood");
const dispatchModel = require("../models/disblood");
const bloodbankModel = require("../models/bloodbank");
const authenticate = require("../middleware/authentication");

router.get("/", authenticate, async (req, res) => {
  try {
    // Aggregate blood donations by blood group
    const bloodDonations = await bloodModel.aggregate([
      {
        $group: {
          _id: "$bloodgroup",
          totalDonationBags: { $sum: "$noofbags" },
        },
      },
    ]);

    // Aggregate blood dispatches by blood group
    const bloodDispatches = await dispatchModel.aggregate([
      {
        $group: {
          _id: "$bloodgroup",
          totalDispatchBags: { $sum: "$noofbags" },
        },
      },
    ]);

    // Create a dictionary to store the number of bags available
    const bloodBanks = {};

    // Populate the dictionary with blood donations
    bloodDonations.forEach((donation) => {
      const bloodgroup = donation._id;
      const totalDonationBags = donation.totalDonationBags;

      bloodBanks[bloodgroup] = totalDonationBags;
    });

    // Subtract the dispatches from the available bags
    bloodDispatches.forEach((dispatch) => {
      const bloodgroup = dispatch._id;
      const totalDispatchBags = dispatch.totalDispatchBags;

      if (bloodBanks[bloodgroup]) {
        bloodBanks[bloodgroup] -= totalDispatchBags;
      } else {
        bloodBanks[bloodgroup] = 0;
      }
    });

    // Update the blood bank collection
    const bloodBankData = Object.entries(bloodBanks).map(([bloodgroup, totalBags]) => ({
      bloodgroup,
      noofbags: totalBags,
    }));

    await bloodbankModel.deleteMany({});
    await bloodbankModel.insertMany(bloodBankData);

    const updatedBloodBanks = await bloodbankModel.find({});

    return res.status(200).json(updatedBloodBanks);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;
