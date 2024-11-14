// Firebase Admin Setup for Firestore
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Basic Express Server
require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS
const axios = require('axios');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' })); // Enable CORS for localhost:3000
app.use(express.json());
app.use('/auth', authRoutes); // Use auth routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Root Route to check if server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Instagram OAuth Route
app.get('/auth/instagram', (req, res) => {
  const { INSTAGRAM_APP_ID, INSTAGRAM_REDIRECT_URI } = process.env;
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  res.redirect(authUrl);
});

// Instagram OAuth Callback to exchange code for access token
app.get('/auth/instagram/callback', async (req, res) => {
  const { code } = req.query;
  const { INSTAGRAM_APP_ID, INSTAGRAM_APP_SECRET, INSTAGRAM_REDIRECT_URI } = process.env;

  try {
    const tokenUrl = `https://api.instagram.com/oauth/access_token`;
    const response = await axios.post(tokenUrl, {
      client_id: INSTAGRAM_APP_ID,
      client_secret: INSTAGRAM_APP_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: INSTAGRAM_REDIRECT_URI,
      code,
    });

    const { access_token, user_id } = response.data;

    // Store the access token and user ID in Firestore for retrieval
    const userId = req.query.userId || "testUserId"; // Replace with actual user ID logic
    await db.collection('users').doc(userId).set({
      socialAccounts: {
        instagram: {
          connected: true,
          accessToken: access_token,
          userId: user_id
        }
      }
    }, { merge: true });

    // Redirect to frontend after successful connection
    res.redirect('http://localhost:3000/settings/integrations?connected=instagram');
  } catch (error) {
    console.error('Error connecting to Instagram:', error);
    res.status(500).send("Error connecting to Instagram");
  }
});

module.exports = app;
