const express = require("express");
const axios = require("axios");
const router = express.Router();
const { db } = require("../utils/firebase");

// Function to check if a platform is connected for a user
async function isPlatformConnected(userId, platform) {
  const userDoc = db.collection("users").doc(userId);
  const userSnap = await userDoc.get();

  if (userSnap.exists) {
    const userData = userSnap.data();
    return userData.socialAccounts?.[platform]?.connected || false;
  }
  return false;
}

// Route to check connection status for a specific platform
router.get("/status/:platform", async (req, res) => {
  const { userId } = req.query;
  const { platform } = req.params;

  try {
    const isConnected = await isPlatformConnected(userId, platform);
    res.json({ isConnected });
  } catch (error) {
    console.error(`Error fetching ${platform} connection status:`, error);
    res.status(500).json({ error: "Server error" });
  }
});

// Instagram OAuth routes
router.get("/instagram", (req, res) => {
  const { INSTAGRAM_APP_ID, INSTAGRAM_REDIRECT_URI } = process.env;
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  res.redirect(authUrl);
});

router.get("/instagram/callback", async (req, res) => {
  const { code } = req.query;
  const { INSTAGRAM_APP_ID, INSTAGRAM_APP_SECRET, INSTAGRAM_REDIRECT_URI } = process.env;

  try {
    const tokenUrl = `https://api.instagram.com/oauth/access_token`;
    const response = await axios.post(tokenUrl, {
      client_id: INSTAGRAM_APP_ID,
      client_secret: INSTAGRAM_APP_SECRET,
      grant_type: "authorization_code",
      redirect_uri: INSTAGRAM_REDIRECT_URI,
      code,
    });

    const { access_token, user_id } = response.data;
    const userId = req.query.userId || "testUserId";

    await db.collection("users").doc(userId).set(
      {
        socialAccounts: {
          instagram: { connected: true, accessToken: access_token, userId: user_id },
        },
      },
      { merge: true }
    );

    res.redirect("http://localhost:3000/settings/integrations?connected=instagram");
  } catch (error) {
    console.error("Error connecting to Instagram:", error);
    res.status(500).send("Error connecting to Instagram");
  }
});

module.exports = router;
