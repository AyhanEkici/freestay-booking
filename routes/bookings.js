const express = require('express');
const router = express.Router();

// Mock booking routes
router.get('/', (req, res) => {
  res.json({ bookings: [] });
});

router.post('/', (req, res) => {
  res.json({ success: true });
});

module.exports = router;
