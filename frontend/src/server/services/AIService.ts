import { Analytics } from '../models/Analytics';
import { Campaign } from '../models/Campaign';
import { logger } from '../utils/logger';

export class AIService {
  async generateRecommendations(userId: string) {
    try {
      // Fetch recent analytics data
      const recentAnalytics = await Analytics.find({ userId })
        .sort({ date: -1 })
        .limit(30);

      // Fetch active campaigns
      const activeCampaigns = await Campaign.find({
        userId,
        status: 'active',
      });

      if (!recentAnalytics.length && !activeCampaigns.length) {
        logger.warn('No data available to generate recommendations');
        return {
          performance: null,
          audience: null,
          campaigns: null,
        };
      }

      // Generate insights based on data analysis
      const insights = this.analyzeData(recentAnalytics, activeCampaigns);

      return insights;
    } catch (error) {
      logger.error('Error generating AI recommendations:', error);
      throw error;
    }
  }

  private analyzeData(analytics: any[], campaigns: any[]) {
    // Analyze and compile insights
    return {
      performance: this.analyzePerformance(analytics),
      audience: this.analyzeAudience(analytics),
      campaigns: this.analyzeCampaigns(campaigns),
    };
  }

  // Performance Analysis
  private analyzePerformance(analytics: any[]) {
    const trend = this.calculateTrend(analytics);
    const recommendations = this.generatePerformanceRecommendations(analytics);

    return {
      trend,
      recommendations,
    };
  }

  private calculateTrend(analytics: any[]) {
    if (!analytics.length) return { current: 0, previous: 0, change: 0 };

    const current = analytics[0]?.metrics?.engagement || 0;
    const previous = analytics[analytics.length - 1]?.metrics?.engagement || 0;
    const change = ((current - previous) / (previous || 1)) * 100;

    return {
      current,
      previous,
      change: parseFloat(change.toFixed(2)),
    };
  }

  private generatePerformanceRecommendations(analytics: any[]) {
    if (!analytics.length) return ['Collect more data for better insights'];

    // Example recommendation logic
    const recommendations = [];
    if (analytics.some((a) => a.metrics.engagement < 2)) {
      recommendations.push('Improve engagement with targeted campaigns.');
    }
    if (analytics.some((a) => a.metrics.reach < 500)) {
      recommendations.push('Increase reach through collaborations.');
    }

    return recommendations;
  }

  // Audience Analysis
  private analyzeAudience(analytics: any[]) {
    const demographics = this.extractDemographics(analytics);
    const recommendations = this.generateAudienceRecommendations(demographics);

    return {
      demographics,
      recommendations,
    };
  }

  private extractDemographics(analytics: any[]) {
    const demographics = {
      ageGroups: {},
      gender: { male: 0, female: 0 },
    };

    analytics.forEach((entry) => {
      entry.demographics.age?.forEach((age) => {
        demographics.ageGroups[age.range] =
          (demographics.ageGroups[age.range] || 0) + age.percentage;
      });
      entry.demographics.gender?.forEach((gender) => {
        demographics.gender[gender.type.toLowerCase()] += gender.percentage;
      });
    });

    return demographics;
  }

  private generateAudienceRecommendations(demographics: any) {
    const recommendations = [];
    if (demographics.gender.female > demographics.gender.male) {
      recommendations.push('Focus on female-oriented campaigns.');
    }
    if (Object.keys(demographics.ageGroups).includes('18-24')) {
      recommendations.push('Target younger audiences with dynamic content.');
    }

    return recommendations;
  }

  // Campaign Analysis
  private analyzeCampaigns(campaigns: any[]) {
    const topPerforming = campaigns
      .filter((c) => parseFloat(c.roi) > 2)
      .map((c) => ({ name: c.name, roi: c.roi }));
    const underperforming = campaigns
      .filter((c) => parseFloat(c.roi) <= 1)
      .map((c) => ({ name: c.name, roi: c.roi }));

    const recommendations = this.generateCampaignRecommendations(campaigns);

    return {
      topPerforming,
      underperforming,
      recommendations,
    };
  }

  private generateCampaignRecommendations(campaigns: any[]) {
    const recommendations = [];
    if (campaigns.some((c) => parseFloat(c.roi) <= 1)) {
      recommendations.push('Reallocate budget from underperforming campaigns.');
    }
    if (campaigns.some((c) => parseFloat(c.engagement) > 5000)) {
      recommendations.push('Increase spend on high-engagement campaigns.');
    }

    return recommendations;
  }
}
