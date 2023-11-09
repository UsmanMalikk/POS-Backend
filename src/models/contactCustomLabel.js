const mongoose = require('mongoose');

const contactCustomLabelSchema = new mongoose.Schema({
    customLable1: {type: String},
    customLable2: {type: String},
    customLable3: {type: String},
    customLable4: {type: String},
    customLable5: {type: String},
    customLable6: {type: String},
    customLable7: {type: String},
    customLable8: {type: String},
    customLable9: {type: String},
    customLable10: {type: String},
  });
  
  const ContactCustomLabel = mongoose.model('ContactCustomLabel', contactCustomLabelSchema);
  module.exports = ContactCustomLabel;