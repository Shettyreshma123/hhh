// const express = require("express");
// const router = express.Router();
// const userModel = require("../models/Patient");
// const authenticate = require("../middleware/authentication");

// router.get("/:id", authenticate, async (req, res) => {
//   try {
//     // Fetch patients who have been updated using the PUT method for billing
//     const data = await userModel.find({ billNumber: { $exists: true } });

//     // Map the data to the desired format
//     const formattedData = data.map((item) => {
//       return {
//         id: item.id,
//         billNumber: item.billNumber,
//         username: item.username,
//         email: item.email,
//         phone: item.phone,
//         gender: item.gender,
//         address: item.address,
//         date: item.date,
//         time: item.time,
//         consultation: item.consultation,
//         laboratory: item.laboratory,
//         // Add other fields as needed
//       };
//     });

//     return res.status(200).send(formattedData);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("An error occurred while fetching patient data");
//   }
// });

// module.exports = route;






const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const path = require("path");
const userModel = require("../models/Patient"); // Replace with your model

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const patient = await userModel.findById(id);
    
    // ...
const consultationFee = parseFloat(patient.consultationFee); // Convert to a number
const laboratoryFee = parseFloat(patient.laboratoryFee);     // Convert to a number
const taxRate = 0.1; // 10%
const consultationTax = consultationFee * taxRate;
const laboratoryTax = laboratoryFee * taxRate;
// ...

    const doc = new PDFDocument();

    // Page border
    const borderWidth = 10; // Set the width of the border
    const borderGap = 20;   // Set the gap between the border and content
    doc.rect(borderGap, borderGap, doc.page.width - 2 * borderGap, doc.page.height - 2 * borderGap).stroke();

    // Logo
    const logoPath = path.resolve("public/profile/logo.jpg");
    doc.image(logoPath, 50, 20, { width: 100 });

    // Hospital details
    doc.font("Helvetica-Bold").fontSize(12).text("Hospital Name: MEDIFACE", 200, 50);
    doc.font("Helvetica").fontSize(12).text("Email: infomediface@gmail.com", 200, 70);
    doc.font("Helvetica").fontSize(12).text("Phone: 123-456-7890", 200, 90);
    doc.font("Helvetica").fontSize(12).text("Address: 123 Hospital Street, Bangalore, India", 200, 110);

    doc.moveDown(2.5); 
    // Blood Test Report title
