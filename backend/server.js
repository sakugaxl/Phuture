// Firebase Admin Setup for Firestore
// Initialize Firebase Admin SDK to connect to Firestore using service account credentials
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Basic Express Server
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes); // Use auth routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Root Route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Instagram OAuth Routes [Endpoint]
app.get('/auth/instagram', (req, res) => {
  const { INSTAGRAM_APP_ID, REDIRECT_URI } = process.env;
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  res.redirect(authUrl);
});

// TikTok OAuth Route
app.get('/auth/tiktok', (req, res) => {
  const authUrl = `https://www.tiktok.com/auth/authorize/?client_id=${process.env.TIKTOK_APP_ID}&redirect_uri=${process.env.TIKTOK_REDIRECT_URI}&response_type=code&scope=user.info.basic`;
  res.redirect(authUrl);
});

// LinkedIn OAuth Route
app.get('/auth/linkedin', (req, res) => {
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_APP_ID}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}&scope=r_liteprofile%20r_emailaddress`;
  res.redirect(authUrl);
});

// Twitter OAuth Route
app.get('/auth/twitter', (req, res) => {
  const authUrl = `https://api.twitter.com/oauth2/authorize?client_id=${process.env.TWITTER_APP_ID}&redirect_uri=${process.env.TWITTER_REDIRECT_URI}&response_type=code&scope=tweet.read%20users.read`;
  res.redirect(authUrl);
});

// Facebook OAuth Route
app.get('/auth/facebook', (req, res) => {
  const authUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&scope=public_profile,email`;
  res.redirect(authUrl);
});

// Token Exchange Callback for Instagram
app.get('/auth/instagram/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const { INSTAGRAM_APP_ID, INSTAGRAM_APP_SECRET, REDIRECT_URI } = process.env;
    const tokenUrl = `https://api.instagram.com/oauth/access_token`;

    const response = await axios.post(tokenUrl, {
      client_id: INSTAGRAM_APP_ID,
      client_secret: INSTAGRAM_APP_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
      code,
    });

    const accessToken = response.data.access_token;
    // Handle storing accessToken securely
    res.send('Instagram connected successfully!');
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    res.status(500).send('Error connecting to Instagram');
  }
});

// Pull Instagram Insights
app.get('/instagram/insights', async (req, res) => {
  const accessToken = "RETRIEVE_USER_ACCESS_TOKEN_HERE"; // Replace with logic to get stored token

  try {
    const insightsUrl = `https://graph.instagram.com/me/insights?metric=impressions,reach,engagement&access_token=${accessToken}`;
    const response = await axios.get(insightsUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching insights:', error);
    res.status(500).send('Error retrieving Instagram insights');
  }
});
