const express = require('express');
const admin = require('firebase-admin');
const axios = require('axios');
const router = express.Router();

const db = admin.firestore();

// Function to check if a platform is connected for a user
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
    const userDoc = db.collection('users').doc(userId);
    const userSnap = await userDoc.get();

    if (userSnap.exists) {
      const userData = userSnap.data();
      const isConnected = userData.socialAccounts?.[platform]?.connected || false;
      res.json({ isConnected });
    } else {
      res.json({ isConnected: false });
    }
  } catch (error) {
    console.error(`Error fetching ${platform} connection status:`, error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Instagram OAuth route
router.get('/instagram', (req, res) => {
  const { INSTAGRAM_APP_ID, INSTAGRAM_REDIRECT_URI } = process.env;
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  res.redirect(authUrl);
});

// Instagram OAuth callback to store the access token and user ID in Firestore
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

    const userId = req.query.userId || "testUserId";
    await db.collection('users').doc(userId).set({
      socialAccounts: {
        instagram: {
          connected: true,
          accessToken: access_token,
          userId: user_id,
        }
      }
    }, { merge: true });

    res.redirect('http://localhost:3000/settings/integrations?connected=instagram');
  } catch (error) {
    console.error('Error connecting to Instagram:', error);
    res.status(500).send("Error connecting to Instagram");
  }
});

// Route to fetch multiple Instagram metrics
router.get('/instagram/metrics', async (req, res) => {
  const { userId } = req.query;
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (userDoc.exists && userDoc.data().socialAccounts?.instagram?.accessToken) {
      const { accessToken } = userDoc.data().socialAccounts.instagram;

      const metricsUrl = `https://graph.instagram.com/me/insights?metric=follower_count,reach,impressions,profile_views,website_clicks&period=day&access_token=${accessToken}`;
      const metricsResponse = await axios.get(metricsUrl);
      const metrics = {
        followerCount: metricsResponse.data.data.find(metric => metric.name === 'follower_count').values[0].value,
        reach: metricsResponse.data.data.find(metric => metric.name === 'reach').values[0].value,
        impressions: metricsResponse.data.data.find(metric => metric.name === 'impressions').values[0].value,
        profileViews: metricsResponse.data.data.find(metric => metric.name === 'profile_views').values[0].value,
        websiteClicks: metricsResponse.data.data.find(metric => metric.name === 'website_clicks').values[0].value,
      };

      res.json(metrics);
    } else {
      res.status(404).send('Instagram account not connected');
    }
  } catch (error) {
    console.error('Error fetching Instagram metrics:', error);
    res.status(500).send('Error fetching Instagram metrics');
  }
});

// Route to fetch Instagram media insights (likes, comments, shares, saves)
router.get('/instagram/media/insights', async (req, res) => {
  const { userId } = req.query;
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (userDoc.exists && userDoc.data().socialAccounts?.instagram?.accessToken) {
      const { accessToken } = userDoc.data().socialAccounts.instagram;

      const mediaUrl = `https://graph.instagram.com/me/media?fields=id,caption&access_token=${accessToken}`;
      const mediaResponse = await axios.get(mediaUrl);

      const mediaInsights = await Promise.all(mediaResponse.data.data.map(async (media) => {
        const insightsUrl = `https://graph.instagram.com/${media.id}/insights?metric=impressions,reach,saved&access_token=${accessToken}`;
        const insightsResponse = await axios.get(insightsUrl);
        return {
          mediaId: media.id,
          caption: media.caption,
          engagement: insightsResponse.data.data.find(metric => metric.name === 'engagement').values[0].value,
          impressions: insightsResponse.data.data.find(metric => metric.name === 'impressions').values[0].value,
          reach: insightsResponse.data.data.find(metric => metric.name === 'reach').values[0].value,
          saved: insightsResponse.data.data.find(metric => metric.name === 'saved').values[0].value,
        };
      }));

      res.json({ mediaInsights });
    } else {
      res.status(404).send('Instagram account not connected');
    }
  } catch (error) {
    console.error('Error fetching Instagram media insights:', error);
    res.status(500).send('Error fetching Instagram media insights');
  }
});

module.exports = router;
