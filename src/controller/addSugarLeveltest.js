const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const userModel = require("../models/Patient"); // Replace with your model

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const {
      username,
      bloodgroup,
      collecteddate,
      fastingBloodSugar,
      postPrandialBloodSugar,
      randomBloodSugar,
      hba1c,
      oralGlucoseToleranceTest,
      fructosamine,
      cPeptideTest,
      insulinLevel,
      urineKetones,
      // Add other fields you want to update here
    } = req.body;

    const updatedData = {
      username: username,
      bloodgroup: bloodgroup,
      collecteddate: collecteddate,
      fastingBloodSugar: fastingBloodSugar,
      postPrandialBloodSugar: postPrandialBloodSugar,
      randomBloodSugar: randomBloodSugar,
      hba1c: hba1c,
      oralGlucoseToleranceTest: oralGlucoseToleranceTest,
      fructosamine: fructosamine,
      cPeptideTest: cPeptideTest,
      insulinLevel: insulinLevel,
      urineKetones: urineKetones,
      // Add other fields you want to update here
    };

    await userModel.findByIdAndUpdate(id, updatedData);

    const doc = new PDFDocument();
    doc.pipe(res);

    // Page border
    doc.rect(0, 0, doc.page.width, doc.page.height).stroke();

    // Title
    doc.font("Helvetica-Bold").fontSize(16).text(`Sugar Level Test Report`, { align: "center" });
    doc.moveDown(1.5);
    // Patient Information
    doc.font("Helvetica").fontSize(12);
    doc.text(`Patient Name: ${username}`);
    doc.text(`Blood Group: ${bloodgroup}`);
   
    const collectedDateText = `Collected Date: ${collecteddate}`;
    const collectedDateTextWidth = doc.widthOfString(collectedDateText);
    const collectedDateX = doc.page.width - collectedDateTextWidth - 40;
    const collectedDateY = doc.y -  35; // Adjust the Y position for spacing
    doc.text(collectedDateText, collectedDateX, collectedDateY);

    // Add more patient information fields here
    doc.moveDown(1.5);

    // Blood Test Results section
const titleText = "Sugar Level Test Results:";
const titleWidth = doc.widthOfString(titleText);
const titleX = (doc.page.width - titleWidth) / 2;
doc.font("Helvetica-Bold").fontSize(14).text(titleText, titleX, doc.y).moveDown(1.5);

    // Define table headers
    const tableHeaders = ["Test", "Result"];
    const tableData = [
      ["FastingBloodSugar", fastingBloodSugar],
      ["PostPrandialBloodSugar", postPrandialBloodSugar],
      ["RandomBloodSugar", randomBloodSugar],
      ["Hba1c", hba1c],
      ["OralGlucoseToleranceTest", oralGlucoseToleranceTest],
      ["Fructosamine", fructosamine],
      ["CPeptideTest", cPeptideTest],
      ["InsulinLevel", insulinLevel],
      ["UrineKetones", urineKetones],
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