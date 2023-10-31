// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); 

// POST /login
router.post('/login', authController.login);

// POST /register
router.post('/register', authController.register);

// Update an admin by ID
router.put('/', authMiddleware, authController.updateAdmin);

// Get an admin by ID
router.get('/', authMiddleware, authController.getAdminById);

module.exports = router;
