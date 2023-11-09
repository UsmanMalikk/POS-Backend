const express = require('express');
const router = express.Router();

const productCustomLabelController = require('../controllers/productCustomLabelController');
const { checkPermission } = require('../middleware/checkPermission');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', productCustomLabelController.createProductCustomLabel);
router.get('/', productCustomLabelController.getProductCustomLabels);
router.put('/', productCustomLabelController.updateProductCustomLabel);
router.get('/withdropdown', productCustomLabelController.getProductCustomLabelsWithArrayDropdown);

// router.get('/:id', productCustomLabelController.getContactCustomLabelById);

// router.put('/:id', productCustomLabelController.updateContactCustomLabel);

module.exports = router;