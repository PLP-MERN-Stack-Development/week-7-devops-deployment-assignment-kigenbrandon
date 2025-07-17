const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Bug title is required'],
    trim: true,
    maxlength: [100, 'Bug title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Bug description is required'],
    trim: true,
    maxlength: [1000, 'Bug description cannot exceed 1000 characters']
  },
  severity: {
    type: String,
    required: [true, 'Bug severity is required'],
    enum: {
      values: ['low', 'medium', 'high', 'critical'],
      message: 'Severity must be: low, medium, high, or critical'
    },
    default: 'medium'
  },
  status: {
    type: String,
    required: [true, 'Bug status is required'],
    enum: {
      values: ['open', 'in-progress', 'resolved', 'closed'],
      message: 'Status must be: open, in-progress, resolved, or closed'
    },
    default: 'open'
  },
  priority: {
    type: String,
    required: [true, 'Bug priority is required'],
    enum: {
      values: ['low', 'medium', 'high'],
      message: 'Priority must be: low, medium, or high'
    },
    default: 'medium'
  },
  assignedTo: {
    type: String,
    trim: true,
    maxlength: [50, 'Assigned to cannot exceed 50 characters']
  },
  reportedBy: {
    type: String,
    required: [true, 'Reporter is required'],
    trim: true,
    maxlength: [50, 'Reporter name cannot exceed 50 characters']
  },
  environment: {
    type: String,
    trim: true,
    maxlength: [100, 'Environment cannot exceed 100 characters']
  },
  stepsToReproduce: {
    type: String,
    trim: true,
    maxlength: [2000, 'Steps to reproduce cannot exceed 2000 characters']
  }
}, {
  timestamps: true
});

// Indexes for better query performance
bugSchema.index({ status: 1 });
bugSchema.index({ severity: 1 });
bugSchema.index({ priority: 1 });
bugSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Bug', bugSchema);