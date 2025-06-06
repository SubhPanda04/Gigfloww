const Salary = require('../models/Salary');
const People = require('../models/People');

const getAllSalaries = async (req, res) => {
  try {
    const employees = await People.find().select('name email jobTitle department salary status');
    const salaryData = employees.map(emp => ({
      _id: emp._id,
      id: emp._id,
      name: emp.name,
      email: emp.email,
      jobTitle: emp.jobTitle,
      department: emp.department,
      netSalary: emp.salary,
      salary: emp.salary, 
      status: Math.random() > 0.5 ? 'Paid' : 'Pending' 
    }));
    
    res.json(salaryData);
  } catch (err) {
    console.error('Error fetching salaries:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const createSalary = async (req, res) => {
  try {
    const salary = new Salary({
      employee: req.body.employeeId,
      netSalary: req.body.netSalary,
      status: 'Pending'
    });

    const newSalary = await salary.save();
    res.status(201).json(newSalary);
  } catch (err) {
    console.error('Error creating salary:', err);
    res.status(400).json({ message: err.message });
  }
};

const updateSalaryStatus = async (req, res) => {
  try {
    const { employeeId, status } = req.body;
    
    const salary = await Salary.findOneAndUpdate(
      { employee: employeeId },
      { status: status, paymentDate: status === 'Paid' ? new Date() : null },
      { new: true, upsert: true }
    );
    
    res.json(salary);
  } catch (err) {
    console.error('Error updating salary status:', err);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAll: getAllSalaries,
  create: createSalary,
  updateStatus: updateSalaryStatus
};