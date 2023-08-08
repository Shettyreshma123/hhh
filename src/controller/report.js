// const express = require('express');
// const router = express.Router();
// const PDFDocument = require('pdfkit');
// const Patient = require('../models/Patient'); // Assuming you have a model for the patients in MongoDB

// router.get('/:id', async (req, res) => {
//   try {
//     const patientId = req.params.id;
//     const patient = await Patient.findById(patientId); // Fetch the patient data from MongoDB

//     if (!patient) {
//       return res.status(404).json({ error: 'Patient not found' });
//     }

//     const doc = new PDFDocument();

//     // Customize the PDF layout and content based on the patient data
//     doc.text(`Report for Patient ID: ${patient._id}`);
//     doc.text(`Patient Name: ${patient.name}`);
//     doc.text(`Email: ${patient.email}`);
//     doc.text(`Gender: ${patient.gender}`);
//     doc.text(`Phone: ${patient.phone}`);
//     doc.text(`Age: ${patient.age}`);
//     doc.text(`Chief Complaint: ${patient.chiefcomplaint}`);
//     doc.text(`Time of Registration: ${patient.timeofregistration}`);
//     doc.text(`Address: ${patient.address}`);
//     doc.text(`Doctor Name: ${patient.doctorname}`);
//     // Add other relevant patient details

//     // Save the PDF to a file or send it as a response to the client
//     res.setHeader('Content-Type', 'application/pdf');
//     doc.pipe(res);
//     doc.end();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error.stack);
//   }
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const Patient = require('../models/Patient'); // Assuming you have a model for the patients in MongoDB

// Endpoint to search for patients by name and get their reports
router.get('/:username', async (req, res) => {
  try {
    const patientName = req.params.name;
    const patients = await Patient.find({ name: patientName }); // Find patients with the given name

    if (patients.length === 0) {
      return res.status(404).json({ error: 'No patients found with the given name' });
    }

    // Customize the PDF layout and content based on the patient data
    const doc = new PDFDocument();
    patients.forEach((patient) => {
      doc.text(`Report for Patient ID: ${patient._id}`);
      doc.text(`Patient Name: ${patient.username}`);
      doc.text(`Email: ${patient.email}`);
      doc.text(`Gender: ${patient.gender}`);
      doc.text(`Phone: ${patient.phone}`);
      doc.text(`Age: ${patient.age}`);
      doc.text(`BloodGroup: ${patient.bloodgroup}`);
      doc.text(`Chief Complaint: ${patient.chiefcomplaint}`);
      doc.text(`Sugar Level: ${patient.sugarlevel}`);
      doc.text(`Blood Pressure: ${patient.BloodPressure}`);
    //   doc.text(`Time of Registration: ${patient.timeofregistration}`);
      doc.text(`Address: ${patient.address}`);
      doc.text(`Doctor Name: ${patient.doctorName}`);
      doc.text(`Medicine: ${patient.medicine}`);
      doc.moveDown(); // Move to the next patient's report in the same PDF
    });

    // Save the PDF to a file or send it as a response to the client
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the patient reports' });
  }
});

module.exports = router;
