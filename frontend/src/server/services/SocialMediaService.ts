import { Facebook, Instagram, LinkedIn, TikTok } from '../integrations';
import { User } from '../models/User';
import { Analytics } from '../models/Analytics';
import { logger } from '../utils/logger';
import axios from 'axios';

export class SocialMediaService {
  private integrations = {
    facebook: new Facebook(),
    instagram: new Instagram(),
    linkedin: new LinkedIn(),
    tiktok: new TikTok(),
  };

  async connectPlatform(userId: string, platform: string, authCode: string) {
    try {
      if (!this.integrations[platform]) {
        throw new Error(`Unsupported platform: ${platform}`);
      }

      const { accessToken, refreshToken, platformUserId } =
        await this.integrations[platform].authenticate(authCode);

      await User.findByIdAndUpdate(userId, {
        $push: {
          socialAccounts: {
            platform,
            accessToken,
            refreshToken,
            platformUserId,
            connected: true,
          },
        },
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
      if (!user) {
        throw new Error('User not found');
      }

      const account = user.socialAccounts.find((acc) => acc.platform === platform);
      if (!account || !account.connected) {
        throw new Error(`${platform} account not connected`);
      }

      if (!this.integrations[platform]) {
        throw new Error(`Unsupported platform: ${platform}`);
      }

      const analyticsData = await this.integrations[platform].fetchAnalytics(
        account.accessToken,
        dateRange
      );

      await Analytics.create({
        userId,
        platform,
        date: new Date(),
        ...analyticsData,
      });

      return analyticsData;
    } catch (error) {
      logger.error(`Error fetching ${platform} analytics:`, error);
      throw error;
    }
  }
}
