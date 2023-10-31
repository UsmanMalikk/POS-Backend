const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseOrderSchema = new Schema({
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    referenceNo: { type: String, unique: true },

    orderDate: Date,
    deliveryDate: Date,

    businessLocation: {
        type: Schema.Types.ObjectId,
        ref: 'BusinessLocation'
    },
    paymentTerm: String,
    inputData: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
            quantity: { type: Number, default: 0 },
            unitCostBeforeDiscount: { type: Number, default: 0 },
            discountPercent: { type: Number, default: 0 },
            unitCostBeforeTax: { type: Number },
            profitMarginPercentage: { type: Number, default: 0 },
            unitSellingPrice: { type: Number, default: 0 }



        }],


    documents: [
        {
            documentFilePath: String,
        },
    ],
    shippingAddress: String,
    shippingCharges: {
        type: Number,
        default: 0.00,
    },
    shippingStatus: {
        type: String,
        enum: ['Not Shipped', 'Shipped', 'Delivered'],
        default: 'Not Shipped',
    },
    deliveredTo: String,
    expenseName: String,
    amount: {
        type: Number,
        default: 0,
    },
});





const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);
module.exports = PurchaseOrder;
