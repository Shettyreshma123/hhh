// models/Invoice.js
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  services: [
    {
      service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
      quantity: Number,
    },
  ],
  totalAmount: Number,
  paid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
