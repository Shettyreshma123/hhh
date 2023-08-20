const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const path = require('path');
const userModel = require('../models/Patient');

router.get('/:id', async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await userModel.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const hospitalName = 'MEDIFACE'; // Replace with your actual hospital name
    const hospitalEmail = 'infomediface@gmail.com'; // Replace with your hospital email
    const hospitalPhone = '123-456-7890'; 
    const hospitalAddress = '123 Hospital Street, Bangalore, India'; 

    // Create a PDF document
    const doc = new PDFDocument();

    // Set the response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${patient.firstname}_report.pdf`);

    // Draw PDF content
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).lineWidth(1).stroke();

    const logoPath = path.resolve('public/profile/logo.jpg');

    doc.image(logoPath, 50, 20, { width: 100 });
    doc.font('Helvetica-Bold').fontSize(16).text(` ${hospitalName}`, { align: 'center' });
    doc.font('Helvetica-Bold').fontSize(12).text(`Email: ${hospitalEmail}`, 50, 150);
    doc.font('Helvetica-Bold').fontSize(12).text(`Phone: ${hospitalPhone}`, 50, 170);
    doc.font('Helvetica-Bold').fontSize(12).text(`Address: ${hospitalAddress}`, 50, 190);

    const tableTop = doc.y + 30;
    const col1X = 50;
    const col2X = 200;

    // Headers
    doc.font('Helvetica-Bold').fontSize(12).text('Field', col1X, tableTop);
    doc.font('Helvetica-Bold').fontSize(12).text('Value', col2X, tableTop);

    const rowHeight = 20;
    const rowData = [
      ['Report ID', patient._id],
      ['Patient Name', patient.firstname],
      ['Email', patient.email],
      ['Gender', patient.gender],
      ['Phone', patient.phone],
      ['Age', patient.age],
      ['Blood Group', patient.bloodgroup],
      ['Chief Complaint', patient.chiefcomplaint],
      ['Sugar Level', patient.sugarlevel],
      ['Blood Pressure', patient.bloodpressure],
      ['Address', patient.address],
      ['Doctor Name', patient.doctorName],
      ['Medicine', patient.medicine],
      // Add more fields here
    ];

    rowData.forEach((row, rowIndex) => {
      const yPos = tableTop + (rowIndex + 1) * rowHeight;
      const bgColor = rowIndex % 2 === 0 ? 'lightgray' : 'white'; // Alternating row background colors
      const borderColor = 'gray'; // Border color

      doc.rect(col1X, yPos - rowHeight, col2X + 150, rowHeight)
        .fillColor(bgColor)
        .strokeColor(borderColor)
        .lineWidth(1)
        .fillAndStroke();

      doc.fontSize(12)
        .fillColor('black')
        .text(row[0], col1X + 5, yPos - rowHeight + 5)
        .text(row[1], col2X + 5, yPos - rowHeight + 5);
    });

    // Pipe the PDF to the response and end the document
    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating the patient report' });
  }
});

module.exports = router;