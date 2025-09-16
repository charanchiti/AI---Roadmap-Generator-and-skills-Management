// SkillSprint - Authentication Routes
// This file handles user authentication (login/signup) using Firebase Authentication
// We'll use Firebase Admin SDK to verify user tokens and manage authentication

const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// Initialize Firebase Admin SDK if not already initialized
// This should be done in a separate config file in production, but keeping it simple here
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            }),
        });
        console.log('✅ Firebase Admin SDK initialized successfully');
    } catch (error) {
        console.error('❌ Firebase Admin SDK initialization failed:', error);
    }
}

// Middleware to verify Firebase ID token
// This function checks if the user is authenticated before allowing access to protected routes
const verifyToken = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                error: 'No token provided or invalid format',
                message: 'Please provide a valid Firebase ID token in Authorization header'
            });
        }

        // Extract the token (remove 'Bearer ' prefix)
        const token = authHeader.split('Bearer ')[1];
        
        // Verify the token with Firebase Admin SDK
        const decodedToken = await admin.auth().verifyIdToken(token);
        
        // Add user info to request object for use in other middleware/routes
        req.user = decodedToken;
        
        // Continue to the next middleware/route
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ 
            error: 'Invalid or expired token',
            message: 'Please login again to get a fresh token'
        });
    }
};

// Route: POST /api/auth/login
// This route handles user login
// In a real app, you'd use Firebase Auth on the frontend, but for demo purposes
// we'll show how to verify tokens
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({
                error: 'Missing credentials',
                message: 'Email and password are required'
            });
        }

        // In a real application, you would use Firebase Auth on the frontend
        // This route is mainly for demonstration purposes
        // The actual authentication happens on the client side with Firebase Auth
        
        res.json({
            message: 'Login endpoint reached',
            note: 'Use Firebase Auth on frontend to get ID token, then send it in Authorization header',
            example: 'Authorization: Bearer <firebase_id_token>'
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            error: 'Login failed',
            message: 'Something went wrong during login'
        });
    }
});

// Route: POST /api/auth/signup
// This route handles user registration
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({
                error: 'Missing credentials',
                message: 'Email and password are required'
            });
        }

        // In a real application, you would use Firebase Auth on the frontend
        // This route is mainly for demonstration purposes
        
        res.json({
            message: 'Signup endpoint reached',
            note: 'Use Firebase Auth on frontend to create account, then send ID token in Authorization header',
            example: 'Authorization: Bearer <firebase_id_token>'
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            error: 'Signup failed',
            message: 'Something went wrong during signup'
        });
    }
});

// Route: GET /api/auth/verify
// This route verifies if a user's token is valid
// Useful for checking if user is still logged in
router.get('/verify', verifyToken, (req, res) => {
    try {
        // If we reach here, the token is valid
        res.json({
            message: 'Token is valid',
            user: {
                uid: req.user.uid,
                email: req.user.email,
                emailVerified: req.user.email_verified
            }
        });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({
            error: 'Verification failed',
            message: 'Something went wrong during token verification'
        });
    }
});

// Export the router and verifyToken middleware
// verifyToken can be imported and used in other route files
module.exports = router;
module.exports.verifyToken = verifyToken;
