PhutureDigital API and Dashboard
This repository contains the backend API and frontend dashboard for pulling marketing insights from various social media platforms. The project uses Firebase for authentication and Firestore for data storage.

Table of Contents
Overview
Getting Started
Environment Variables
Backend .env
Frontend .env
Firebase Configuration
Setting Up Social Media API Credentials
Useful Links
Requesting Access
Overview
This project enables users to:

Authenticate via Firebase.
Connect their social media accounts (Instagram, Facebook, TikTok, LinkedIn, Twitter, Google AdSense/YouTube).
View marketing insights (e.g., reach, impressions, engagement).
Manage ad campaigns and posts (future features).
Getting Started
Follow these steps to set up the project locally:

Clone the repository:

bash
Copy code
git clone https://github.com/<your-repo-name>.git
cd <your-repo-name>
Install dependencies:

Backend:
bash
Copy code
cd backend
npm install
Frontend:
bash
Copy code
cd frontend
npm install
Obtain .env files and serviceAccountKey.json from the project owner and place them in their respective directories:

Backend: backend/.env
Frontend: frontend/.env
Firebase Admin Key: backend/serviceAccountKey.json
Start the development servers:

Backend:
bash
Copy code
cd backend
node server.js
Frontend:
bash
Copy code
cd frontend
npm run dev
Environment Variables
Backend .env
Place this file in the backend folder. Fill in the placeholders with the credentials provided to you:

env
Copy code
# Facebook and Instagram
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
FACEBOOK_REDIRECT_URI=http://localhost:5000/auth/facebook/callback
INSTAGRAM_APP_ID=
INSTAGRAM_APP_SECRET=
INSTAGRAM_REDIRECT_URI=http://localhost:5000/auth/instagram/callback

# TikTok
TIKTOK_APP_ID=
TIKTOK_APP_SECRET=
TIKTOK_REDIRECT_URI=http://localhost:5000/auth/tiktok/callback

# LinkedIn
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
LINKEDIN_REDIRECT_URI=http://localhost:5000/auth/linkedin/callback

# Twitter
TWITTER_API_KEY=
TWITTER_API_SECRET_KEY=
TWITTER_BEARER_TOKEN=
TWITTER_REDIRECT_URI=http://localhost:5000/auth/twitter/callback

# Google AdSense/YouTube
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback

# Firebase Admin
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
Frontend .env
Place this file in the frontend folder. Fill in the placeholders with the credentials provided to you:

env
Copy code
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
Firebase Configuration
The backend requires a Firebase Admin SDK key for authentication and database access. Place the serviceAccountKey.json file in the backend directory.

Setting Up Social Media API Credentials
Each platform requires an app with specific permissions. Use the links below to create apps and get the required credentials:

Meta (Facebook & Instagram):

Developer Console: https://developers.facebook.com/apps/
Documentation:
Facebook Login: https://developers.facebook.com/docs/facebook-login
Instagram Graph API: https://developers.facebook.com/docs/instagram-api
TikTok:

Developer Portal: https://developers.tiktok.com/
Login Kit Documentation: https://developers.tiktok.com/doc/login-kit-web
LinkedIn:

Developer Portal: https://www.linkedin.com/developers/
OAuth Documentation: https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow
Twitter:

Developer Platform: https://developer.twitter.com/
Documentation: https://developer.twitter.com/en/docs
Google (YouTube & AdSense):

API Console: https://console.cloud.google.com/
Documentation:
YouTube API: https://developers.google.com/youtube/registering_an_application
AdSense API: https://developers.google.com/adsense/management
Useful Links
Terms of Service: https://www.phuturedigital.co.za/terms-of-service.html
Privacy Policy: https://www.phuturedigital.co.za/privacy-policy.html
Requesting Access
If you need to be added as a developer or editor for the social media apps, follow these steps:

Meta (Facebook & Instagram):

Provide your Meta account email to the project owner.
Alternatively, share the App ID, and request access from your Meta account.
TikTok, LinkedIn, Twitter, Google:

Provide your email address to the project owner for addition.