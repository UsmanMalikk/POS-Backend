const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String },
  allowDecimal: { type: String },
  multipleOfOtherUnits: { type: Boolean, default: false },
  timesBaseUnit: { type: Number },
  baseUnit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', default: null }

});

const Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;
