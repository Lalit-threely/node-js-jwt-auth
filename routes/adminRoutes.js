const express = require('express');
const { adminRegister, adminLogin } = require('../controllers/adminController.js');

const router = express.Router();

router.post('/login', adminLogin);
router.post('/register', adminRegister);

module.exports = router;
