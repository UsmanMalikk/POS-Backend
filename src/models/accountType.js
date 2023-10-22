const mongoose = require('mongoose');

const accountTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parentAccountType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccountType',
  },
});

const AccountType = mongoose.model('AccountType', accountTypeSchema);

module.exports = AccountType;
