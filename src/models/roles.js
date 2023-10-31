const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
  roleName: { type: String, required: true },
  serviceStaff: {type: Boolean, default: false},
  viewExport: {type: Boolean, default: false},

  viewUser: {type: Boolean, default: false},
  addUser: {type: Boolean, default: false},
  editUser: {type: Boolean, default: false},
  deleteUser: {type: Boolean, default: false},

  viewRole: {type: Boolean, default: false},
  addRole: {type: Boolean, default: false},
  editRole: {type: Boolean, default: false},
  deleteRole: {type: Boolean, default: false},

  viewAllSupplier: {type: Boolean, default: false},
  viewOwnSupplier: {type: Boolean, default: false},
  addSupplier: {type: Boolean, default: false},
  editSupplier: {type: Boolean, default: false},
  deleteSupplier: {type: Boolean, default: false},

  viewAllCustomer: {type: Boolean, default: false},
  viewOwnCutomer: {type: Boolean, default: false},
  viewCustomerswithnosellfromonemonthonly: {type: Boolean, default: false},
  viewCustomerswithnosellfromthreemonthonly: {type: Boolean, default: false},
  viewCustomerswithnosellfromsixmonthonly: {type: Boolean, default: false},
  viewCustomerswithnosellfromoneyearonly: {type: Boolean, default: false},
  viewCustomersirrespectiveoftheirsell: {type: Boolean, default: false},
  addCustomer: {type: Boolean, default: false},
  editCustomer: {type: Boolean, default: false},
  deleteCustomer: {type: Boolean, default: false},

  viewProduct: {type: Boolean, default: false},
  addProduct: {type: Boolean, default: false},
  editProduct: {type: Boolean, default: false},
  deleteProduct: {type: Boolean, default: false},
  addOpeningStock: {type: Boolean, default: false},
  viewPurchasePrice: {type: Boolean, default: false},

  viewAllPurchaseStockAdjustment: {type: Boolean, default: false},
  viewOwnPurchaseStockAdjustment: {type: Boolean, default: false},
  addPurchaseStockAdjustment: {type: Boolean, default: false},
  editPurchaseStockAdjustment: {type: Boolean, default: false},
  deletePurchaseStockAdjustment: {type: Boolean, default: false},
  addPurchasePayment: {type: Boolean, default: false},
  editPurchasePayment: {type: Boolean, default: false},
  deletePurchasePayment: {type: Boolean, default: false},
  updateStatus: {type: Boolean, default: false},

  viewAllPurchaseOrder: {type: Boolean, default: false},
  viewOwnPurchaseOrder: {type: Boolean, default: false},
  createPurchaseOrder: {type: Boolean, default: false},
  editPurchaseOrder: {type: Boolean, default: false},
  deletePurchaseOrder: {type: Boolean, default: false},

  viewPossell: {type: Boolean, default: false},
  addPossell: {type: Boolean, default: false},
  editPossell: {type: Boolean, default: false},
  deletePossell: {type: Boolean, default: false},
  editProductpricefromposscreen: {type: Boolean, default: false},
  editProductdiscountfromposscreen: {type: Boolean, default: false},
  addeditPayment: {type: Boolean, default: false},
  printinvoice: {type: Boolean, default: false},

  viewAllSell: {type: Boolean, default: false},
  viewOwnSellOnly: {type: Boolean, default: false},
  viewPaidSellOnly: {type: Boolean, default: false},
  viewdueSellOnly: {type: Boolean, default: false},
  viewPartiallyPaidSellsOnly: {type: Boolean, default: false},
  viewOverDueSellsOnly: {type: Boolean, default: false},
  addSell: {type: Boolean, default: false},
  updateSell: {type: Boolean, default: false},
  deleteSell: {type: Boolean, default: false},

  // commissionagentcanviewtheirownsell: {type: Boolean, default: false},
  
  addSellPayment: {type: Boolean, default: false},
  editSellPayment: {type: Boolean, default: false},
  deleteSellPayment: {type: Boolean, default: false},
  editProductPriceFromSalesScreen: {type: Boolean, default: false},
  editProductDiscountFromSalesScreen: {type: Boolean, default: false},
  addEditDeleteDiscount: {type: Boolean, default: false},
  accessTypesOfService: {type: Boolean, default: false},
  accessAllSellReturn: {type: Boolean, default: false},
  accessOwnSellReturn: {type: Boolean, default: false},
  addEditInvoiceNumber: {type: Boolean, default: false},

  viewAllDrafts: {type: Boolean, default: false},
  viewOwnDrafts: {type: Boolean, default: false},
  editDraft: {type: Boolean, default: false},
  deleteDraft: {type: Boolean, default: false},

  viewAllQuotations: {type: Boolean, default: false},
  viewOwnQuotations: {type: Boolean, default: false},
  editQuotation: {type: Boolean, default: false},
  deleteQuotation: {type: Boolean, default: false},

  accessAllShipments: {type: Boolean, default: false},
  accessOwnShipments: {type: Boolean, default: false},
  // accessPendingShipmentsOnly: {type: Boolean, default: false},
  // commissionagentcanaccesstheirownshipments: {type: Boolean, default: false},

  viewCashRegister: {type: Boolean, default: false},
  closeCashRegister: {type: Boolean, default: false},

  viewBrand: {type: Boolean, default: false},
  addBrand: {type: Boolean, default: false},
  editBrand: {type: Boolean, default: false},
  deleteBrand: {type: Boolean, default: false},

  viewTaxRate: {type: Boolean, default: false},
  addTaxRate: {type: Boolean, default: false},
  editTaxRate: {type: Boolean, default: false},
  deleteTaxRate: {type: Boolean, default: false},

  viewUnit: {type: Boolean, default: false},
  addUnit: {type: Boolean, default: false},
  editUnit: {type: Boolean, default: false},
  deleteUnit: {type: Boolean, default: false},

  viewCategory: {type: Boolean, default: false},
  addCategory: {type: Boolean, default: false},
  editCategory: {type: Boolean, default: false},
  deleteCategory: {type: Boolean, default: false},

  viewPurchasesellreport: {type: Boolean, default: false},
  viewTaxreport: {type: Boolean, default: false},
  viewSuppliercustomerreport: {type: Boolean, default: false},
  viewExpensereport: {type: Boolean, default: false},
  viewProfitlossreport: {type: Boolean, default: false},
  viewStockreportstockadjustmentreportstockexpiryreport: {type: Boolean, default: false},
  viewTrendingproductreport: {type: Boolean, default: false},
  viewRegisterreport: {type: Boolean, default: false},
  viewSalesrepresentativereport: {type: Boolean, default: false},
  viewProductstockvalue: {type: Boolean, default: false},

  accessBusinessSettings: {type: Boolean, default: false},
  // accessbarcodesettings: {type: Boolean, default: false},
  accessInvoiceSettings: {type: Boolean, default: false},
  // accessprinters: {type: Boolean, default: false},

  accessAlleEpenses: {type: Boolean, default: false},
  viewOwnExpenseOnly: {type: Boolean, default: false},
  addExpense: {type: Boolean, default: false},
  editExpense: {type: Boolean, default: false},
  deleteExpense: {type: Boolean, default: false},

  viewHomeData: {type: Boolean, default: false},

  accessAccounts: {type: Boolean, default: false},
  editAccountTransaction: {type: Boolean, default: false},
  deleteAccountTransaction: {type: Boolean, default: false},

  // addeditviewallbookings: {type: Boolean, default: false},
  // addeditviewownbookings: {type: Boolean, default: false},

  defaultSellingPrice: {type: Boolean, default: false},
  retail: {type: Boolean, default: false},
  saleMan: {type: Boolean, default: false},
  localSale: {type: Boolean, default: false},
  minimumPrice: {type: Boolean, default: false},
  salePoint: {type: Boolean, default: false},

  //   //restaurant
  // accessTables: {type: Boolean, default: false},


