const express = require('express');
const { getAll, create, updateStatus } = require('../controllers/salary');

const router = express.Router();

router.route('/')
  .get(getAll)
  .post(create);

router.route('/status')
  .put(updateStatus);

module.exports = router;