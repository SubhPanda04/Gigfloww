const express = require('express');
const { 
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getJobStats
} = require('../controllers/hiring');

const router = express.Router();

router.route('/')
  .get(getAllJobs)
  .post(createJob);

router.route('/stats')
  .get(getJobStats);

router.route('/:id')
  .put(updateJob)
  .delete(deleteJob);

module.exports = router;