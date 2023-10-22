const express = require('express');
const router = express.Router();
const accountTypeController = require('../controllers/accountTypeController');

// Create a new AccountType
router.post('/', accountTypeController.createAccountType);

// Update an existing AccountType by ID
router.put('/:id', accountTypeController.updateAccountType);

// Delete an AccountType by ID
router.delete('/:id', accountTypeController.deleteAccountType);

// View all AccountTypes
router.get('/', accountTypeController.viewAllAccountTypes);

// View an AccountType by ID
router.get('/:id', accountTypeController.viewAccountTypeById);

module.exports = router;
