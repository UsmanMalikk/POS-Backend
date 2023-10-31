
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customerGroupSchema = new Schema({
    customerGroupName: {
        type: String,
        required: true
    },
    calculationType: {
        type: String,
        enum: ['Percentage', 'Selling Price Group'],
        required: true
    },
    calculationPercentage: {
        type: Number,
        
    },
    sellingPriceGroup: {
        type: mongoose.Schema.Types.ObjectId, ref: 'SellingPriceGroup', default: null
    },
    // ... (other fields)
});

const CustomerGroup = mongoose.model("CustomerGroup", customerGroupSchema);
module.exports = CustomerGroup;
