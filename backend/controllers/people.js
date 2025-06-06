const People = require('../models/People');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await People.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const getEmployeeCount = async (req, res) => {
  try {
    const count = await People.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Error fetching employee count:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const getEmployeeStats = async (req, res) => {
  try {
    const totalEmployees = await People.countDocuments();
    const activeEmployees = await People.countDocuments({ status: 'Active' });
    const recentHires = await People.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
    });
    
    const departmentStats = await People.aggregate([
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalEmployees,
      activeEmployees,
      recentHires,
      departmentStats
    });
  } catch (err) {
    console.error('Error fetching employee stats:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = new People({
      name: req.body.name,
      email: req.body.email,
      jobTitle: req.body.jobTitle,
      department: req.body.department,
      salary: req.body.salary,
      lifeCycle: 'Hired',
      status: 'Active'
    });

    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    console.error('Error creating employee:', err);
    res.status(400).json({ message: err.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee = await People.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(400).json({ message: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await People.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeCount,
  getEmployeeStats,
  createEmployee,
  updateEmployee,
  deleteEmployee
};