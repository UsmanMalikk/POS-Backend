
const PurchaseCustomLabel = require('../models/purchaseCustomLabel');

exports.createMultiplePurchaseCustomLabels = async (req, res) => {
    const customLabel = req.body;
    // console.log(req.body)
    try {
        const createdPurchaseCustomLabels = [];



        // Only create a new PurchaseCustomLabel if customLable is not an empty string
        if (customLabel.customLable !== "") {
            const purchaseCustomLabel = new PurchaseCustomLabel({

                customLable1: customLabel.customLable1,
                isRequired1: customLabel.isRequired1,
                customLable2: customLabel.customLable2,
                isRequired2: customLabel.isRequired2,
                customLable3: customLabel.customLable3,
                isRequired3: customLabel.isRequired3,
                customLable4: customLabel.customLable4,
                isRequired4: customLabel.isRequired4
            });

            // Save the purchaseCustomLabel
            const savedPurchaseCustomLabel = await purchaseCustomLabel.save();

            createdPurchaseCustomLabels.push(savedPurchaseCustomLabel);
        }

        res.status(201).json({ createdPurchaseCustomLabels });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getPurchaseCustomLabels = async (req, res) => {
    try {
        const purchaseCustomLabels = await PurchaseCustomLabel.findOne({}); // Assuming there is only one document

        // Initialize an object to store the response data
        const response = {};

        for (let i = 1; i <= 4; i++) {
            response[`customLable${i}`] = purchaseCustomLabels[`customLable${i}`];
            response[`isRequired${i}`] = purchaseCustomLabels[`isRequired${i}`];
        }

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updatePUrchaseCustomLabel = async (req, res) => {
    const updatedData = req.body;

    try {
        let purchaseCustomLabels = await PurchaseCustomLabel.findOne({});
        if (!purchaseCustomLabels) {
            purchaseCustomLabels = new PurchaseCustomLabel();
        }
        for (let i = 1; i <= 4; i++) {
            if (updatedData[`customLable${i}`] !== undefined) {
                purchaseCustomLabels[`customLable${i}`] = updatedData[`customLable${i}`];
            }
            if (updatedData[`isRequired${i}`] !== undefined) {
                purchaseCustomLabels[`isRequired${i}`] = updatedData[`isRequired${i}`];
            }
        }

        await purchaseCustomLabels.save();

        res.status(200).json({ message: 'PurchaseCustom Labels updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}