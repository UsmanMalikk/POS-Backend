const ProductCustomLabel = require('../models/productCustomLabels');
exports.createProductCustomLabel = async (req, res) => {
    // const customProductLabels = req.body;
    // consloe.log(req.body)

    try {
        const productCustomLabelData = {};
        // Retrieve the ProductCustomLabel document
        const productCustomLabel = await ProductCustomLabel.findOne();

        if (!productCustomLabel) {
            return res.status(404).json({ message: 'Product custom label not found' });
        }

        // Initialize an array to hold the custom labels
        const customLabels = [];

        for (let i = 1; i <= 10; i++) {
            const customLable = productCustomLabel[`customLable${i}`];
            const customLableType = productCustomLabel[`customLableType${i}`];
            const dropdownOptions = productCustomLabel[`dropdownOptions${i}`];

            productCustomLabelData[`customLable${i}`] = customLable || '';
            productCustomLabelData[`customLableType${i}`] = customLableType || '';
            productCustomLabelData[`dropdownOptions${i}`] = dropdownOptions
                ? dropdownOptions.split('\n').map(option => option.trim())
                : [];
        }



        res.status(201).json(productCustomLabelData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getProductCustomLabels = async (req, res) => {

    try {
        const productCustomLabels = await ProductCustomLabel.findOne({}); // Assuming there is only one document

        // Initialize an object to store the response data
        const response = {};

        for (let i = 1; i <= 10; i++) {
            response[`customLable${i}`] = productCustomLabels[`customLable${i}`];
            response[`customLableType${i}`] = productCustomLabels[`customLableType${i}`];

            if (productCustomLabels[`dropdownOptions${i}`]) {
                // Combine dropdownOptions array into a single string with "\n" separation
                response[`dropdownOptions${i}`] = productCustomLabels[`dropdownOptions${i}`].join('\n');
            } else {
                response[`dropdownOptions${i}`] = '';
            }
        }

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a ProductCustomLabel by ID
exports.updateProductCustomLabel = async (req, res) => {
    const updatedData = req.body;

    try {
        let productCustomLabels = await ProductCustomLabel.findOne({});
        if (!productCustomLabels) {
            productCustomLabels = new ProductCustomLabel();
        }
        for (let i = 1; i <= 10; i++) {
            if (updatedData[`customLable${i}`] !== undefined) {
                productCustomLabels[`customLable${i}`] = updatedData[`customLable${i}`];
            }
            if (updatedData[`customLableType${i}`] !== undefined) {
                productCustomLabels[`customLableType${i}`] = updatedData[`customLableType${i}`];
            }
            if (updatedData[`dropdownOptions${i}`] !== undefined) {
                productCustomLabels[`dropdownOptions${i}`] = updatedData[`dropdownOptions${i}`]
                    ? updatedData[`dropdownOptions${i}`].split('\n').map(option => option.trim())
                    : [];
            }
        }

        await productCustomLabels.save();

        res.status(200).json({ message: 'ProductCustom Labels updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProductCustomLabelsWithArrayDropdown = async (req, res) => {

    try {
        const productCustomLabels = await ProductCustomLabel.findOne({}); // Assuming there is only one document

        // Initialize an object to store the response data
        const response = {};

        for (let i = 1; i <= 10; i++) {
            response[`customLable${i}`] = productCustomLabels[`customLable${i}`];
            response[`customLableType${i}`] = productCustomLabels[`customLableType${i}`];

            if (productCustomLabels[`dropdownOptions${i}`]) {
                response[`dropdownOptions${i}`] = productCustomLabels[`dropdownOptions${i}`];
            } else {
                response[`dropdownOptions${i}`] = '';
            }
        }

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};