// models/SystemColor.js

const mongoose = require('mongoose');

const systemColorSchema = new mongoose.Schema({
  themeColor: {
    type: String,
    // required: true,
  },
});

const SystemColor = mongoose.model('SystemColor', systemColorSchema);

module.exports = SystemColor;
