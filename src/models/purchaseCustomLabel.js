const mongoose = require('mongoose');

const purchaseCustomLabelSchema = new mongoose.Schema({
    customFieldNumber: Number,
    customLable: { type: String },
    isRequired: { type: Boolean, default: false }
});

const PurchaseCustomLabel = mongoose.model('PurchaseCustomLabel', purchaseCustomLabelSchema);
module.exports = PurchaseCustomLabel;