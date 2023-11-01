const PoductCustomLabel = require('../models/productCustomLabels');
exports.createProductCustomLabel = async (req, res) => {
    const customProductLabels = req.body;

    try {
        const createdProductCustomLabels = [];

        customProductLabels.forEach(async (customProductLabel, index) => {
            const { customLable, customLableType, dropdownOptions } = customProductLabel;

            if (customLable !== "") {
                const productCustomLabel = new PoductCustomLabel({
                    customFieldNumber: index + 1, // Assuming customFieldNumber is 1-based
                    customLable,
                    customLableType,
                    dropdownOptions: dropdownOptions.split('\n').map(option => option.trim())
                });

                // Save the productCustomLabel
                const savedProductCustomLabel = await productCustomLabel.save();

                createdProductCustomLabels.push(savedProductCustomLabel);

                
            } 
        });
        res.status(201).json({ createdProductCustomLabels });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProductCustomLabels = async (req, res) => {
    try {
        const productCustomLabels = await PoductCustomLabel.find();
        res.status(200).json(productCustomLabels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};