const mongoose = require('mongoose');

const fundDepositSchema = new mongoose.Schema({
  depositTo: { type: mongoose.Schema.Types.ObjectId, ref: 'AddAccount' , default: null},
  depositFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'AddAccount' , default: null},
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  note: { type: String }, 
  
  // Add any additional fields as needed
});

const FundDeposit = mongoose.model('FundDeposit', fundDepositSchema);

module.exports = FundDeposit;
