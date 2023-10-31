const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    businesLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessLocation', default: null },
    sellingPrice: { type: mongoose.Schema.Types.ObjectId, ref: 'SellingPriceGroup' , default:null},
    // typeofService: { type: String },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    // customer: { type: String },

    //billing add
    //shipping add
    payTerm: { type: String },
    salesDate: { type: Date, default: Date.now },
    status: { type: String, required: true },
    // invoiceSchema: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },//from invoice schema
    invoiceNumber: { type: String, unique: true },



    // orderStatus:{type: String, default: "Received"},  was for kitchen tab
    //Attach doc
    //select table
    //select service staff

    inputData: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' , default:null},
            quantity: { type: Number, default: 0 },
            unitPrice: { type: Number, default: 0.00 },
            discount: { type: Number, default: 0.00 },
            subtotal: { type: Number }
        }],

    totalSaleAmount: { type: Number },

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
    deliveryPersonUser: { type: mongoose.Schema.Types.ObjectId, ref: 'AddUser', default:null },
    deliveryPersonAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', default:null },

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
    paymentAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'AddAccount', default:null },
    paymentNote: { type: String },

    cardNumber:{ type: Number },
    holderName:{ type: String },
    transactionNumber:{ type: Number },
    cardType:{ type: String },
    month:{ type: Number },
    year:{ type: Number },
    securityCode:{ type: Number },

});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
