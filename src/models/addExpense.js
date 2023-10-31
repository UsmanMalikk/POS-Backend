const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  // businessLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessLocation' },
  businessLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessLocation', default: null },

  expenseCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ExpenseCategory', required: true },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ExpenseCategory' },
  invoiceNo: { type: String },
  date: { type: Date, required: true },
  expenseFor: { type: mongoose.Schema.Types.ObjectId, ref: 'AddUser', required: true },
  // expenseForContact: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Supplier', required: true
  //   },
    expenseForContact: {
      type: String
    },
  applicableTax: { type: Number },
  totalAmount: { type: Number, required: true },
  expenseNote: { type: String },
  isRefund: { type: Boolean, default: false },//if yes add it to net profit

  amount: { type: Number },
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: { type: String },
  // paymentAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentAccount' },
  paymentNote: { type: String },
});

const AddExpense = mongoose.model('AddExpense', expenseSchema);

module.exports = AddExpense;
