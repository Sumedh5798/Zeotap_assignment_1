const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/ruleController');

// Render rule creation form
router.get('/create', (req, res) => {
    res.render('index');
});

// Create a new rule
router.post('/create', ruleController.createRule);

// Evaluate a rule against user data
router.post('/evaluate', ruleController.evaluateRule);

module.exports = router;
