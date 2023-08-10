const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  hospitalname:{
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  chiefcomplaint: {
    type: String,
    required: true,
  },
  timeofregistration: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  doctorname: {
    type: String,
    required: true,
  },
  // Add other fields as needed for your report
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
