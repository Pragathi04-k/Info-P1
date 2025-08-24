const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    repoLink: {
      type: String,
      required: true
    }
  },
  { timestamps: true } // adds createdAt and updatedAt
);

module.exports = mongoose.model('Project', projectSchema);
