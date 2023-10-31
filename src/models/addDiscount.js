const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' ,default: null}],
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand',default: null },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category',default: null },
//   unit: { type: String},
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessLocation', default: null },
  priority: { type: Number },
  discountType: {type: String},
  discountAmount: {type: Number},
  startsAt: { type: Date},
  endsAt: { type: Date},
  sellingPriceGrp: { type: mongoose.Schema.Types.ObjectId, ref: 'SellingPriceGroup' ,default: null},

  isApplyinCustomerGrps: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },

});

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;
