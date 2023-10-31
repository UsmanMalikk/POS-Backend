
const mongoose = require('mongoose');

const businessLocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  locationId: Number,
  landmark: String,
  city: { type: String, required: true },
  zipCode: { type: Number },
  state: { type: String },
  country: { type: String, required: true },
  mobileNo: { type: Number },
  altContactNo: { type: Number },
  email: { type: String },
  website: { type: String },
  // invoiceScheme: { type: mongoose.Schema.Types.ObjectId, ref: 'InvoiceScheme', default: null },
  defaultSellingPriceGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'SellingPriceGroup', default: null },
  // featuredProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
  isActive: {type: Boolean, default: true},
  paymentOption: [{
    paymentMethod: { type: String },
    is_enabled: { type: Boolean, default: true },
    acount: { type: mongoose.Schema.Types.ObjectId, ref: 'AddAccount', default: null },


  }]
})

const BusinessLocation = mongoose.model('BusinessLocation', businessLocationSchema);

module.exports = BusinessLocation;
