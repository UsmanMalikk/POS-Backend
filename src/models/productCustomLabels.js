const mongoose = require('mongoose');

const productCustomLabelSchema = new mongoose.Schema({
    customLable1: {type: String},
    customLableType1: {type: String},
    dropdownOptions1: [{type:String}],
    customLable2: {type: String},
    customLableType2: {type: String},
    dropdownOptions2: [{type:String}],
    customLable3: {type: String},
    customLableType3: {type: String},
    dropdownOptions3: [{type:String}],
    customLable4: {type: String},
    customLableType4: {type: String},
    dropdownOptions4: [{type:String}],
    customLable5: {type: String},
    customLableType5: {type: String},
    dropdownOptions5: [{type:String}],
    customLable6: {type: String},
    customLableType6: {type: String},
    dropdownOptions6: [{type:String}],
    customLable7: {type: String},
    customLableType7: {type: String},
    dropdownOptions7: [{type:String}],
    customLable8: {type: String},
    customLableType8: {type: String},
    dropdownOptions8: [{type:String}],
    customLable9: {type: String},
    customLableType9: {type: String},
    dropdownOptions9: [{type:String}],
    customLable10: {type: String},
    customLableType10: {type: String},
    dropdownOptions10: [{type:String}],

});

const ProductCustomLabel = mongoose.model('ProductCustomLabel', productCustomLabelSchema);
module.exports = ProductCustomLabel;