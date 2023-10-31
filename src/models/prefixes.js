const mongoose = require('mongoose');

const prefixSchema = new mongoose.Schema({
    purchase: {
        type: String,
    },
    purchaseReturn: {
        type: String,
    },
    purchaseOrder: {
        type: String,
    },
    stockTransfer: {
        type: String,
    },
    stockAdjustment: {
        type: String,
    },
    expenses: {
        type: String,
    },
    contacts: {
        type: String,
    },
    purchasePayment: {
        type: String,
    },
    sellPayment: {
        type: String,
    },
    expensePayment: {
        type: String,
    },
    businessLocation: {
        type: String,
    },
    draft: {
        type: String,
    }
});

const Prefix = mongoose.model('Prefix', prefixSchema);

module.exports = Prefix;
