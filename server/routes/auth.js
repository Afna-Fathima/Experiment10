const express = require('express');
const { register, registerAdmin, login, logout, getProfile, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/register-admin', registerAdmin);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', protect, getProfile);
router.put('/change-password', protect, changePassword);

module.exports = router;
