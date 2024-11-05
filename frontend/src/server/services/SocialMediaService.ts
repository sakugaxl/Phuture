import { OAuth2Client } from 'google-auth-library';
import { Facebook, Instagram, LinkedIn, TikTok } from '../integrations';
import { User } from '../models/User';
import { Analytics } from '../models/Analytics';
import { logger } from '../utils/logger';

export class SocialMediaService {
  private fb: Facebook;
  private ig: Instagram;
  private li: LinkedIn;
  private tt: TikTok;

  constructor() {
    this.fb = new Facebook();
    this.ig = new Instagram();
    this.li = new LinkedIn();
    this.tt = new TikTok();
  }

  async connectPlatform(userId: string, platform: string, authCode: string) {
    try {
      let accessToken, refreshToken, platformUserId;

      switch (platform) {
        case 'facebook':
          ({ accessToken, refreshToken, platformUserId } = await this.fb.authenticate(authCode));
          break;
        case 'instagram':
          ({ accessToken, refreshToken, platformUserId } = await this.ig.authenticate(authCode));
          break;
        case 'linkedin':
          ({ accessToken, refreshToken, platformUserId } = await this.li.authenticate(authCode));
          break;
        case 'tiktok':
          ({ accessToken, refreshToken, platformUserId } = await this.tt.authenticate(authCode));
          break;
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }

      await User.findByIdAndUpdate(userId, {
        $push: {
          socialAccounts: {
            platform,
            accessToken,
            refreshToken,
            platformUserId,
            connected: true
          }
        }
      });

      return { success: true };
    } catch (error) {
      logger.error(`Error connecting ${platform}:`, error);
      throw error;
    }
  }

  async fetchAnalytics(userId: string, platform: string, dateRange: { start: Date; end: Date }) {
    try {
      const user = await User.findById(userId);
      const account = user.socialAccounts.find(acc => acc.platform === platform);

      if (!account || !account.connected) {
        throw new Error(`${platform} account not connected`);
      }

      let analyticsData;
      switch (platform) {
        case 'facebook':
          analyticsData = await this.fetchFacebookAnalytics(account.accessToken, dateRange);
          break;
        case 'instagram':
          analyticsData = await this.fetchInstagramAnalytics(account.accessToken, dateRange);
          break;
        case 'linkedin':
          analyticsData = await this.fetchLinkedInAnalytics(account.accessToken, dateRange);
          break;
        case 'tiktok':
          analyticsData = await this.fetchTikTokAnalytics(account.accessToken, dateRange);
          break;
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }

      await Analytics.create({
        userId,
        platform,
        date: new Date(),
        ...analyticsData
      });

      return analyticsData;
    } catch (error) {
      logger.error(`Error fetching ${platform} analytics:`, error);
      throw error;
    }
  }

  // Helper functions to fetch analytics for each platform
  private async fetchFacebookAnalytics(accessToken: string, dateRange: { start: Date; end: Date }) {
    const url = `https://graph.facebook.com/v12.0/me/insights?access_token=${accessToken}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      logger.error("Error fetching Facebook analytics:", error);
      throw error;
    }
  }

  private async fetchInstagramAnalytics(accessToken: string, dateRange: { start: Date; end: Date }) {
    const url = `https://graph.instagram.com/me/insights?access_token=${accessToken}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      logger.error("Error fetching Instagram analytics:", error);
      throw error;
    }
  }

  private async fetchLinkedInAnalytics(accessToken: string, dateRange: { start: Date; end: Date }) {
    const url = `https://api.linkedin.com/v2/analytics?access_token=${accessToken}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      logger.error("Error fetching LinkedIn analytics:", error);
      throw error;
    }
  }

  private async fetchTikTokAnalytics(accessToken: string, dateRange: { start: Date; end: Date }) {
    const url = `https://open-api.tiktok.com/analytics?access_token=${accessToken}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      logger.error("Error fetching TikTok analytics:", error);
      throw error;
    }
  }
}
