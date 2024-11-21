const axios = require('axios');

const getInsights = async (accessToken) => {
  const url = `https://business-api.tiktokglobalshop.com/open_api/v1.2/ad/insights`;

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
};

module.exports = { getInsights };
