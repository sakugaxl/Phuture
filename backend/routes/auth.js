const express = require("express");
const axios = require("axios");
const router = express.Router();
const { db } = require("../utils/firebase");

// Google AdSense OAuth Route
router.get("/googleAdsense", (req, res) => {
  const { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } = process.env;
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=https://www.googleapis.com/auth/adsense.readonly&response_type=code`;
  res.redirect(authUrl);
});

router.get("/googleAdsense/callback", async (req, res) => {
  const { code } = req.query;
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;

  try {
    const response = await axios.post(`https://oauth2.googleapis.com/token`, {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      grant_type: "authorization_code",
      redirect_uri: GOOGLE_REDIRECT_URI,
      code,
    });

    const { access_token } = response.data;
    const userId = req.query.userId || "testUserId";

    await db.collection("users").doc(userId).set(
      {
        socialAccounts: {
          googleAdsense: { connected: true, accessToken: access_token },
        },
      },
      { merge: true }
    );

    res.redirect("http://localhost:3000/settings/integrations?connected=googleAdsense");
  } catch (error) {
    console.error("Error connecting to Google AdSense:", error);
    res.status(500).send("Error connecting to Google AdSense");
  }
});

// Facebook OAuth Route
router.get("/facebook", (req, res) => {
  const { FACEBOOK_APP_ID, FACEBOOK_REDIRECT_URI } = process.env;
  const authUrl = `https://www.facebook.com/v14.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${FACEBOOK_REDIRECT_URI}&scope=pages_manage_ads,pages_manage_metadata,pages_read_engagement,pages_read_user_content,ads_read`;
  res.redirect(authUrl);
});

router.get("/facebook/callback", async (req, res) => {
  const { code } = req.query;
  const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_REDIRECT_URI } = process.env;

  try {
    const response = await axios.get(`https://graph.facebook.com/v14.0/oauth/access_token`, {
      params: {
        client_id: FACEBOOK_APP_ID,
        client_secret: FACEBOOK_APP_SECRET,
        redirect_uri: FACEBOOK_REDIRECT_URI,
        code,
      },
    });

    const { access_token } = response.data;
    const userId = req.query.userId || "testUserId";

    await db.collection("users").doc(userId).set(
      {
        socialAccounts: {
          facebook: { connected: true, accessToken: access_token },
        },
      },
      { merge: true }
    );

    res.redirect("http://localhost:3000/settings/integrations?connected=facebook");
  } catch (error) {
    console.error("Error connecting to Facebook:", error);
    res.status(500).send("Error connecting to Facebook");
  }
});

// Instagram OAuth Route
router.get("/instagram", (req, res) => {
  const { INSTAGRAM_APP_ID, INSTAGRAM_REDIRECT_URI } = process.env;
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  res.redirect(authUrl);
});

router.get("/instagram/callback", async (req, res) => {
  const { code } = req.query;
  const { INSTAGRAM_APP_ID, INSTAGRAM_APP_SECRET, INSTAGRAM_REDIRECT_URI } = process.env;

  try {
    const response = await axios.post(`https://api.instagram.com/oauth/access_token`, {
      client_id: INSTAGRAM_APP_ID,
      client_secret: INSTAGRAM_APP_SECRET,
      grant_type: "authorization_code",
      redirect_uri: INSTAGRAM_REDIRECT_URI,
      code,
    });

    const { access_token } = response.data;
    const userId = req.query.userId || "testUserId";

    await db.collection("users").doc(userId).set(
      {
        socialAccounts: {
          instagram: { connected: true, accessToken: access_token },
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
