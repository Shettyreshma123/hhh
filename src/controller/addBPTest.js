const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const userModel = require("../models/Patient"); // Replace with your model

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
      firstname,
      bloodgroup,
      collecteddate,
      systolicPressure,
      diastolicPressure,
      meanArterialPressure,
      pulsePressure,
      // Add other fields you want to update here
    } = req.body;

    const updatedData = {
      firstname: firstname,
      bloodgroup: bloodgroup,
      collecteddate:collecteddate,
      systolicPressure: systolicPressure,
      diastolicPressure: diastolicPressure,
      meanArterialPressure: meanArterialPressure,
      pulsePressure: pulsePressure,
    };

    await userModel.findByIdAndUpdate(id, updatedData);

    const doc = new PDFDocument();
    doc.pipe(res);

    // Page border
    doc.rect(0, 0, doc.page.width, doc.page.height).stroke();

    // Title
    doc.font("Helvetica-Bold").fontSize(16).text(`Blood Pressure Test Report`, { align: "center" });
    doc.moveDown(1.5);
    // Patient Information
    doc.font("Helvetica").fontSize(12);
    doc.text(`Patient Name: ${firstname}`);
    doc.text(`Blood Group: ${bloodgroup}`);
   
    const collectedDateText = `Collected Date: ${collecteddate}`;
    const collectedDateTextWidth = doc.widthOfString(collectedDateText);
    const collectedDateX = doc.page.width - collectedDateTextWidth - 40;
    const collectedDateY = doc.y -  35; // Adjust the Y position for spacing
    doc.text(collectedDateText, collectedDateX, collectedDateY);

    // Add more patient information fields here
    doc.moveDown(1.5);

    // Blood Test Results section
const titleText = "Blood Pressure Test Results:";
const titleWidth = doc.widthOfString(titleText);
const titleX = (doc.page.width - titleWidth) / 2;
doc.font("Helvetica-Bold").fontSize(14).text(titleText, titleX, doc.y).moveDown(1.5);

    // Define table headers
    const tableHeaders = ["Test", "Result"];
    const tableData = [
      ["SystolicPressure", systolicPressure],
      ["DiastolicPressure", diastolicPressure],
      ["MeanArterialPressure", meanArterialPressure],
      ["PulsePressure", pulsePressure],
      // Add more blood test results fields here
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

    // End the document and send it as response
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while generating the PDF" });
  }
});

module.exports = router;