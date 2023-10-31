const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  currentInvoiceNumber: { type: Number, default: 0 }, // Initialize with the starting value
  invoiceNumberFormat: { type: String, default: '####' },
  name:{ type: String },
  numberingTypes: { type: String},
  namePrefix: { type: String },
  // startFrom:  { type: Number, default: 1 }, // New field for specifying the starting number
  numberOfDigits:  { type: Number, default: 4 },
  isDefault: {
    type: Boolean,
    default: false,
  }, 

});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
