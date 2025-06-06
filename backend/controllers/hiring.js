const Job = require('../models/Job');

const createJob = async (req, res) => {
  try {
    const {
      role,
      skills,
      experience,
      employmentType,
      workplaceType,
      stipend,
      openings,
      description,
      links
    } = req.body;

    const job = new Job({
      title: role,
      skills: skills,
      experience: experience,
      employmentType: employmentType,
      workplaceType: workplaceType,
      salaryRange: stipend,
      openings: openings || 1,
      description: description,
      links: links,
      department: 'General',
      location: workplaceType || 'Remote',
      status: 'Active'
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(400).json({ message: 'Error creating job', error: err.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(400).json({ message: err.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ message: err.message });
  }
};

const getJobStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const activeJobs = await Job.countDocuments({ status: 'Active' });
    const totalApplications = await Job.aggregate([
      { $group: { _id: null, total: { $sum: '$applicants' } } }
    ]);

    res.json({
      totalJobs,
      activeJobs,
      totalApplications: totalApplications[0]?.total || 0
    });
  } catch (err) {
    console.error('Error fetching job stats:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getJobStats
};