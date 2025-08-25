const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const ProjectRouter = require('./Routes/ProjectRouter');
require('dotenv').config(); // must be at the top
require('./Models/db');

const app = express();
const PORT = process.env.PORT || 8080;

// Test route
app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Debug middleware: logs all incoming requests
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`, req.body);
    next();
});

// API routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/projects', ProjectRouter);

// 404 route
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
