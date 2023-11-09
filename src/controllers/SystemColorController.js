const SystemColor = require('../models/SystemColor');

exports.updateSystemColor = async (req, res) => {
  const { themeColor } = req.body;

  try {
    const updatedColor = await SystemColor.findOneAndUpdate({}, { themeColor }, { new: true, upsert: true });

    res.status(200).json({ message: 'System color updated successfully', systemColor: updatedColor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getSystemColor = async (req, res) => {
    try {
      // In this case, we're assuming there's only one document in the collection.
      // If not, you might need to specify a unique identifier for the single document.
      const systemColor = await SystemColor.findOne();
  
      if (!systemColor) {
        return res.status(404).json({ message: 'System color not found' });
      }
  
      res.status(200).json( systemColor );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };