const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseDueSchema = new Schema({
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    referenceNo: { type: String, unique: true ,default:0},
    // purchaseStatus: {
    //     type: String,
    //     required: true
    // },
    purchaseDate: Date,
    businessLocation: {
        type: Schema.Types.ObjectId,
        ref: 'BusinessLocation'
    },
    payTerm: String,
    status:{type: String},
    purchaseOrder: Number,
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
    discountType: {
        type: String,
    },
    totalPurchaseAmount:Number,
    discountAmount: Number,
    additionalNotes: String,
    shippingDetails: { type: String },

    shippingCharges: {
        type: Number,
        default: 0,
    },
    // advanceBalnce: {
    //     type: Number,

    // },
    amount: { type: Number },
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: { type: String },
    paymentAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'AddAccount', default:null },
    paymentNote: { type: String },


    cardNumber:{ type: Number },
    holderName:{ type: String },
    transactionNumber:{ type: Number },
    cardType:{ type: String },
    month:{ type: Number },
    year:{ type: Number },
    securityCode:{ type: Number },

    customLable1: { type: String },
    customLable2: { type: String },
    customLable3: { type: String },
    customLable4: { type: String },

});


const PurchaseesDue = mongoose.model("PurchasesDue", purchaseDueSchema);
module.exports = PurchaseesDue;
