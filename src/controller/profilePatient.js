const express = require("express");
const router = express.Router();
const userModel = require("../models/Patient");

router.get("/:id", async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await userModel.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const patientDetails = {
      id: patient._id,
      firstname: patient.firstname,
      lastname: patient.lastname,
      email: patient.email,
      phone: patient.phone,
      gender: patient.gender,
      age: patient.age,
      chiefcomplaint: patient.chiefcomplaint,
      bloodgroup: patient.bloodgroup,
      timeofregistration: patient.timeofregistration,
      sugarlevel: patient.sugarlevel,
      bloodpressure: patient.bloodpressure,
      address: patient.address,
    };

    return res.status(200).json({ patient: patientDetails });
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

module.exports = router;
