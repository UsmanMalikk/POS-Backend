const PurchasesDue = require('../models/PurchasesDue');
const Account = require('../models/addAccount');
const Product = require('../models/addProduct');
const Supplier = require('../models/Supplier');
const Prefix = require('../models/prefixes')

async function generatePurchaseId() {
    // Find the prefix for contacts in the Prefix schema
    const prefixDocument = await Prefix.findOne();
    // console.log(prefixDocument)
    let prefix = ""; // Initialize a variable to store the contacts prefix
  
    if (prefixDocument) {
      prefix = prefixDocument.purchase;
  
    }
  
    // Find the highest current number in the Supplier schema
    const highestPurchase = await PurchasesDue.findOne().sort({ referenceNo: -1 });
    // console.log(highestSupplier)
  
    if(!highestPurchase){
        highestPurchase.contact_id = 0
    }
    let currentNumber = 1; // Initialize to 1 if there are no existing suppliers
  
    if (highestPurchase) {
      currentNumber = parseFloat(highestPurchase.referenceNo) + parseFloat(1);
    }
  
  
  
    // Format the contact ID with the prefix and sequential number
    const formattedNumber = currentNumber.toString().padStart(4, '0'); // Adjust the padding length as needed
  
    return `${prefix}${formattedNumber}`;
  }
  


const getAllPurchases = async (req, res) => {
    try {
        // const { businessLocation, supplier, purchaseStatus, paymentStatus } = req.query;

        // // Create a query object to filter purchases
        // const query = {};

        // if (businessLocation) {
        //     query.businessLocation = businessLocation;
        // }

        // if (supplier) {
        //     query.supplier = supplier;
        // }

        // if (purchaseStatus) {
        //     query.purchaseStatus = purchaseStatus;
        // }

        // if (paymentStatus) {
        //     query.paymentStatus = paymentStatus;
        // }

        const purchases = await PurchasesDue.find().populate('businessLocation', 'name').populate('supplier', 'firstName');


        // let grandTotal = 0;
        // let paymentDue = 0;

        // const simplifiedPurchases = purchases.map((purchase) => {

        //     const total = purchase.advanceBalnce + purchase.shippingCharges + purchase.purchaseTax;


        //     grandTotal += total;


        //     const paymentDueForPurchase = total - purchase.advanceBalnce;

        //     // Update paymentDue
        //     paymentDue += paymentDueForPurchase;

        //     // Extract only the fields you need
        //     const {
        //         purchaseDate,
        //         supplier,
        //         ReferenceNo,
        //         businessLocation,
        //         purchaseStatus,
        //         paymentStatus,
        //     } = purchase;


        //     const simplifiedPurchase = {
        //         purchaseDate,
        //         supplier,
        //         ReferenceNo,
        //         businessLocation,
        //         purchaseStatus,
        //         paymentStatus,
        //         total,
        //         paymentDue: paymentDueForPurchase,
        //     };

        //     return simplifiedPurchase;
        // });


        // const totals = {
        //     grandTotal,
        //     paymentDue,
        // };

        res.status(200).json(purchases);
    } catch (error) {
        console.error('Error fetching purchases:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const createNewPurchase = async (req, res) => {
    const purchaseData = req.body;
    // console.log(purchaseData)
    try {
        if (!purchaseData.referenceNo) {
            // console.log("cf")
      
            const generatedPurchaseId = await generatePurchaseId();
            purchaseData.referenceNo = generatedPurchaseId;
            // console.log(newContactData.contact_id)
      
          }

        if (purchaseData.paymentAccount) {
            const paymentAccount = await Account.findOne({ _id: purchaseData.paymentAccount });

            if (!paymentAccount) {
                return res.status(400).json({ message: 'Payment account not found' });
            }

            // Subtract the sale amount from the account's opening balance
            paymentAccount.openingBalance = parseFloat(paymentAccount.openingBalance) - parseFloat(purchaseData.amount);

            // Save the updated account back to the AddAccount schema
            await paymentAccount.save();
        }
        
        if (purchaseData.amount < purchaseData.totalPurchaseAmount || purchaseData.paymentMethod === "") {
           
            const supplierId = purchaseData.supplier;
            // console.log(supplierId)
            // Find the supplier in the database
            const supplier = await Supplier.findOne({ _id: supplierId });

            if (!supplier) {
                return res.status(404).json({ message: 'Supplier not found' });
            }

            // Increment the totalPurchaseDue for the supplier
            supplier.totalPurchaseDue = parseFloat(purchaseData.totalPurchaseAmount) - parseFloat(purchaseData.amount);

            // Save the updated supplier
            await supplier.save();
        }
        // if (purchaseData.Reference === "") {
        //     const generatedInvoiceNumber = await generateInvoiceNumber();
        //     saleData.invoiceNumber = generatedInvoiceNumber;

        // }

        // Add stock minus

        if (purchaseData.inputData && purchaseData.inputData.length > 0) {
            for (const purchaseItem of purchaseData.inputData) {
                try {
                    // Find the product by its ID
                    const product = await Product.findById(purchaseItem.product);

                    if (product) {
                        // Increment the total quantity of the product
                        product.totalQuantity = parseFloat(product.totalQuantity) + parseFloat(purchaseItem.quantity);
                        product.unitPurchasePrice = purchaseItem.unitCostBeforeTax;
                        product.unitSellingPrice = purchaseItem.unitSellingPrice;

                        // You may want to perform additional checks here, e.g., updating purchase prices, etc.

                        // Save the product with the updated quantity
                        await product.save();
                    } else {
                        return res.status(404).json({ message: 'Product not found' });
                    }
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
            }
            const newPurchase = await PurchasesDue.create(purchaseData);

            return res.status(201).json({ message: 'Purchase completed successfully', purchase: newPurchase });
        } else {
            return res.status(400).json({ message: 'No purchase data provided' });
        }

    } catch (error) {
        console.error('Error creating customer group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }


}

const updatePurchase = async (req, res) => {
    try {
        const purchaseId = req.params.id;
        const updateData = req.body;


        const updatedPurchase = await PurchasesDue.findByIdAndUpdate(
            purchaseId,
            updateData,
            { new: true }
        );

        if (!updatedPurchase) {
            return res.status(404).json({ error: 'Purchase not found' });
        }

        res.status(200).json(updatedPurchase);
    } catch (error) {
        console.error('Error updating purchase:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deletePurchaseById = async (req, res) => {
    try {
        const purchaseId = req.params.id;


        const deletedPurchase = await PurchasesDue.findByIdAndRemove(purchaseId);

        if (!deletedPurchase) {
            return res.status(404).json({ error: 'Purchase not found' });
        }

        res.status(200).json({ message: 'Purchase deleted successfully', deletedPurchase });
    } catch (error) {
        console.error('Error deleting purchase:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getByIdPurchase = async (req, res) => {
    const purchaseId = req.params.id;

    try {
        const purchase = await PurchasesDue.findById(purchaseId).populate('businessLocation','name').populate('supplier','firstName');

        if (!purchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }
        res.status(200).json(purchase);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { getAllPurchases, createNewPurchase, updatePurchase, deletePurchaseById , getByIdPurchase};