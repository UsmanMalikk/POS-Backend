const ContactCustomLabel = require('../models/contactCustomLabel');
exports.createContactCustomLabel = async (req, res) => {
    const customContactLabels = req.body; // Access the customContactLabels array directly

    try {
        const createdContactCustomLabels = [];

        for (let i = 0; i < customContactLabels.length; i++) {
            const customContactLabel = customContactLabels[i].customLable; // Access the customLabel within each object
            if (customContactLabel !== "") {
                const customLabel = new ContactCustomLabel({
                    customFieldNumber: i + 1, // Assuming customFieldNumber is 1-based
                    customLable: customContactLabel,
                });

                // Save the customLabel
                const savedCustomLabel = await customLabel.save();

                createdContactCustomLabels.push(savedCustomLabel);
            }
        }

        res.status(201).json({ createdContactCustomLabels });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


// exports.updateContactCustomLabel = async (req, res) => {
//     const { id } = req.params; // Extract the ID from the request parameters
//     const { customLabel } = req.body;

//     try {
//         if (!id || !customLabel) {
//             return res.status(400).json({ message: 'Both ID and customLabel are required' });
//         }

//         // Find the ContactCustomLabel by ID
//         const existingContactCustomLabel = await ContactCustomLabel.findById(id);

//         if (!existingContactCustomLabel) {
//             return res.status(404).json({ message: 'ContactCustomLabel not found' });
//         }

//         // Update the customLabel
//         existingContactCustomLabel.customLable = customLabel;

//         // Save the updated ContactCustomLabel
//         const updatedContactCustomLabel = await existingContactCustomLabel.save();

//         res.status(200).json(updatedContactCustomLabel);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
exports.getAllContactCustomLabels = async (req, res) => {
    try {
        const contactCustomLabels = await ContactCustomLabel.find();
        res.status(200).json(contactCustomLabels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
// exports.getContactCustomLabelById = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const contactCustomLabel = await ContactCustomLabel.findById(id);

//         if (!contactCustomLabel) {
//             return res.status(404).json({ message: 'ContactCustomLabel not found' });
//         }

//         res.status(200).json(contactCustomLabel);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
