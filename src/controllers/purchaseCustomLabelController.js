
const PurchaseCustomLabel = require('../models/purchaseCustomLabel');

exports.createMultiplePurchaseCustomLabels = async (req, res) => {
    const customLabels = req.body;
    try {
        const createdPurchaseCustomLabels = [];

        for (let i = 0; i < customLabels.length; i++) {
            const customLabel = customLabels[i];

            if (customLabel.customLable !== "") {
                const purchaseCustomLabel = new PurchaseCustomLabel({
                    customFieldNumber: customLabel.customFieldNumber,
                    customLable: customLabel.customLable,
                    isRequired: customLabel.isRequired,
                });

                // Save the purchaseCustomLabel
                const savedPurchaseCustomLabel = await purchaseCustomLabel.save();

                createdPurchaseCustomLabels.push(savedPurchaseCustomLabel);
            }
        }

        res.status(201).json({ createdPurchaseCustomLabels });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getPurchaseCustomLabels = async (req, res) => {
    try {
        const purchaseCustomLabels = await PurchaseCustomLabel.find();
        res.status(200).json(purchaseCustomLabels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};