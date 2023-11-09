// routes/purchaseCustomLabelRoutes.js

const express = require('express');
const router = express.Router();
const purchaseCustomLabelController = require('../controllers/purchaseCustomLabelController');

// Create multiple PurchaseCustomLabels
router.post('/', purchaseCustomLabelController.createMultiplePurchaseCustomLabels);
router.get('/', purchaseCustomLabelController.getPurchaseCustomLabels);
router.put('/', purchaseCustomLabelController.updatePUrchaseCustomLabel);

module.exports = router;
