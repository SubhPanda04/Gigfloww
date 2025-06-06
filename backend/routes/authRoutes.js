const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
const auth = require('../middleware/auth');
const { getMe } = require('../controllers/auth');
router.get('/me', auth, getMe);

module.exports = router;