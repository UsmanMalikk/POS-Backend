const Prefix = require('../models/prefixes');

// // Create a new prefix
// exports.createPrefix = async (req, res) => {
//     try {
//         const prefixData = req.body;
//         const newPrefix = await Prefix.create(prefixData);
//         res.status(201).json(newPrefix);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// Update an existing prefix (Single Entry)
exports.updatePrefix = async (req, res) => {
    const prefixData = req.body;

    try {
        // Find the single entry and update it
        const updatedPrefix = await Prefix.findOneAndUpdate({}, prefixData, { new: true });

        if (!updatedPrefix) {
            return res.status(404).json({ message: 'Prefix not found' });
        }

        res.status(200).json(updatedPrefix);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single prefix entry (Single Entry)
exports.getSinglePrefix = async (req, res) => {
    try {
        // Find the single entry
        const prefix = await Prefix.findOne();

        if (!prefix) {
            return res.status(404).json({ message: 'Prefix not found' });
        }

        res.status(200).json(prefix);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};