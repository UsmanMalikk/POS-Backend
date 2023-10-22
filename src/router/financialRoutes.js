// routes/financialRoutes.js
const express = require('express');
const router = express.Router();
const financialController = require('../controllers/financialController');

// GET /balance-sheet
router.get('/balance-sheet', financialController.getBalanceSheet);

// GET /trial-stock
router.get('/trial-stock', financialController.getBalanceSheet); // Reusing the same controller as balance-sheet

// GET /cash-flow
router.get('/cash-flow', financialController.getCashFlow);

// GET /payment-account-report
router.get('/payment-account-report', financialController.getPaymentAccountReport);

// POST /funds-transfer
router.post('/funds-transfer', financialController.createFundsTransfer);

// POST /funds-deposit
router.post('/funds-deposit', financialController.createFundsDeposit);


module.exports = router;
