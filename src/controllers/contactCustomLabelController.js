const ContactCustomLabel = require('../models/contactCustomLabel');
exports.createContactCustomLabel = async (req, res) => {
    const customContactLabels = req.body;

  try {
    const createdContactCustomLabels = {};

    for (let i = 1; i <= 10; i++) {
      const customLable = customContactLabels[`customLable${i}`];

      createdContactCustomLabels[`customLable${i}`] = customLable || '';
    }

    const contactCustomLabel = new ContactCustomLabel(createdContactCustomLabels);

    // Save the contactCustomLabel document
    const savedContactCustomLabel = await contactCustomLabel.save();

    res.status(201).json(savedContactCustomLabel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


exports.updateContactCustomLabel = async (req, res) => {
    const updatedData = req.body;

    try {
        let contactCustomLabels = await ContactCustomLabel.findOne({});
        if (contactCustomLabels === null) {
            contactCustomLabels = new ContactCustomLabel();
        }
        for (let i = 1; i <= 10; i++) {
            if (updatedData[`customLable${i}`] !== undefined) {
                contactCustomLabels[`customLable${i}`] = updatedData[`customLable${i}`];
            }
        }

        await contactCustomLabels.save();

        res.status(200).json({ message: 'ContactCustom Labels updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getAllContactCustomLabels = async (req, res) => {
    try {
        const contactCustomLabels = await ContactCustomLabel.findOne({}); // Assuming there is only one document

        // Initialize an object to store the response data
        const response = {};

        for (let i = 1; i <= 10; i++) {
            response[`customLable${i}`] = contactCustomLabels[`customLable${i}`];
        }

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
