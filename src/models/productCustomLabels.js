const mongoose = require('mongoose');

const productCustomLabelSchema = new mongoose.Schema({
    customFieldNumber:Number,
    customLable: {type: String},
    customLableType:{type: String},
    dropdownOptions: [{type: String}]
   
  });
  
  const ProductCustomLabel = mongoose.model('ProductCustomLabel', productCustomLabelSchema);
  module.exports = ProductCustomLabel;