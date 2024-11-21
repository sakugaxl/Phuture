const express = require("express");
const { db } = require("../utils/firebase");
const instagramClient = require("../utils/apiClients/instagram"); // Instagram API Client
const router = express.Router();

router.get("/", async (req, res) => {
  const { userId } = req.query;

  try {
    // Fetch user data from Firestore
    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) return res.status(404).json({ error: "User not found" });

    const socialAccounts = userDoc.data().socialAccounts || {};
    const insights = {};

    // Instagram Insights
    if (socialAccounts.instagram?.connected) {
      insights.instagram = await instagramClient.getInsights(socialAccounts.instagram.accessToken);
    }

    // Add more social media logic here as clients are implemented

    res.json({ insights });
  } catch (error) {
    console.error("Error fetching insights:", error);
    res.status(500).json({ error: "Failed to fetch insights" });
  }
});

module.exports = router;
