const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const ProjectRouter = require('./Routes/ProjectRouter');
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

// Test route
app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/projects', ProjectRouter);

// Serve React frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all route for React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});
