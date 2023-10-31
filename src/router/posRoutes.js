const express = require('express');
const router = express.Router();
const posController = require('../controllers/posController');
const {checkPermission} = require('../middleware/checkPermission');

const authMiddleware = require('../middleware/authMiddleware'); 

//GET Sales Shipment Status
router.get('/shipments', authMiddleware, checkPermission('viewAllSell'), posController.salePosShipment);

// Get suspended
router.get('/suspended',authMiddleware, checkPermission('viewAllSell'), posController.getSuspendedSales);

// GET /sales/all-records
router.get('/',authMiddleware, checkPermission('viewAllSell'), posController.getAllPosSales);

// POST /sales
router.post('/',authMiddleware, checkPermission('addSell'), posController.createPosSale);

// GET /sales/:id
router.get('/:id',authMiddleware, checkPermission('viewAllSell'), posController.getPosSaleById);

// PUT /sales/:id
router.put('/:id',authMiddleware, checkPermission('updateSell'), posController.updatePosSale);

// DELETE /sales/:id
router.delete('/:id', authMiddleware, checkPermission('deleteSell'), posController.deletePosSale);


module.exports = router;
