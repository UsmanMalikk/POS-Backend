const express = require('express');
const router = express.Router();
const posController = require('../controllers/posController');
//GET Sales Shipment Status
router.get('/shipments', posController.salePosShipment);

// Get suspended
router.get('/suspended', posController.getSuspendedSales);

// GET /sales/all-records
router.get('/', posController.getAllPosSales);

// POST /sales
router.post('/', posController.createPosSale);

// GET /sales/:id
router.get('/:id', posController.getPosSaleById);

// PUT /sales/:id
router.put('/:id', posController.updatePosSale);

// DELETE /sales/:id
router.delete('/:id', posController.deletePosSale);


module.exports = router;
