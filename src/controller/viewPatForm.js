
const express = require("express");
const router = express.Router();
const patientModel = require("../models/Patient");
const authenticate = require("../middleware/authentication");


router.get("/", authenticate, async (req, res) => {
  try {
    const enteredDate = req.query.date;

    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];

    const doctors = await patientModel.find({ role: "Doctor" });

    const patients = await patientModel.find({
      date: formattedCurrentDate, // Use formatted current date here
    });

    const data = patients.map((item) => {
      return {
        id: item.id,
        username: item.username,
        email: item.email,
        gender: item.gender,
        age: item.age,
        phone: item.phone,
        dateofbirth: formatDate(item.dateofbirth), // Format date of birth
        chiefcomplaint: item.chiefcomplaint,
        bloodgroup: item.bloodgroup,
        sugarlevel: item.sugarlevel,
        bloodpressure: item.bloodpressure,
        timeofregistration: item.timeofregistration,
        date: formatDate(item.date), // Format date
        time: item.time,
        address: item.address,
        message: item.message,
        doctorId: item.doctor ? item.doctor._id : null,
        doctorName: item.doctorName,
        status: item.status,
      };
    });

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error.stack);
  }
});

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

module.exports = router;
