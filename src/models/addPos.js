const mongoose = require('mongoose');

const posSchema = new mongoose.Schema({
    businesLocation: { type: String },
    sellingPrice: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    // typeofService: { type: String },
    // customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    customer: { type:String },

    //billing add
    //shipping add
    payTerm: { type: String },
    salesDate: { type: Date, default: Date.now },
    status: { type: String },
    // invoiceSchema: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },//from invoice schema
    invoiceNumber: { type: String },

    byPos: { type: Boolean, default: true },

    // orderStatus:{type: String, default: "Received"},  was for kitchen tab
    //Attach doc
    //select table
    //select service staff

    inputData: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
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


    orderTaxType: { type: String },
    orderTax: { type: Number },
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
    paymentAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'AddAccount' },
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
