const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  sku: { type: Number, unique: true },
  // barcodeType: { type: String },
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', default: null },
  //   unit: { type: String},
  businessLocation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BusinessLocation', default: null }],
  // manageStock: { type: Boolean, default: true },
  productDescription: { type: String },
  productImage: { type: String },
  productType: { type: String },
  // Other fields related to product attributes



  //Opening Stock
  openingStock: [{
    quantityRemaining: { type: Number, default: 0 },
    unitCostBfrTx: { type: Number, default: 0 },
    lotNumber: { type: Number },
    date: { type: Date, default: Date.now },
    note: { type: String }
  }],

  totalQuantity: { type: Number },
  //opening stock end
  unitPurchasePrice: { type: Number, default: 0.00 },
  unitSellingPrice: { type: Number, default: 0.00 },

  combo: [{ type: String }],
  // combo:[{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],

  variationType: [{
    variationTempleateID: { type: mongoose.Schema.Types.ObjectId, ref: 'Variation', default: null, },
    variation: [{
      subSKU: { type: Number },
      value: { type: Number },
    }]
  }],

  dfltSellingPrice: { type: Number },
  margin: { type: Number },
  netTotal: { type: Number },

  grpPrices: [{
    spg: { type: mongoose.Schema.Types.ObjectId, ref: 'SellingPriceGroup', default: null },
    amount: { type: Number },
    type: { type: String }
  }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', default: null },
  subCategory: { type: String },
  // warranty: { type: mongoose.Schema.Types.ObjectId, ref: 'Warranty' }
  customLable1: { type: String },
  customLable2: { type: String },
  customLable3: { type: String },
  customLable4: { type: String },
  customLable5: { type: String },
  customLable6: { type: String },
  customLable7: { type: String },
  customLable8: { type: String },
  customLable9: { type: String },
  customLable10: { type: String },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
