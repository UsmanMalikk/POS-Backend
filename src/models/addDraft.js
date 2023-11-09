const mongoose = require('mongoose');

const draftSchema = new mongoose.Schema({
    businesLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessLocation', default: null },
    sellingPrice: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
    typeofService: { type: String },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', default: null },

   
    payTerm: { type: String },
    salesDate: { type: Date, default: Date.now },
    status: { type: String, required: true },
    // invoiceSchema: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },//from invoice schema
    invoiceNumber: { type: Number },



    inputData: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
            quantity: { type: Number, default: 0 },
            unitPrice: { type: Number, default: 0.00 },
            discount: { type: Number, default: 0.00 },
            subtotal: { type: Number }
        }],

        totalSaleAmount:{ type: Number },
        byPos: { type: Boolean },


    discountType: { type: String },
    discountAmount: { type: Number },

    deliveryPersonUser: { type: mongoose.Schema.Types.ObjectId, ref: 'AddUser', default:null },
    deliveryPersonAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', default:null },

   
    sellNote: { type: String },

    shippingDetails: { type: String },
    shippingAddress: { type: String },
    shippingCharges: { type: Number, default: 0.00 },
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


});

const Draft = mongoose.model('Draft', draftSchema);

module.exports = Draft;
