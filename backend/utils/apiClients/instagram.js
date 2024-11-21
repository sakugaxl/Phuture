const axios = require("axios");

const getInsights = async (accessToken) => {
  try {
    const url = `https://graph.instagram.com/me/insights`;
    const params = {
      metric: "follower_count,reach,impressions,profile_views,website_clicks",
      access_token: accessToken,
    };
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching Instagram insights:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = { getInsights };
