// const express = require("express");
// const router = express.Router();
// const PDFDocument = require("pdfkit");
// const userModel = require("../models/Patient"); // Replace with your model

// router.put("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const {
//     //   patientId,
//       username,
//       email,
//       phone,
//       gender,
//       address,
//       date,
//       time,
//       consultationFee,
//       laboratoryFee,
//       // Include other billing fields here
//     } = req.body;

//     const updatedData = {
//       patientId: patientId,
//       username: username,
//       email: email,
//       phone: phone,
//       gender: gender,
//       address: address,
//       date: date,
//       time: time,
//       consultationFee: consultationFee,
// 	  laboratoryFee: laboratoryFee,
//       // Add other fields you want to update here
//     };

//     await userModel.findByIdAndUpdate(id, updatedData);

//     const doc = new PDFDocument();
//     doc.pipe(res);

//     // Page border
//     doc.rect(0, 0, doc.page.width, doc.page.height).stroke();

//     // Title
//     doc.font("Helvetica-Bold").fontSize(16).text(`Blood Test Report`, { align: "center" });
//     doc.moveDown(1.5);
//     // Patient Information
//     doc.font("Helvetica").fontSize(12);
//     doc.text(`Patient Name: ${username}`);
//     doc.text(`Email: ${email}`);
//     doc.text(`Phone: ${phone}`);
//     doc.text(`Gender: ${gender}`);
//     doc.text(`Address: ${address}`);
//     doc.text(`Date: ${date}`);
//     doc.text(`Time: ${time}`);
//     doc.text(`Consultation: ${consultation}`);
//     doc.text(`Laboratory: ${laboratory}`);

//     // End the document and send it as response
//     doc.end();
//   } catch (error) {
//     console.error(error);
//   return  res.status(500).send(error.stack);
//     res.status(500).json({ error: "An error occurred while generating the PDF" });
//   }
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const PDFDocument = require("pdfkit");
// const userModel = require("../models/Patient"); // Replace with your model


// // let billCounter = 1;


// router.put("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const {
//       patientId,
//       username,
//       email,
//       phone,
//       gender,
//       address,
//       date,
//       time,
//       consultation,
//       laboratory,
//       // Add other fields you want to update here
//     } = req.body;


// 	const billNumber = generateBillNumber();


//     const updatedData = {
//       patientId: patientId,
// 	  // billNumber: billNumber,
//       username: username,
//       email: email,
//       phone: phone,
//       gender: gender,
//       address: address,
//       date: date,
//       time: time,
//       consultation: consultation,
//       laboratory: laboratory,
//       // Add other fields you want to update here
//     };

//     await userModel.findByIdAndUpdate(id, updatedData);

//     const doc = new PDFDocument();
//     doc.pipe(res);

//     // Page border
//     doc.rect(0, 0, doc.page.width, doc.page.height).stroke();

//     // Title
//     doc.font("Helvetica-Bold").fontSize(16).text(`Bill generation`, { align: "center" });
//     doc.moveDown(1.5);

//     // Patient Information
//     doc.font("Helvetica").fontSize(12);
// 	doc.text(`Patient ID: ${id}`);
// 	// doc.text(`Bill Number: ${billNumber}`);
//     doc.text(`Patient Name: ${username}`);
//     doc.text(`Email: ${email}`);
//     doc.text(`Phone: ${phone}`);
//     doc.text(`Gender: ${gender}`);
//     doc.text(`Address: ${address}`);
//     doc.text(`Date: ${date}`);
//     doc.text(`Time: ${time}`);
//     doc.text(`Consultation: ${consultation}`);
//     doc.text(`Laboratory: ${laboratory}`);
//     // Add other patient information fields here

//     // End the document and send it as response
//     doc.end();
//   } catch (error) {
//     console.error(error);
//     console.error(error.stack); // Print the stack trace for debugging
//     res.status(500).json({ error: "An error occurred while generating the PDF" });
//   }
// });
// // function generateBillNumber() {
// // 	const today = new Date();
// // 	const year = today.getFullYear();
// // 	const month = (today.getMonth() + 1).toString().padStart(2, "0");
// // 	const day = today.getDate().toString().padStart(2, "0");
// // 	const counter = billCounter.toString().padStart(4, "0");
  
// // 	const billNumber = `${year}${month}${day}-${counter}`;
// // 	billCounter++;
  
// // 	return billNumber;
// //   }
  

// module.exports = router;


const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const userModel = require("../models/Patient"); // Replace with your model

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
      username,
      email,
      phone,
      gender,
      address,
      date,
      time,
      consultationFee,
      laboratoryFee,
      // Include other billing fields here
    } = req.body;

    // Update the patient details in the database
    const updatedData = {
      username: username,
      email: email,
      phone: phone,
      gender: gender,
      address: address,
      date: date,
      time: time,
      consultationFee: consultationFee,
      laboratoryFee: laboratoryFee,
      // Add other fields you want to update here
    };

    await userModel.findByIdAndUpdate(id, updatedData);

    // Generate PDF with the updated patient details
    const doc = new PDFDocument();
    doc.pipe(res);

    // Page border
    doc.rect(0, 0, doc.page.width, doc.page.height).stroke();

    // Title
    doc.font("Helvetica-Bold").fontSize(16).text(`Patient Details and Invoice`, { align: "center" });
    doc.moveDown(1.5);
    
    // Patient Information
    doc.font("Helvetica").fontSize(12);
    doc.text(`Patient Name: ${username}`);
    doc.text(`Email: ${email}`);
    doc.text(`Phone: ${phone}`);
    doc.text(`Gender: ${gender}`);
    doc.text(`Address: ${address}`);
    doc.text(`Date: ${date}`);
    doc.text(`Time: ${time}`);
    doc.text(`ConsultationFee: ${consultationFee}`);
    doc.text(`LaboratoryFee: ${laboratoryFee}`);
    // Include other patient information fields here

    // End the document and send it as response
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while generating the PDF" });
  }
});

module.exports = router;
