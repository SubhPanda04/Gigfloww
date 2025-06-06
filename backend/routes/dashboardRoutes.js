const express = require('express');
const router = express.Router();
const { getMetrics, updateMetrics } = require('../controllers/dashboard');
const auth = require('../middleware/auth');

router.get('/', auth, getMetrics);
router.get('/metrics', getMetrics);
router.put('/:id', auth, updateMetrics);

module.exports = router;