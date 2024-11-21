const axios = require('axios');

const getInsights = async (accessToken) => {
  const url = `https://graph.facebook.com/v14.0/me/insights`;
  const metrics = ['page_impressions', 'page_engaged_users'];

  const response = await axios.get(url, {
    params: { metric: metrics.join(','), access_token: accessToken },
  });
  return response.data;
};

module.exports = { getInsights };