const titleText1 = "Patient Details and Invoice";
const titleWidth1 = doc.widthOfString(titleText1);
const titleX1 = (doc.page.width - titleWidth1) / 2; // Calculate the centered X position
doc.font("Helvetica-Bold").fontSize(15).text(titleText1, titleX1, doc.y);
doc.moveDown(1);

    // Patient Information
    doc.moveDown(0.5); // Add some spacing
    doc.font("Helvetica").fontSize(12);
    doc.text(`Patient Id: ${patient.id}`, 50, doc.y);
    doc.text(`patient Name: ${patient.username}`, 50, doc.y);
    doc.text(`Email: ${patient.email}`, 50, doc.y);
    doc.text(`Phone: ${patient.phone}`, 50, doc.y);
    doc.text(`Gender: ${patient.gender}`, 50, doc.y);
    doc.text(`Address: ${patient.address}`, 50, doc.y);


    // doc.moveDown(0.01); 
    

    
    const collectedDateText = `Date: ${patient.date}`;
    const collectedDateTextWidth = doc.widthOfString(collectedDateText);
    const collectedDateX = doc.page.width - collectedDateTextWidth - 80;
    const collectedDateY = doc.y - 50; // No need to adjust Y position
    doc.text(collectedDateText, collectedDateX, collectedDateY);

    const collectedTimeText = `Time: ${patient.time}`;
    const collectedTimeTextWidth = doc.widthOfString(collectedTimeText);
    const collectedTimeX = doc.page.width - collectedTimeTextWidth - 110;
    const collectedTimeY = doc.y - 40; // No need to adjust Y position
    doc.text(collectedTimeText, collectedTimeX, collectedTimeY);
    
   

    

    // Blood Test Results section
    doc.moveDown(6); // Add spacing
    const titleText = " Invoice";
    const titleWidth = doc.widthOfString(titleText);
    const titleX = (doc.page.width - titleWidth) / 2;
    doc.font("Helvetica-Bold").fontSize(14).text(titleText, titleX, doc.y).moveDown(1);

    const tableHeaders = ["Service Name", "Amount"];
        const tableData = [
          // ["Email", patient.email],
          // ["Phone", patient.phone],
          // ["Gender", patient.gender],
          // ["Address", patient.address],
          // ["Time", patient.time],
          // ["Consultation Fee", patient.consultationFee],
          // ["Consultation Fee Tax", taxAmount],
          
          // ["Laboratory Fee", patient.laboratoryFee],
          // ["Laboratory Fee Tax", taxAmount],
          ["Consultation Fee", consultationFee.toFixed(2)],
          ["Consultation Tax (10%)", consultationTax.toFixed(2)],
          ["Laboratory Fee", laboratoryFee.toFixed(2)],
          ["Laboratory Tax (10%)", laboratoryTax.toFixed(2)],
          
        ];

        const columnWidth = doc.page.width / tableHeaders.length;
            const startX = 50; // Starting X position
            const startY = doc.y;
            const lineHeight = 30;
        
            // Draw table headers
            doc.font("Helvetica-Bold").fontSize(12);
            tableHeaders.forEach((header, columnIndex) => {
              doc.text(header, startX + columnIndex * columnWidth, startY);
            });
        
            // Draw table rows
            doc.font("Helvetica").fontSize(12);
            tableData.forEach((rowData, rowIndex) => {
              rowData.forEach((cell, columnIndex) => {
                doc.text(cell, startX + columnIndex * columnWidth, startY + (rowIndex + 1) * lineHeight);
              });
            });

            const totalPayment = consultationFee + consultationTax + laboratoryFee + laboratoryTax;
            doc.moveDown(1);
            doc.font("Helvetica-Bold").fontSize(14).text(`Total Payment: $${totalPayment.toFixed(2)}`, titleX, doc.y).moveDown(1);

        
            // End the document and send it as response
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename="blood_test_report.pdf"`);
            doc.pipe(res);
            doc.end();
          } catch (error) {
            console.error(error);
           return res.status(500).json(error.stack);
          }
        });
        
        module.exports = router;

// const express = require("express");
// const router = express.Router();
// const PDFDocument = require("pdfkit");
// const path = require("path");
// const userModel = require("../models/Patient"); // Replace with your model

// router.get("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const patient = await userModel.findById(id);

//     // if (!patient) {
//     //   return res.status(404).json({ error: "Patient not found" });
//     // }

//     const doc = new PDFDocument();

//     // Page border
//     const borderWidth = 10;
//     const borderGap = 20;
//     doc.rect(borderGap, borderGap, doc.page.width - 2 * borderGap, doc.page.height - 2 * borderGap).stroke();

//     // Logo
//     const logoPath = path.resolve("public/profile/logo.jpg");
//     doc.image(logoPath, 50, 20, { width: 100 });

//     // Hospital details
//     doc.font("Helvetica-Bold").fontSize(12).text("Hospital Name: MEDIFACE", 200, 50);
//     doc.font("Helvetica").fontSize(12).text("Email: infomediface@gmail.com", 200, 70);
//     doc.font("Helvetica").fontSize(12).text("Phone: 123-456-7890", 200, 90);
//     doc.font("Helvetica").fontSize(12).text("Address: 123 Hospital Street, Bangalore, India", 200, 110);

//     doc.moveDown(2.5); 

//     // Title
//     const titleText = "Patient Details and Invoice";
//     const titleWidth = doc.widthOfString(titleText);
//     const titleX = (doc.page.width - titleWidth) / 2;
//     doc.font("Helvetica-Bold").fontSize(15).text(titleText, titleX, doc.y);
//     doc.moveDown(1);

//     // Patient Information
//     doc.moveDown(0.5); // Add some spacing
//     doc.font("Helvetica").fontSize(12);
//     doc.text(`Patient ID: ${patient.id}`, 50, doc.y);
//     doc.text(`Patient Name: ${patient.username}`, 50, doc.y);
//     doc.text(`Email: ${patient.email}`, 50, doc.y);
//     doc.text(`Phone: ${patient.phone}`, 50, doc.y);
//     doc.text(`Gender: ${patient.gender}`, 50, doc.y);
//     doc.text(`Address: ${patient.address}`, 50, doc.y);
//     doc.text(`Date: ${patient.date}`, 50, doc.y);
//     doc.text(`Time: ${patient.time}`, 50, doc.y);
//     doc.text(`Consultation Fee: ${patient.consultationFee}`, 50, doc.y);
//     doc.text(`Laboratory Fee: ${patient.laboratoryFee}`, 50, doc.y);

//     // End the document and send it as response
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", `attachment; filename="billing_invoice.pdf"`);
//     doc.pipe(res);
//     doc.end();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send(error.stack);
//     // res.status(500).json({ error: "An error occurred while generating the PDF" });
//   }
// });

// module.exports = router;


