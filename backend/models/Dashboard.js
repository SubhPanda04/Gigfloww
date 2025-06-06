const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
  totalEmployees: {
    type: Number,
    default: 0,
  },
  openPositions: {
    type: Number,
    default: 0,
  },
  newHires: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Dashboard', DashboardSchema);