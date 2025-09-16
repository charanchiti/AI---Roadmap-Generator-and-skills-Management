# SkillSprint - AI-Powered Learning Roadmap Generator

A simple, beginner-friendly Node.js + Express project that generates personalized learning roadmaps using Google Gemini API and Firebase Authentication. Perfect for resume projects and learning full-stack development!

## Features

- **Firebase Authentication** - Secure user login/signup system
- **Google Gemini AI Integration** - AI-powered personalized learning roadmaps
- **Responsive Design** - Modern, mobile-friendly UI
- **Simple Architecture** - Clean, well-commented code perfect for interviews
- **Protected Routes** - Token-based authentication for API endpoints

## Project Structure

```
skillsprint/
├── server.js              # Main Express server entry point
├── routes/
│   ├── auth.js           # Authentication routes (login/signup)
│   └── generate.js       # Roadmap generation routes
├── public/
│   └── index.html        # Frontend interface
├── package.json          # Dependencies and scripts
├── env.example           # Environment variables template
└── README.md            # This file
```

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd skillsprint

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy the environment template
cp env.example .env

# Edit .env with your actual API keys
nano .env
```

**Required Environment Variables:**
```env
# Google Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com

# Server Configuration
PORT=3000
```

### 3. Firebase Setup

1. **Create Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)

2. **Get Admin SDK Credentials:**
   - Go to Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Download the JSON file
   - Copy the values to your `.env` file

3. **Update Frontend Config:**
   - In `public/index.html`, replace the Firebase config with your project details

### 4. Google Gemini Setup

1. **Get API Key:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the key and add it to your `.env` file

### 5. Run the Application

```bash
# Start the server
npm start

# Or for development with auto-reload
npm run dev
```

Open your browser and visit: **http://localhost:3000**

##  How It Works

### Backend Flow
1. **Server Setup** (`server.js`):
   - Express server with middleware
   - Route mounting (`/api/auth`, `/api/generate`)
   - Static file serving

2. **Authentication** (`routes/auth.js`):
   - Firebase Admin SDK initialization
   - Token verification middleware
   - Login/signup endpoints

3. **Roadmap Generation** (`routes/generate.js`):
   - Google Gemini API integration
   - Protected routes (require authentication)
   - Customized learning roadmap prompts

### Frontend Flow
1. **User Authentication**:
   - Firebase Auth integration
   - Login/signup forms
   - Token management

2. **Roadmap Generation**:
   - Skill name and time frame input
   - API calls to backend
   - Display generated roadmaps

## 🔧 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /login` - User login
- `POST /signup` - User registration
- `GET /verify` - Token verification

### Generation Routes (`/api/generate`)
- `POST /roadmap` - Generate learning roadmap
- `GET /skills` - Get popular skills list
- `GET /health` - Service health check

## Learning Concepts Demonstrated

This project showcases several important web development concepts:

- **Express.js Framework** - RESTful API development
- **Middleware** - Authentication, CORS, body parsing
- **Environment Variables** - Secure configuration management
- **Firebase Integration** - User authentication and security
- **Google Gemini API** - Third-party AI service integration
- **Frontend-Backend Communication** - AJAX/fetch API calls
- **Token-based Authentication** - JWT-like security
- **Error Handling** - Comprehensive error management
- **Responsive Design** - Mobile-first CSS approach

## Customization Ideas

Make this project your own by adding:

- **Database Integration** - Save roadmaps to MongoDB/PostgreSQL
- **User Profiles** - Track learning progress
- **Social Features** - Share roadmaps with friends
- **Progress Tracking** - Mark completed milestones
- **Export Options** - PDF/CSV roadmap downloads
- **Multiple AI Models** - Choose between different Gemini models

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Admin SDK Error:**
   - Check your service account credentials
   - Ensure private key is properly formatted in `.env`

2. **Gemini API Error:**
   - Verify your API key is correct
   - Check API usage limits and billing

3. **Port Already in Use:**
   - Change PORT in `.env` file
   - Kill existing processes: `lsof -ti:3000 | xargs kill`

4. **CORS Issues:**
   - Ensure frontend and backend URLs match
   - Check browser console for CORS errors

### Debug Mode

```bash
# Enable debug logging
NODE_ENV=development npm start
```

## Interview Talking Points

When discussing this project in interviews, highlight:

- **Full-Stack Development**: Both frontend and backend implementation
- **AI Integration**: Google Gemini API for intelligent content generation
- **Security**: Token-based authentication and input validation
- **Scalability**: Modular route structure and middleware
- **User Experience**: Responsive design and error handling
- **Best Practices**: Environment variables, error handling, logging

## Contributing

This is a learning project, but feel free to:
- Report bugs
- Suggest improvements
- Add new features
- Improve documentation

## License

MIT License - Feel free to use this project for learning and portfolio purposes!

##  Acknowledgments

- **Google** for the Gemini AI API
- **Firebase** for authentication services
- **Express.js** team for the web framework
- **Node.js** community for the runtime environment

---

**Happy Learning! 🚀**

*Built with ❤️ for developers learning full-stack development*
