const { Router } = require('express');
const mailController = require('../controllers/mailController');

const router = Router();

router.post('/enquiry', mailController.enquiry)
router.post('/join-us', mailController.joinUs);

module.exports = router;