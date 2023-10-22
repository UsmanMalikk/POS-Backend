const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  accountNumber: { type: String, required: true },
  accountType: { type: mongoose.Schema.Types.ObjectId, ref: 'AccountType' },
  openingBalance: { type: Number, required: true },
  accountDetails: [
    {
      label: { type: String },
      value: { type: String }
    }
  ],
  note: { type: String },
  isClosed: {type: Boolean, default: false}
});

const AddAccount = mongoose.model('AddAccount', AccountSchema);

module.exports = AddAccount;
