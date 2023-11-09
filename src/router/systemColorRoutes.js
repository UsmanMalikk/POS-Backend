// routes/systemColor.js

const express = require('express');
const router = express.Router();
const systemColorController = require('../controllers/SystemColorController');

// Update the system color
router.put('/', systemColorController.updateSystemColor);

// Fetch the system color
router.get('/', systemColorController.getSystemColor);

module.exports = router;
