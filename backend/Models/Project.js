const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: [true, 'User Email is required'],
      trim: true,
    },
    repoLink: {
      type: String,
      required: [true, 'Repository link is required'],
      trim: true,
      match: [
        /^(https?:\/\/)?(www\.)?github\.com\/.+\/.+$/,
        'Invalid GitHub repository link',
      ],
    },
    status: {
      type: String,
      enum: ['Pending', 'Active', 'Completed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
