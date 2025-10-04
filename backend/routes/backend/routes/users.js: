const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Mock user routes
router.get('/environment', auth(), (req, res) => {
  res.json({
    dashboardConfig: {},
    preferences: {}
  });
});

router.put('/environment/config', auth(), (req, res) => {
  res.json({ success: true });
});

router.put('/environment/preferences', auth(), (req, res) => {
  res.json({ success: true });
});

module.exports = router;
