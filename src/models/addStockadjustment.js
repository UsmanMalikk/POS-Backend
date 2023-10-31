const mongoose = require('mongoose');


const stockadjustmentSchema = new mongoose.Schema({

    businesLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessLocation', default: null },
    referenceNumber: { type: Number},

    date: { type: Date, default: Date.now },
    adjustmentType: { type: String, required: true },
  

    inputData: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 0 },
            unitPrice: { type: Number, default: 0.00 },
            discount: { type: Number, default: 0.00 },
            subtotal: { type: Number }
        }],


    totalamountRecovered:{ type: Number, default: 0 },
    reason:{ type: String },
    //Total amount from frontend

});

const StockAdjustment = mongoose.model('StockAdjustment', stockadjustmentSchema);

module.exports = StockAdjustment;
