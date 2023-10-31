// routes/financialRoutes.js
const express = require('express');
const router = express.Router();
const financialController = require('../controllers/financialController');
const {checkPermission} = require('../middleware/checkPermission'); 

const authMiddleware = require('../middleware/authMiddleware'); 

// GET /balance-sheet
router.get('/balance-sheet', authMiddleware, financialController.getBalanceSheet);

// GET /trial-stock
router.get('/trial-stock', authMiddleware, financialController.getBalanceSheet); // Reusing the same controller as balance-sheet

// GET /cash-flow
router.get('/cash-flow', authMiddleware, financialController.getCashFlow);

// GET /payment-account-report
router.get('/payment-account-report', authMiddleware, financialController.getPaymentAccountReport);

// POST /funds-transfer
router.post('/funds-transfer',authMiddleware ,financialController.createFundsTransfer);

// POST /funds-deposit
router.post('/funds-deposit',authMiddleware ,financialController.createFundsDeposit);


module.exports = router;
