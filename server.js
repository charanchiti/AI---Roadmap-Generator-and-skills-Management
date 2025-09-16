// SkillSprint - Main Server File
// This is the entry point of our application that sets up Express server and connects all routes

// Import required modules
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

// Import our custom route files
const authRoutes = require('./routes/auth');
const generateRoutes = require('./routes/generate');

// Create Express application instance
const app = express();

// Get port from environment variables or use default
const PORT = process.env.PORT || 3000;

// Middleware Setup
// CORS allows our frontend to communicate with our backend
app.use(cors());

// Parse JSON bodies from incoming requests
app.use(express.json());

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' folder (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route Setup
// Mount our API routes under /api prefix
app.use('/api/auth', authRoutes);        // Authentication routes (login/signup)
app.use('/api/generate', generateRoutes); // Roadmap generation routes

// Basic route to test if server is running
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'SkillSprint server is running!',
        timestamp: new Date().toISOString()
    });
});

// Catch-all route for any unmatched requests - serve the main HTML file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware - catches any errors thrown in our routes
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ 
        error: 'Something went wrong on the server!',
        message: err.message 
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 SkillSprint server is running on http://localhost:${PORT}`);
    console.log(`📚 Ready to generate learning roadmaps!`);
    console.log(`🔐 Firebase Auth and Google Gemini API integration active`);
});

// Export app for testing purposes (if needed)
module.exports = app;
