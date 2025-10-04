const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucherController');
const auth = require('../middleware/auth');

// User routes
router.get('/', auth(['customer', 'vendor', 'admin']), voucherController.getUserVouchers);
router.post('/purchase', auth(['customer', 'vendor', 'admin']), voucherController.purchaseVoucher);
router.get('/validate/:code', auth(['customer', 'vendor', 'admin']), voucherController.validateVoucher);
router.post('/apply', auth(['customer', 'vendor', 'admin']), voucherController.applyVoucher);

module.exports = router;
