const express = require('express');
const router = express.Router();
const prefixController = require('../controllers/prefixController');

// // Create a new prefix
// router.post('/', prefixController.createPrefix);

// Update an existing prefix by ID
router.put('/', prefixController.updatePrefix);

// Get all prefixes
router.get('/', prefixController.getSinglePrefix);

module.exports = router;
