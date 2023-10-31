const mongoose = require('mongoose');

const posSchema = new mongoose.Schema({
    businesLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessLocation', default: null },
    sellingPrice: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },

    payTerm: { type: String },
    salesDate: { type: Date, default: Date.now },
    status: { type: String },
    // invoiceSchema: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },//from invoice schema
    invoiceNumber: { type: String },

    byPos: { type: Boolean, default: true },


    inputData: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
            productName: {type: String},
            quantity: { type: Number, default: 0 },
            unitPrice: { type: Number, default: 0.00 },
            discountType: { type: String },
            discountAmount: { type: Number, default: 0.00 },
            description: { type: String },
            subtotal: { type: Number }
        }],

        totalSaleAmount:{ type: Number },

    // total:unitPrice*quantity,
    // percent: (discount/100)*total,
    // subTotal: total-percent,

    discountType: { type: String },
    discountAmount: { type: Number },

    //Redeemed
    deliveryPersonUser: { type: mongoose.Schema.Types.ObjectId, ref: 'AddUser', default:null },
    deliveryPersonAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', default:null },

    
    sellNote: { type: String },

    shippingDetails: { type: String },
    shippingAddress: { type: String },
    shippingCharges: { type: Number },
    shippingStatus: { type: String },
    deliveredTo: { type: String },


    additionalExpenseName: { type: String },
    additionalExpenseAmount: { type: Number },
    additionalExpenseName1: { type: String },
    additionalExpenseAmount1: { type: Number },
    additionalExpenseName2: { type: String },
    additionalExpenseAmount2: { type: Number },
    additionalExpenseName3: { type: String },
    additionalExpenseAmount3: { type: Number },
    //shippingDocs


    amount: { type: Number },
    paymentDate: { type: Date, default: Date.now },
    paymentMethod: { type: String },
    paymentAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'AddAccount', default: null },
    paymentNote: { type: String },



    cardNumber:{ type: Number },
    holderName:{ type: String },
    transactionNumber:{ type: Number },
    cardType:{ type: String },
    month:{ type: Number },
    year:{ type: Number },
    securityCode:{ type: Number },


    //For suspended sales
    suspendNote: { type: String },


});

const Pos = mongoose.model('Pos', posSchema);

module.exports = Pos;