//   addeditviewdeleteleavetype: {type: Boolean, default: false},
//   addeditviewdeleteallleave: {type: Boolean, default: false},
//   addviewownleave: {type: Boolean, default: false},
//   approveleave: {type: Boolean, default: false},
//   addeditviewdeleteallattendance: {type: Boolean, default: false},
//   viewownattendance: {type: Boolean, default: false},
//   allowuserstoentertheirownattendancefromweb: {type: Boolean, default: false},
//   allowuserstoentertheirownattendancefromapi: {type: Boolean, default: false},
//   viewpaycomponent: {type: Boolean, default: false},
//   addpaycomponent: {type: Boolean, default: false},
//   addeditviewdeletedepartment: {type: Boolean, default: false},
//   addeditviewdeletedesignation: {type: Boolean, default: false},
//   viewallpayroll: {type: Boolean, default: false},
//   addpayroll: {type: Boolean, default: false},
//   editpayroll: {type: Boolean, default: false},
//   deletepayroll: {type: Boolean, default: false},
//   assigntodotoothers: {type: Boolean, default: false},
//   addtodo: {type: Boolean, default: false},
//   edittodo: {type: Boolean, default: false},
//   deletetodo: {type: Boolean, default: false},
//   createmessage: {type: Boolean, default: false},
//   viewmessage: {type: Boolean, default: false},
//   accesssalestargets: {type: Boolean, default: false},

  viewRecipe: {type: Boolean, default: false},
  addRecipe: {type: Boolean, default: false},
  editRecipe: {type: Boolean, default: false},
  accessProduction: {type: Boolean, default: false},

//   createproject: {type: Boolean, default: false},
//   editproject: {type: Boolean, default: false},
//   deleteproject: {type: Boolean, default: false},

// //   servicestaff: {type: Boolean, default: false},

//   servicestaff: {type: Boolean, default: false},
//   servicestaff: {type: Boolean, default: false},
//   servicestaff: {type: Boolean, default: false},
//   servicestaff: {type: Boolean, default: false},
//   servicestaff: {type: Boolean, default: false},


});

const Role = mongoose.model('Role', rolesSchema);

module.exports = Role;
