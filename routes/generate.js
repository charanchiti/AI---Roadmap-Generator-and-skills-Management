// SkillSprint - Roadmap Generation Routes
// This file handles the generation of personalized learning roadmaps using Google Gemini API
// Users must be authenticated (have valid Firebase token) to access these routes

const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { verifyToken } = require('./auth'); // Import the token verification middleware
const router = express.Router();

// Initialize Google Generative AI client with API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Route: POST /api/generate/roadmap
// This route generates a personalized learning roadmap based on skill name and time frame
// The verifyToken middleware ensures only authenticated users can access this route
router.post('/roadmap', verifyToken, async (req, res) => {
    try {
        // Extract data from request body
        const { skillName, numberOfDays } = req.body;
        
        // Get user info from the verified token (added by verifyToken middleware)
        const userEmail = req.user.email;
        const userId = req.user.uid;

        // Input validation
        if (!skillName || !numberOfDays) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Skill name and number of days are required'
            });
        }

        // Validate number of days (reasonable range for learning)
        if (numberOfDays < 1 || numberOfDays > 365) {
            return res.status(400).json({
                error: 'Invalid number of days',
                message: 'Please provide a number of days between 1 and 365'
            });
        }

        console.log(`🎯 Generating roadmap for user ${userEmail} - Skill: ${skillName}, Days: ${numberOfDays}`);

        // Create a structured JSON prompt so we can render a formatted roadmap with resources
        const prompt = `You are an expert learning coach.
Generate a JSON object ONLY (no markdown, no code fences, no commentary) for a beginner-friendly learning roadmap to master "${skillName}" in ${numberOfDays} days.

Strict JSON schema (all fields required):
{
  "title": string,
  "overview": string,
  "totalDays": number,
  "phases": [
    {
      "name": string,
      "durationDays": number,
      "goals": [string],
      "topics": [
        {
          "name": string,
          "resources": [{"name": string, "url": string}]
        }
      ],
      "milestones": [string]
    }
  ],
  "resources": {
    "websites": [{"name": string, "url": string}],
    "courses": [{"name": string, "url": string}],
    "videos": [{"name": string, "url": string}],
    "books": [{"name": string, "url": string}],
    "githubProjects": [{"name": string, "url": string}]
  },
  "projects": [string],
  "successMetrics": [string]
}

Guidelines:
- Keep it practical and achievable for ${numberOfDays} days
- Balance theory with hands-on exercises
- Ensure every topic includes at least 1-2 specific resources with working URLs
- Also include a general resources section for broader learning
- Make phase names and goals motivating
- Output VALID JSON ONLY.`;

        // Call Gemini API to generate the roadmap
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(prompt);

        // Extract the generated roadmap text from Gemini response
        const generatedText = result.response.text();

        // Try to parse JSON. Sometimes models wrap JSON in ```json fences – strip them first
        let roadmapStructured = null;
        try {
            const cleaned = generatedText
                .replace(/```json/gi, '')
                .replace(/```/g, '')
                .trim();
            roadmapStructured = JSON.parse(cleaned);
        } catch (parseError) {
            console.warn('Roadmap JSON parse failed, returning plain text fallback. Error:', parseError.message);
        }

        // Log successful generation
        console.log(`✅ Roadmap generated successfully for ${skillName} in ${numberOfDays} days`);

        // Send the generated roadmap back to the client
        res.json({
            success: true,
            message: `Learning roadmap generated for ${skillName}`,
            data: {
                skillName,
                numberOfDays,
                roadmap: generatedText, // raw text fallback
                roadmapStructured,      // preferred structured object for formatting
                generatedAt: new Date().toISOString(),
                userId,
                userEmail
            }
        });

    } catch (error) {
        console.error('❌ Roadmap generation error:', error);
        
        // Handle specific Gemini API errors
        if (error.message && error.message.includes('API_KEY_INVALID')) {
            return res.status(500).json({
                error: 'Gemini API authentication failed',
                message: 'Please check your Gemini API key configuration'
            });
        } else if (error.message && error.message.includes('QUOTA_EXCEEDED')) {
            return res.status(500).json({
                error: 'Gemini API quota exceeded',
                message: 'Please wait a moment before trying again or check your API usage limits'
            });
        }

        // Generic error response
        res.status(500).json({
            error: 'Roadmap generation failed',
            message: 'Something went wrong while generating your learning roadmap. Please try again.',
            details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// Route: GET /api/generate/skills
// This route provides a list of popular skills for users to choose from
// Useful for giving users ideas of what they can learn
router.get('/skills', verifyToken, (req, res) => {
    try {
        // Predefined list of popular skills for learning
        const popularSkills = [
            "JavaScript Programming",
            "Python Programming",
            "Web Development",
            "Data Science",
            "Machine Learning",
            "Mobile App Development",
            "UI/UX Design",
            "Digital Marketing",
            "Graphic Design",
            "Video Editing",
            "Photography",
            "Public Speaking",
            "Project Management",
            "Content Writing",
            "SEO (Search Engine Optimization)",
            "Social Media Marketing",
            "E-commerce",
            "Cybersecurity",
            "Cloud Computing",
            "DevOps"
        ];

        res.json({
            success: true,
            message: 'Popular skills retrieved successfully',
            data: {
                skills: popularSkills,
                count: popularSkills.length,
                note: 'These are suggestions - you can generate roadmaps for any skill!'
            }
        });

    } catch (error) {
        console.error('Skills retrieval error:', error);
        res.status(500).json({
            error: 'Skills retrieval failed',
            message: 'Something went wrong while retrieving skills list'
        });
    }
});

// Route: GET /api/generate/health
// Simple health check route for the generate service
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        service: 'SkillSprint Roadmap Generator',
        geminiConfigured: !!process.env.GEMINI_API_KEY,
        timestamp: new Date().toISOString()
    });
});

// Route: GET /api/generate/test-auth
// Test route to verify authentication is working
router.get('/test-auth', verifyToken, (req, res) => {
    res.json({
        status: 'OK',
        message: 'Authentication successful!',
        user: {
            uid: req.user.uid,
            email: req.user.email,
            emailVerified: req.user.email_verified
        },
        timestamp: new Date().toISOString()
    });
});

// Export the router
module.exports = router;
