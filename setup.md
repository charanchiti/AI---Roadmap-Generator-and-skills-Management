# 🛠️ SkillSprint Setup Guide

Follow these steps to get your SkillSprint project up and running!

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Firebase account
- A Google AI Studio account (for Gemini API)

## 🔧 Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `skillsprint` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

#### Enable Authentication
1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Click "Email/Password" under "Sign-in method"
4. Enable it and click "Save"

#### Get Service Account Credentials
1. Click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Go to "Service accounts" tab
4. Click "Generate new private key"
5. Download the JSON file
6. **Keep this file secure!** It contains sensitive credentials

### 3. Google Gemini Configuration

#### Get API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (you won't see it again!)

### 4. Environment Configuration

#### Create .env File
```bash
# Copy the template
cp env.example .env

# Edit the file with your actual values
nano .env
```

#### Fill in Your Values
```env
# Google Gemini API Configuration
GEMINI_API_KEY=your_actual_gemini_api_key_here

# Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour actual private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com

# Server Configuration
PORT=3000
```

**Important Notes:**
- Replace `your_actual_gemini_api_key_here` with your actual Gemini API key
- Replace `your_firebase_project_id` with your actual Firebase project ID
- Copy the private key exactly as it appears in the downloaded JSON file
- Copy the client email exactly as it appears in the downloaded JSON file

### 5. Frontend Firebase Configuration

#### Update HTML File
1. Open `public/index.html`
2. Find the `firebaseConfig` object
3. Replace the placeholder values with your actual Firebase project config

To get these values:
1. In Firebase Console, click "Project settings"
2. Scroll down to "Your apps"
3. Click the web app icon (</>)
4. Register your app with a nickname
5. Copy the config values

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-actual-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-actual-sender-id",
    appId: "your-actual-app-id"
};
```

### 6. Test Your Setup

#### Start the Server
```bash
npm start
```

#### Check for Errors
Look for these success messages in your terminal:
```
✅ Firebase Admin SDK initialized successfully
🚀 SkillSprint server is running on http://localhost:3000
📚 Ready to generate learning roadmaps!
🔐 Firebase Auth and Google Gemini API integration active
```

#### Test the API
Visit `http://localhost:3000/api/health` in your browser. You should see:
```json
{
    "status": "OK",
    "message": "SkillSprint server is running!",
    "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 7. Test the Full Application

1. Open `http://localhost:3000` in your browser
2. Try to create an account with email/password
3. Test the roadmap generation feature

## 🚨 Common Issues & Solutions

### Firebase Admin SDK Error
```
❌ Firebase Admin SDK initialization failed
```
**Solution:** Check your `.env` file format. The private key should be on one line with `\n` characters.

### Gemini API Error
```
Error: Gemini API authentication failed
```
**Solution:** Verify your API key is correct and has sufficient credits.

### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```
**Solution:** Change the PORT in your `.env` file or kill the existing process.

### CORS Errors
**Solution:** Ensure your frontend is running on the same domain as your backend.

## ✅ Verification Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Firebase project created
- [ ] Authentication enabled (Email/Password)
- [ ] Service account credentials downloaded
- [ ] `.env` file created with all values
- [ ] Frontend Firebase config updated
- [ ] Server starts without errors
- [ ] Health endpoint responds correctly
- [ ] Frontend loads in browser
- [ ] User registration works
- [ ] Roadmap generation works

## 🎉 You're Ready!

Once all checks pass, your SkillSprint project is fully configured and ready to use! 

**Next Steps:**
- Customize the UI design
- Add more features
- Deploy to a hosting service
- Share with others

## 🆘 Need Help?

If you encounter issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure Firebase and Gemini services are properly configured
4. Check the troubleshooting section in the main README

Happy coding! 🚀
