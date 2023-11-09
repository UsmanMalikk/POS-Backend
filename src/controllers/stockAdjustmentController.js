// stockAdjustmentController.js

const StockAdjustment = require('../models/addStockadjustment');
const Prefix = require('../models/prefixes')

async function generateStockAdjustmentId() {
   
    // Find the highest current number in the Supplier schema
    const highestNo = await StockAdjustment.findOne().sort({ referenceNumber: -1 });
    // console.log(highestSupplier)
  
    if(!highestNo){
        highestNo.referenceNumber = 0
    }
    let currentNumber = 1; // Initialize to 1 if there are no existing suppliers
  
    if (highestNo) {
      currentNumber = parseFloat(highestNo.referenceNumber) + parseFloat(1);
    }
  
  
  
    // Format the contact ID with the prefix and sequential number
    const formattedNumber = currentNumber.toString().padStart(4, '0'); // Adjust the padding length as needed
  
    return `${formattedNumber}`;
  }
  
// Controller for POST /stock-adjustment
exports.createStockAdjustment = async (req, res) => {
    const adjustmentData = req.body;

    try {
        if (!adjustmentData.referenceNumber) {
            // console.log("cf")
      
            const generatedStockAdjustmentId = await generateStockAdjustmentId();
            adjustmentData.referenceNumber = generatedStockAdjustmentId;
            // console.log(newContactData.contact_id)
      
          }
        const newAdjustment = await StockAdjustment.create(adjustmentData);

        res.status(201).json({ message: 'Stock adjustment added successfully', adjustment: newAdjustment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller for PUT /stock-adjustment/:id
exports.updateStockAdjustment = async (req, res) => {
    const adjustmentId = req.params.id;
    const adjustmentData = req.body;

    try {
        const updatedAdjustment = await StockAdjustment.findByIdAndUpdate(adjustmentId, adjustmentData, { new: true });

        if (!updatedAdjustment) {
            return res.status(404).json({ message: 'Stock adjustment not found' });
        }

        res.status(200).json({ message: 'Stock adjustment updated successfully', adjustment: updatedAdjustment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller for DELETE /stock-adjustment/:id
exports.deleteStockAdjustment = async (req, res) => {
    const adjustmentId = req.params.id;

    try {
        const deletedAdjustment = await StockAdjustment.findByIdAndDelete(adjustmentId);

        if (!deletedAdjustment) {
            return res.status(404).json({ message: 'Stock adjustment not found' });
        }

        res.status(200).json({ message: 'Stock adjustment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller for GET /stock-adjustment/:id
exports.getStockAdjustmentById = async (req, res) => {
    const adjustmentId = req.params.id;

    try {
        const adjustment = await StockAdjustment.findById(adjustmentId).populate('inputData.product','productName').populate('businesLocation','name landmark city state country mobileNo');

        if (!adjustment) {
            return res.status(404).json({ message: 'Stock adjustment not found' });
        }
        res.status(200).json(adjustment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller for GET /stock-adjustment
exports.getAllStockAdjustments = async (req, res) => {
    try {
        const adjustments = await StockAdjustment.find().populate('businesLocation','name');
        res.status(200).json(adjustments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
