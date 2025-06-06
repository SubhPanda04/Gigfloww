const Dashboard = require('../models/Dashboard');
const People = require('../models/People');
const Job = require('../models/Job');

const getMetrics = async (req, res) => {
  try {
    const employeeCount = await People.countDocuments();
    const activeEmployees = await People.countDocuments({ status: 'Active' });
    const recentHires = await People.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });
    let totalJobs = 0;
    let activeJobs = 0;
    let totalApplications = 0;

    try {
      totalJobs = await Job.countDocuments();
      activeJobs = await Job.countDocuments({ status: 'Active' });
      
      const applicationStats = await Job.aggregate([
        {
          $group: {
            _id: null,
            totalApplications: { $sum: { $ifNull: ['$applicants', 0] } }
          }
        }
      ]);
      totalApplications = applicationStats[0]?.totalApplications || 0;
    } catch (jobError) {
      console.warn('Job model not found or error fetching job data:', jobError);
    }

    const metrics = {
      employees: {
        total: employeeCount,
        active: activeEmployees,
        recentHires: recentHires
      },
      jobs: {
        total: totalJobs,
        active: activeJobs,
        totalApplications: totalApplications
      },
      projects: 1 
    };

    res.json(metrics);
  } catch (err) {
    console.error('Error fetching dashboard metrics:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const updateMetrics = async (req, res) => {
  try {
    const metrics = await Dashboard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(metrics);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getMetrics,
  updateMetrics
};