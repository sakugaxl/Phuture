// auth.js

const express = require('express');
const admin = require('firebase-admin');
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

// OAuth callback to store tokens after user connects their account
router.post('/callback/:platform', async (req, res) => {
  const { userId, accessToken, refreshToken, platformUserId } = req.body;
  const { platform } = req.params;

  try {
    const userDoc = db.collection('users').doc(userId);
    await userDoc.set(
      {
        socialAccounts: {
          [platform]: {
            connected: true,
            accessToken,
            refreshToken,
            platformUserId,
          },
        },
      },
      { merge: true }
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Error storing token:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
