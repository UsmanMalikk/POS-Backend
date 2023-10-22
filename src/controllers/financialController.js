const FundTransfer = require('../models/fundTransfer');
const FundDeposit = require('../models/fundDeposit');
const Account = require('../models/addAccount');
// const Supplier = require('../models/addSupplier');  //This fields
// const Customer = require('../models/addCustomer');  //This fields
// const Purchase = require('../models/addPurchase');  //This fields
const Sale = require('../models/addSale');
const Expense = require('../models/addExpense');

// async function calculateSupplierDue() {
//   try {
//     const supplierData = await Supplier.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalPurchaseDue: { $sum: '$totalPurchaseDue' },
//           totalPurchaseReturnDue: { $sum: '$totalPurchaseReturnDue' },
//         },
//       },
//     ]);

//     if (supplierData.length === 0) {
//       return 0;
//     }

//     const netSupplierDue = supplierData[0].totalPurchaseDue - supplierData[0].totalPurchaseReturnDue;

//     return netSupplierDue;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// async function calculateCustomerDue() {
//   try {
//     const customerData = await Customer.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalSalesDue: { $sum: '$totalSalesDue' },
//           totalSalesReturnDue: { $sum: '$totalSalesReturnDue' },
//         },
//       },
//     ]);

//     if (customerData.length === 0) {
//       return 0;
//     }

//     const netCustomerDue = customerData[0].totalSalesDue - customerData[0].totalSalesReturnDue;

//     return netCustomerDue;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

exports.getBalanceSheet= async (req, res) => {
  try {
    // const supplierDue = await calculateSupplierDue();
    // const customerDue = await calculateCustomerDue();
    const accounts = await Account.find({}, 'name openingBalance');
    // console.log(accounts)
    // const name = accounts.name;
    // const balance = accounts.openingBalance;

    // const balanceSheet = {
    //   // supplierDue,
    //   // customerDue,
    //   name,
    //   balance,
    // };

    res.status(200).json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCashFlow= async (req, res) => {
  try {
    // const purchaseData = await Purchase.find({ paymentAccount: { $ne: null } });
    const saleData = await Sale.find({ paymentAccount: { $ne: null } });
    const expenseData = await Expense.find({ paymentAccount: { $ne: null } });
    const fundTransferData = await FundTransfer.find();
    const fundDepositData = await FundDeposit.find();

    const cashFlowData = {
      // purchases: purchaseData,
      sales: saleData,
      expenses: expenseData,
      fundTransfers: fundTransferData,
      fundDeposits: fundDepositData,
    };

    res.status(200).json(cashFlowData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getPaymentAccountReport= async (req, res) => {
  try {
    // const purchaseTransactions = await Purchase.find({ paymentMethod: { $ne: null } });
    const saleTransactions = await Sale.find({ paymentMethod: { $ne: null } });
    const expenseTransactions = await Expense.find({ paymentMethod: { $ne: null } });

    const paymentAccountReportData = {
      // purchases: purchaseTransactions,
      sales: saleTransactions,
      expenses: expenseTransactions,
    };

    res.status(200).json(paymentAccountReportData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createFundsTransfer= async (req, res) =>{
  const transferData = req.body;

  try {
    const newTransfer = await FundTransfer.create(transferData);

    if (!transferData.transferFrom || !transferData.transferTo || !transferData.amount || !transferData.date) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    const sourceAccount = await Account.findById(transferData.transferFrom);
    const targetAccount = await Account.findById(transferData.transferTo);

    if (!sourceAccount || !targetAccount) {
      return res.status(404).json({ message: 'Source or target account not found' });
    }

    if (sourceAccount.openingBalance < transferData.amount) {
      return res.status(400).json({ message: 'Insufficient balance in the source account' });
    }

    sourceAccount.openingBalance -= transferData.amount;
    await sourceAccount.save();

    targetAccount.openingBalance = parseFloat(targetAccount.openingBalance) + parseFloat(transferData.amount);
    await targetAccount.save();

    console.log(targetAccount)
    res.status(200).json({ message: 'Funds transferred successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.createFundsDeposit= async (req, res) =>{
  const depositData = req.body;

  try {
    const newDeposit = await FundDeposit.create(depositData);

    if (!depositData.depositFrom || !depositData.depositTo || !depositData.amount || !depositData.date) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    const sourceAccount = await Account.findById(depositData.depositFrom);
    const targetAccount = await Account.findById(depositData.depositTo);

    if (!sourceAccount || !targetAccount) {
      return res.status(404).json({ message: 'Source or target account not found' });
    }

    if (sourceAccount.openingBalance < depositData.amount) {
      return res.status(400).json({ message: 'Insufficient balance in the source account' });
    }

    sourceAccount.openingBalance -= depositData.amount;
    await sourceAccount.save();

    targetAccount.openingBalance = parseFloat(targetAccount.openingBalance) + parseFloat(depositData.amount);;
    await targetAccount.save();

    res.status(200).json({ message: 'Funds deposited successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}