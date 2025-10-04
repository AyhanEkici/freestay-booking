const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Mock booking routes
router.get('/', auth(), (req, res) => {
  res.json({ bookings: [] });
});

router.post('/', auth(), (req, res) => {
  res.json({ success: true });
});

module.exports = router;
