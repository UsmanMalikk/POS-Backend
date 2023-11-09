const mongoose = require('mongoose');

const purchaseCustomLabelSchema = new mongoose.Schema({
    
    customLable1: { type: String },
    isRequired1: { type: Boolean, default: false },
    customLable2: { type: String },
    isRequired2: { type: Boolean, default: false },
    customLable3: { type: String },
    isRequired3: { type: Boolean, default: false },
    customLable4: { type: String },
    isRequired4: { type: Boolean, default: false },
});

const PurchaseCustomLabel = mongoose.model('PurchaseCustomLabel', purchaseCustomLabelSchema);
module.exports = PurchaseCustomLabel;