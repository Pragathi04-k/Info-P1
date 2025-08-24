const express = require('express');
const router = express.Router();
const Project = require('../Models/Project');

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
    const { userId, repoLink } = req.body;
    if (!userId || !repoLink) {
      return res.status(400).json({ error: 'userId and repoLink are required' });
    }

    const newProject = new Project({ userId, repoLink });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error('POST /projects error:', err);
    res.status(500).json({ error: 'Failed to add project' });
  }
});

module.exports = router;
