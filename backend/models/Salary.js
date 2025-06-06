const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  employee: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  netSalary: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Paid'],
    default: 'Pending'
  },
  paymentDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Salary', salarySchema);