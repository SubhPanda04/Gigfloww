const express = require('express');
const router = express.Router();
const { getUsers, getUserById } = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/', auth, getUsers);
router.get('/:id', auth, getUserById);

module.exports = router;