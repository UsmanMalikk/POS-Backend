const mongoose = require('mongoose');

const contactCustomLabelSchema = new mongoose.Schema({
    customFieldNumber:Number,
    customLable: {type: String},
   
  });
  
  const ContactCustomLabel = mongoose.model('ContactCustomLabel', contactCustomLabelSchema);
  module.exports = ContactCustomLabel;