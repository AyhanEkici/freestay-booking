const express = require('express');
const router = express.Router();

// Mock voucher routes
router.get('/', (req, res) => {
  res.json({ vouchers: [] });
});

router.post('/purchase', (req, res) => {
  res.json({ success: true });
});

router.get('/validate/:code', (req, res) => {
  res.json({ valid: true });
});

router.post('/apply', (req, res) => {
  res.json({ success: true });
});

module.exports = router;
