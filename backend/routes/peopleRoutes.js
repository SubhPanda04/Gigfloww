const express = require('express');
const { 
  getAllEmployees, 
  getEmployeeCount,
  getEmployeeStats,
  createEmployee,
  updateEmployee,
  deleteEmployee 
} = require('../controllers/people');

const router = express.Router();

router.route('/')
  .get(getAllEmployees)
  .post(createEmployee);

router.route('/count')
  .get(getEmployeeCount);

router.route('/stats')
  .get(getEmployeeStats);

router.route('/:id')
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;