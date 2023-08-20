const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const path = require("path");
const userModel = require("../models/Patient"); // Replace with your model

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const patient = await userModel.findById(id);
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
const titleText1 = "Urine Test Report";
const titleWidth1 = doc.widthOfString(titleText1);
const titleX1 = (doc.page.width - titleWidth1) / 2; // Calculate the centered X position
doc.font("Helvetica-Bold").fontSize(15).text(titleText1, titleX1, doc.y);
doc.moveDown(1);

    // Patient Information
    doc.moveDown(0.5); // Add some spacing
    doc.font("Helvetica").fontSize(12);
    doc.text(`Patient Name: ${patient.username}`, 50, doc.y);
    doc.text(`Blood Group: ${patient.bloodgroup}`, 50, doc.y);
   
    const collectedDateText = `Collected Date: ${patient.collecteddate}`;
    const collectedDateTextWidth = doc.widthOfString(collectedDateText);
    const collectedDateX = doc.page.width - collectedDateTextWidth - 80;
    const collectedDateY = doc.y - 30; // No need to adjust Y position
    doc.text(collectedDateText, collectedDateX, collectedDateY);

    // Add more patient information fields here

    // Blood Test Results section
    doc.moveDown(1); // Add spacing
    const titleText = "Urine Test Results:";
    const titleWidth = doc.widthOfString(titleText);
    const titleX = (doc.page.width - titleWidth) / 2;
    doc.font("Helvetica-Bold").fontSize(14).text(titleText, titleX, doc.y).moveDown(1);

  

    const tableHeaders = ["Test", "Result"];
        const tableData = [
          ["Color", patient.color],
          ["Appearance", patient.appearance],
          ["PHLevel", patient.pHLevel],
          ["SpecificGravity", patient.specificGravity],
          ["Protein", patient.protein],
          ["Glucose", patient.glucose],
          ["Ketones", patient.ketones],
          ["Bilirubin", patient.bilirubin],
          ["Blood", patient.blood],
          ["LeukocyteEsterase", patient.leukocyteEsterase],
          ["Nitrite", patient.nitrite],
          ["MicroscopicExamination", patient.microscopicExamination],
        ];
        console.log("Appearance Value:", patient.appearance);
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
        
            // End the document and send it as response
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename="blood_test_report.pdf"`);
            doc.pipe(res);
            doc.end();
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred while generating the PDF" });
          }
        });
        
        module.exports = router;