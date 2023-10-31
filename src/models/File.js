const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  // other fields...
  content: Buffer, // Field to store file content as binary data
  // other fields...
});

const File = mongoose.model('File', fileSchema);
module.exports = File;
