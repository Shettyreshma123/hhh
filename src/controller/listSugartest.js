const express = require("express");
const router = express.Router();
const userModel = require("../models/Patient");
const authenticate = require("../middleware/authentication");

router.get("/", authenticate, async (req, res) => {
  try {
    const testtype = "SugarLevelTest"; // You can set this dynamically based on user input

    // Convert the testtype value to lowercase
    const lowercaseTestType = testtype.toLowerCase();

    // Define accepted test type variations
    const acceptedTestTypes = ["sugarleveltest", "sugarLeveltest", "Sugarleveltest","SugarLevelTest"];

    // Validate testtype
    if (!acceptedTestTypes.includes(lowercaseTestType)) {
      return res.status(400).send("Invalid testType");
    }

    // Fetch patient data based on testType
    let data = await userModel.find({ testtype: { $regex: new RegExp(testtype, "i") } });

    // Map the filtered data to the desired format
    data = data.map((item) => {
      return {
        id: item.id,
        username: item.username,
        email: item.email,
        age: item.age,
        chiefcomplaint: item.chiefcomplaint,
        bloodgroup: item.bloodgroup,
        testtype: item.testtype,
      };
    });
    
    return res.status(200).send(data);
  } catch (error) {
    console.log(data);
    return res.status(500).send(error.stack);
  }
});

module.exports = router;