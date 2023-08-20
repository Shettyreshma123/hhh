// const express = require('express');
// const router = express.Router();
// const Invoice = require('../models/invoice');
// // const Patient = require('../models/Patient');
// // const Service = require('../models/Service');
// const authenticate = require('../middleware/authentication');

// // Generate billing for a patient
// router.post("/:id", authenticate, async (req, res) => {
//   try {
//     const { patientId, services } = req.body; // Assuming you pass patientId and an array of services with their ids and quantities

//     // Retrieve patient information
//     const patient = await Patient.findById(patientId);

//     // Calculate total amount based on services and their quantities
//     let totalAmount = 0;
//     for (const service of services) {
//       const serviceInfo = await Service.findById(service.service);
//       totalAmount += serviceInfo.price * service.quantity;
//     }

//     // Create the invoice
//     const invoice = new Invoice({
//       patient: patientId,
//       services: services,
//       totalAmount: totalAmount,
//     });

//     // Save the invoice
//     await invoice.save();

//     return res.status(200).json({ message: 'Billing generated successfully', invoice });
//   } catch (error) {
//     return res.status(500).send(error.stack);
//   }
// });

module.exports = router;
