const express = require('express');
const router = express.Router();

// Mock user routes
router.get('/environment', (req, res) => {
  res.json({
    dashboardConfig: {},
    preferences: {}
  });
});

router.put('/environment/config', (req, res) => {
  res.json({ success: true });
});

router.put('/environment/preferences', (req, res) => {
  res.json({ success: true });
});

module.exports = router;
