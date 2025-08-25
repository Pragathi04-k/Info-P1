const express = require('express');
const router = express.Router();
const Project = require('../Models/Project');
const mongoose = require('mongoose');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('GET /projects error:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// POST new project
router.post('/', async (req, res) => {
  try {
    const { userEmail, repoLink } = req.body;
    if (!userEmail || !repoLink) {
      return res.status(400).json({ error: 'userEmail and repoLink are required' });
    }

    const newProject = new Project({ userEmail, repoLink });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error('POST /projects error:', err);
    res.status(500).json({ error: 'Failed to add project' });
  }
});

// PUT update project status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'Status is required' });

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedProject) return res.status(404).json({ error: 'Project not found' });

    res.json(updatedProject);
  } catch (err) {
    console.error('PUT /projects/:id error:', err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) return res.status(404).json({ error: 'Project not found' });

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('DELETE /projects/:id error:', err);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
