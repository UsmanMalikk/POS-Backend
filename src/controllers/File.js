const File = require('../models/File');

const uploadFile = async (req, res) => {
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    try {
      console.log('File received:', req.file); // Check the file details received
      const file = new File({ content: req.file.buffer });
      await file.save();
      console.log('File saved successfully');
      res.status(201).json({ message: 'File uploaded successfully', file });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
  };
  
module.exports = { uploadFile };
