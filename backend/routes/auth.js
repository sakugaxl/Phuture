// auth.js

const express = require('express');
const admin = require('firebase-admin');
const axios = require('axios');
const router = express.Router();

// Firestore instance from Firebase Admin SDK
const db = admin.firestore();

/**
 * Check if a social media account is connected for a given user and platform.
 * @param {string} userId - The ID of the user.
 * @param {string} platform - The name of the social media platform.
 * @returns {Promise<boolean>} - Connection status of the specified platform.
 */
async function isPlatformConnected(userId, platform) {
  const userDoc = db.collection('users').doc(userId);
  const userSnap = await userDoc.get();

  if (userSnap.exists) {
    const userData = userSnap.data();
    return userData.socialAccounts?.[platform]?.connected || false;
  }
  return false;
}

// Route to check connection status for a specific platform
router.get('/status/:platform', async (req, res) => {
  const { userId } = req.query;
  const { platform } = req.params;

  try {
    const isConnected = await isPlatformConnected(userId, platform);
    res.json({ isConnected });
  } catch (error) {
    console.error('Error fetching connection status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Redirect to Facebook OAuth
router.get('/facebook', (req, res) => {
  const { FACEBOOK_APP_ID, FACEBOOK_REDIRECT_URI } = process.env;
  const authUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${FACEBOOK_REDIRECT_URI}&scope=public_profile,email,pages_show_list,pages_read_engagement,pages_read_user_content`;
  res.redirect(authUrl);
});

// Facebook OAuth callback
router.get('/facebook/callback', async (req, res) => {
  const { code } = req.query;
  const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_REDIRECT_URI } = process.env;
  
  try {
    const tokenUrl = `https://graph.facebook.com/v12.0/oauth/access_token?client_id=${FACEBOOK_APP_ID}&redirect_uri=${FACEBOOK_REDIRECT_URI}&client_secret=${FACEBOOK_APP_SECRET}&code=${code}`;
    const response = await axios.get(tokenUrl);
    const { access_token } = response.data;

    // Store the access token in Firestore for the user
    await db.collection('users').doc(req.userId).set({
      socialAccounts: {
        facebook: {
          connected: true,
          accessToken: access_token,
        }
      }
    }, { merge: true });

    res.send("Facebook connected successfully!");
  } catch (error) {
    console.error('Error exchanging code for Facebook token:', error);
    res.status(500).send("Error connecting to Facebook");
  }
});

// Redirect to Instagram OAuth
router.get('/instagram', (req, res) => {
  const { INSTAGRAM_APP_ID, INSTAGRAM_REDIRECT_URI } = process.env;
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  res.redirect(authUrl);
});

// Instagram OAuth callback
router.get('/instagram/callback', async (req, res) => {
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

    // Store the access token in Firestore for the user
    await db.collection('users').doc(req.userId).set({
      socialAccounts: {
        instagram: {
          connected: true,
          accessToken: access_token,
          userId: user_id
        }
      }
    }, { merge: true });

    res.send("Instagram connected successfully!");
  } catch (error) {
    console.error('Error exchanging code for Instagram token:', error);
    res.status(500).send("Error connecting to Instagram");
  }
});

module.exports = router;
