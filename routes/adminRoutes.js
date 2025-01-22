const express = require('express');
const { adminRegister, adminLogin, getAllAdmins, deleteAllAdmins } = require('../controllers/adminController.js');

const router = express.Router();

router.post('/login', adminLogin);
router.post('/register', adminRegister);
//router.get('/getallusers', getAllAdmins);
//router.delete('/deleteallusers', deleteAllAdmins);
module.exports = router;
