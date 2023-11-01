// stockTransferController.js

const StockTransfer = require('../models/addStocktransfer');
const Prefix = require('../models/prefixes')

async function generateStockTransferId() {
    // Find the prefix for contacts in the Prefix schema
    const prefixDocument = await Prefix.findOne();
    // console.log(prefixDocument)
    let prefix = ""; // Initialize a variable to store the contacts prefix
  
    if (prefixDocument) {
      prefix = prefixDocument.stockTransfer;
  
    }
  
    // Find the highest current number in the Supplier schema
    const highestNo = await StockTransfer.findOne().sort({ referenceNumber: -1 });
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
  
    return `${prefix}${formattedNumber}`;
  }
// Controller for POST /stock-transfers
exports.createStockTransfer = async (req, res) => {
    const transferData = req.body;

    try {
        if (!transferData.referenceNumber) {
            // console.log("cf")
      
            const generatedStockTransferId = await generateStockTransferId();
            transferData.referenceNumber = generatedStockTransferId;
            // console.log(newContactData.contact_id)
      
          }
        const newTransfer = await StockTransfer.create(transferData);
        res.status(201).json({ message: 'Stock transfer added successfully', transfer: newTransfer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller for PUT /stock-transfers/:id
exports.updateStockTransfer = async (req, res) => {
    const transferId = req.params.id;
    const transferData = req.body;

    try {
       
        const updatedTransfer = await StockTransfer.findByIdAndUpdate(transferId, transferData, { new: true });

        if (!updatedTransfer) {
            return res.status(404).json({ message: 'Stock transfer not found' });
        }

        res.status(200).json({ message: 'Stock transfer updated successfully', transfer: updatedTransfer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller for DELETE /stock-transfers/:id
exports.deleteStockTransfer = async (req, res) => {
    const transferId = req.params.id;

    try {
        const deletedTransfer = await StockTransfer.findByIdAndDelete(transferId);

        if (!deletedTransfer) {
            return res.status(404).json({ message: 'Stock transfer not found' });
        }

        res.status(200).json({ message: 'Stock transfer deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller for GET /stock-transfers/:id
exports.getStockTransferById = async (req, res) => {
    const transferId = req.params.id;

    try {
        const transfer = await StockTransfer.findById(transferId).populate('inputData.product','productName').populate('fromLocation','name landmark city state country mobileNo').populate('toLocation','name landmark city state country mobileNo');

        if (!transfer) {
            return res.status(404).json({ message: 'Stock transfer not found' });
        }

        res.status(200).json(transfer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller for GET /stock-transfers
exports.getAllStockTransfers = async (req, res) => {
    try {
        const transfers = await StockTransfer.find().populate('fromLocation','name').populate('toLocation','name');
        res.status(200).json(transfers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
