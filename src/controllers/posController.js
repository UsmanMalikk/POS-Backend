// controllers/salesController.js
const Pos = require('../models/addPos');
const Invoice = require('../models/invoice');
const Quotation = require('../models/addQuotations');
const Draft = require('../models/addDraft');
const Admin = require('../models/admin');
const User = require('../models/addUser');
const Sale = require('../models/addSale');
const mongoose = require("mongoose");



async function generateInvoiceNumber() {
    const invoice = await Invoice.findOne({ isDefault: true }); // Assuming you have only one document for invoices
    let currentInvoiceNumber = invoice.currentInvoiceNumber;
    let prefix = invoice.namePrefix;
    let numberOfDigits = invoice.numberOfDigits
    // let startFrom = invoice.startFrom
    // Use the specified starting number if provided
    // if (startFrom) {
    //     currentInvoiceNumber = invoice.startFrom;
    // }

    // Increment the invoice number
    currentInvoiceNumber++;

    // Update the currentInvoiceNumber in the database
    await Invoice.findOneAndUpdate({ isDefault: true }, { currentInvoiceNumber });

    // Generate the formatted invoice number
    if (prefix === '') {
        return currentInvoiceNumber.toString().padStart(numberOfDigits, '0');
    } else {
        // const currentYear = new Date().getFullYear();
        return `${prefix}-${currentInvoiceNumber.toString().padStart(numberOfDigits, '0')}`;
    }

    return null; // Invalid format
}
// Get all sales
exports.getAllPosSales = async (req, res) => {
    // const saleType = req.params.type;
    try {
        // if(saleType === 'draft'){

        //     const drafts = await Draft.find();
        //     res.status(200).json(drafts);
        // }
        // else if(saleType === 'quotations'){
        //     const quotations = await Quotation.find();
        //     res.status(200).json(quotations);
        // }
        // else {
        const sales = await Pos.find().populate('customer', 'firstName prefix mobile').populate('deliveryPersonUser', 'firstName').populate('businesLocation', 'name').populate('deliveryPersonAdmin', 'firstName');
        res.status(200).json(sales);
        // }
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new sale

exports.createPosSale = async (req, res) => {
    const saleData = req.body;
    // const saleType = req.params.type;

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        if (saleData.status === 'Draft') {
            const adminUser = await Admin.findOne({ _id: saleData.deliveryPerson });
            let deliveryPersonAdmin = null;
            let deliveryPersonUser = null;

            if (adminUser) {
                // If the deliveryPerson is an Admin, assign it to deliveryPersonAdmin
                deliveryPersonAdmin = saleData.deliveryPerson;
            } else {
                // If not, check in the AddUser schema
                const addUser = await User.findOne({ _id: saleData.deliveryPerson });

                if (addUser) {
                    // If the deliveryPerson is an AddUser, assign it to deliveryPersonUser
                    deliveryPersonUser = saleData.deliveryPerson;
                }
            }

            if (saleData.invoiceNumber === "") {
                const generatedInvoiceNumber = await generateInvoiceNumber();
                saleData.invoiceNumber = generatedInvoiceNumber;

            }
            const newDraft = await Draft.create(saleData);
            res.status(201).json({ message: 'Draft added successfully', draft: newDraft });
        }
        else if (saleData.status === 'Quotation') {
            const adminUser = await Admin.findOne({ _id: saleData.deliveryPerson });
            let deliveryPersonAdmin = null;
            let deliveryPersonUser = null;

            if (adminUser) {
                // If the deliveryPerson is an Admin, assign it to deliveryPersonAdmin
                deliveryPersonAdmin = saleData.deliveryPerson;
            } else {
                // If not, check in the AddUser schema
                const addUser = await User.findOne({ _id: saleData.deliveryPerson });

                if (addUser) {
                    // If the deliveryPerson is an AddUser, assign it to deliveryPersonUser
                    deliveryPersonUser = saleData.deliveryPerson;
                }
            }

            if (saleData.invoiceNumber === "") {
                const generatedInvoiceNumber = await generateInvoiceNumber();
                saleData.invoiceNumber = generatedInvoiceNumber;

            }
            const newQuotation = await Quotation.create(saleData);
            res.status(201).json({ message: 'Quotation added successfully', quotation: newQuotation });
        }
        else {

            const adminUser = await Admin.findOne({ _id: saleData.deliveryPerson });
            let deliveryPersonAdmin = null;
            let deliveryPersonUser = null;

            if (adminUser) {
                // If the deliveryPerson is an Admin, assign it to deliveryPersonAdmin
                deliveryPersonAdmin = saleData.deliveryPerson;
            } else {
                // If not, check in the AddUser schema
                const addUser = await User.findOne({ _id: saleData.deliveryPerson });

                if (addUser) {
                    // If the deliveryPerson is an AddUser, assign it to deliveryPersonUser
                    deliveryPersonUser = saleData.deliveryPerson;
                }
            }


            if (saleData.invoiceNumber === "" && saleData.status != 'Suspended') {
                const generatedInvoiceNumber = await generateInvoiceNumber();
                saleData.invoiceNumber = generatedInvoiceNumber;

            }


            try {

                if (saleData.paymentAccount) {
                    const paymentAccount = await Account.findOne({ _id: saleData.paymentAccount });

                    if (!paymentAccount) {
                        await session.abortTransaction();
                        session.endSession();
                        return res.status(400).json({ message: 'Payment account not found' });
                    }

                    // Subtract the sale amount from the account's opening balance
                    paymentAccount.openingBalance = parseFloat(paymentAccount.openingBalance) + parseFloat(saleData.amount);

                    // Save the updated account back to the AddAccount schema
                    await paymentAccount.save();
                }

                if (saleData.amount < saleData.totalSaleAmount || saleData.paymentMethod === "") {

                    const customerId = saleData.customer;

                    // Find the supplier in the database
                    const customer = await Supplier.findOne({ _id: customerId });

                    if (!customer) {
                        await session.abortTransaction();
                        session.endSession();
                        return res.status(404).json({ message: 'customer not found' });
                    }

                    // Increment the totalPurchaseDue for the supplier
                    customer.totalPurchaseDue = parseFloat(saleData.totalSaleAmount) + parseFloat(saleData.amount);

                    // Save the updated supplier
                    await customer.save();
                }


                if (saleData.inputData && saleData.inputData.length > 0) {
                    for (const saleItem of saleData.inputData) {
                        const product = await Product.findById(saleItem.product);

                        if (product) {
                            if (product.totalQuantity >= saleItem.quantity) {
                                // product.openingStock.quantityRemaining -= saleItem.quantity;
                                product.totalQuantity = parseFloat(product.totalQuantity) - parseFloat(saleItem.quantity);

                                await product.save();
                            } else {
                                await session.abortTransaction();
                                session.endSession();
                                return res.status(400).json({ message: 'Insufficient product quantity' });
                            }
                        } else {
                            await session.abortTransaction();
                            session.endSession();
                            return res.status(404).json({ message: 'Product not found' });
                        }
                    }
                }

                const newSale = await Pos.create({
                    ...saleData,
                    deliveryPersonAdmin,
                    deliveryPersonUser,
                });
                await session.commitTransaction();
                session.endSession();

                res.status(201).json({ message: 'Sale added successfully', sale: newSale });
            } catch (error) {
                // Handle specific errors and rollback the transaction
                await session.abortTransaction();
                session.endSession();
                throw error; // Rethrow the error for a generic error response
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// exports.createSale = async (req, res) => {
//     const saleData = req.body;

//     try {
//         const newSale = await Sale.create(saleData);
//         res.status(201).json({ message: 'Sale added successfully', sale: newSale });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// Get a sale by ID
exports.getPosSaleById = async (req, res) => {
    const saleId = req.params.id;
    // const saleType = req.params.type;



    try {
        // if(saleType === 'draft'){
        //     const draft = await Draft.findById(saleId);

        //     if (!draft) {
        //         return res.status(404).json({ message: 'Draft not found' });
        //     }

        //     res.status(200).json(draft);
        // }

        // else if(saleType === 'quotations'){
        //     const quotation = await Quotation.findById(saleId);

        //     if (!quotation) {
        //         return res.status(404).json({ message: 'Quotation not found' });
        //     }

        //     res.status(200).json(quotation);
        // }

        // else{
        const sale = await Pos.findById(saleId).populate('inputData.product', 'productName').populate('customer', 'firstName prefix mobile addressLine1').populate('deliveryPersonUser', 'firstName').populate('businesLocation', 'name').populate('deliveryPersonAdmin', 'firstName').populate('sellingPrice', 'name');

        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        res.status(200).json(sale);
        // }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a sale
exports.updatePosSale = async (req, res) => {
    const saleId = req.params.id;
    const saleData = req.body;
    const saleType = req.params.type;



    try {
        if (saleType === 'draft') {
            const updatedDraft = await Draft.findByIdAndUpdate(saleId, saleData, { new: true });

            if (!updatedDraft) {
                return res.status(404).json({ message: 'Draft not found' });
            }

            res.status(200).json({ message: 'Draft updated successfully', draft: updatedDraft });
        }

        else if (saleType === 'quotations') {
            const updatedQuotation = await Quotation.findByIdAndUpdate(saleId, saleData, { new: true });

            if (!updatedQuotation) {
                return res.status(404).json({ message: 'Quotation not found' });
            }

            res.status(200).json({ message: 'Quotation updated successfully', quotation: updatedQuotation });
        }

        else {
            const updatedSale = await Pos.findByIdAndUpdate(saleId, saleData, { new: true });

            if (!updatedSale) {
                return res.status(404).json({ message: 'Sale not found' });
            }

            res.status(200).json({ message: 'Sale updated successfully', sale: updatedSale });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a sale
exports.deletePosSale = async (req, res) => {
    const saleType = req.params.type;
    const saleId = req.params.id;

    try {
        if (saleType === 'draft') {
            const deletedDraft = await Draft.findByIdAndDelete(saleId);

            if (!deletedDraft) {
                return res.status(404).json({ message: 'Draft not found' });
            }

            res.status(200).json({ message: 'Draft deleted successfully' });
        }

        else if (saleType === 'quotations') {
            const deletedQuotation = await Quotation.findByIdAndDelete(saleId);

            if (!deletedQuotation) {
                return res.status(404).json({ message: 'Quotation not found' });
            }

            res.status(200).json({ message: 'Quotation deleted successfully' });
        }

        else {
            const deletedSale = await Pos.findByIdAndDelete(saleId);

            if (!deletedSale) {
                return res.status(404).json({ message: 'Sale not found' });
            }

            res.status(200).json({ message: 'Sale deleted successfully' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /shipments/:status
exports.salePosShipment = async (req, res) => {
    // const shipmentStatus = req.params.status;
    // if (!shipmentStatus || shipmentStatus.trim() === '') {
    //     return res.status(400).json({ message: 'Please provide a valid shipment status' });
    //   }

    try {
        const shipments = await Pos.find({ shippingStatus: { $ne: "" } });
        res.status(200).json(shipments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
//Suspended sales
exports.getSuspendedSales = async (req, res) => {
    try {
        // Use the Sale model to find all sales with the status "Suspended"
        const suspendedSales = await Pos.find({ status: 'Suspended' });

        res.json(suspendedSales);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};