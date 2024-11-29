const express = require("express");
const axios = require("axios");
const router = express.Router();
const { db } = require("../utils/firebase"); // Firebase Firestore instance

/**
 * Google AdSense OAuth Route
 * 
 * Redirects the user to Google's OAuth 2.0 consent screen to initiate
 * the authorization process for accessing Google AdSense data.
 * 
 * Required Environment Variables:
 * - GOOGLE_CLIENT_ID: The client ID for your Google OAuth application.
 * - GOOGLE_REDIRECT_URI: The redirect URI configured in Google Developer Console.
 */
router.get("/googleAdsense", (req, res) => {
  const { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } = process.env; // Fetch client ID and redirect URI from environment variables
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=https://www.googleapis.com/auth/adsense.readonly&response_type=code`;
  
  // Redirect the user to Google's OAuth consent screen
  res.redirect(authUrl);
});

/**
 * Google AdSense OAuth Callback
 * 
 * Handles the callback from Google's OAuth process after the user grants or denies access.
 * Exchanges the authorization code for an access token and saves it in Firestore.
 * 
 * Required Environment Variables:
 * - GOOGLE_CLIENT_ID: The client ID for your Google OAuth application.
 * - GOOGLE_CLIENT_SECRET: The client secret for your Google OAuth application.
 * - GOOGLE_REDIRECT_URI: The redirect URI configured in Google Developer Console.
 */
router.get("/googleAdsense/callback", async (req, res) => {
  const { code } = req.query; // The authorization code returned by Google
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env; // Fetch credentials from environment variables

  try {
    // Exchange the authorization code for an access token
    const tokenUrl = `https://oauth2.googleapis.com/token`;
    const response = await axios.post(tokenUrl, {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      grant_type: "authorization_code", // Specifies the OAuth 2.0 flow being used
      redirect_uri: GOOGLE_REDIRECT_URI,
      code, // Authorization code from the callback
    });

    const { access_token } = response.data; // Extract the access token from the response

    // Save the access token in Firestore under the user's socialAccounts
    const userId = req.query.userId || "testUserId"; // Replace with actual user authentication logic
    await db.collection("users").doc(userId).set(
      {
        socialAccounts: {
          googleAdsense: { 
            connected: true, // Mark the account as connected
            accessToken: access_token, // Store the access token for future API requests
          },
        },
      },
      { merge: true } // Merge with existing data to avoid overwriting
    );

    // Redirect the user to the integrations settings page on the frontend
    res.redirect("http://localhost:3000/settings/integrations?connected=googleAdsense");
  } catch (error) {
    console.error("Error connecting to Google AdSense:", error);
    // Send an error response if the token exchange or database operation fails
    res.status(500).send("Error connecting to Google AdSense");
  }
});

module.exports = router;
