import { api } from '../api';
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';

describe('API Service', () => {
  describe('getAnalytics', () => {
    it('should fetch analytics data successfully', async () => {
      const data = await api.getAnalytics();
      
      expect(data.metrics.totalRevenue).toBe(125430);
      expect(data.metrics.activeCampaigns).toBe(8);
      expect(data.metrics.newClients).toBe(24);
      expect(data.metrics.engagementRate).toBe(4.8);
    });

    it('should handle analytics fetch error', async () => {
      server.use(
        http.get('/api/analytics', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(api.getAnalytics()).rejects.toThrow('Failed to fetch analytics data');
    });
  });

  describe('getCampaigns', () => {
    it('should fetch campaigns successfully', async () => {
      const campaigns = await api.getCampaigns();
      
      expect(campaigns).toHaveLength(2);
      expect(campaigns[0].name).toBe('Summer Sale 2024');
      expect(campaigns[1].name).toBe('Product Launch');
    });

    it('should handle campaigns fetch error', async () => {
      server.use(
        http.get('/api/campaigns', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(api.getCampaigns()).rejects.toThrow('Failed to fetch campaigns');
    });
  });

  describe('getSocialInsights', () => {
    it('should fetch social insights successfully', async () => {
      const insights = await api.getSocialInsights();
      
      expect(insights.followers).toBe(24500);
      expect(insights.engagement).toBe(4.8);
      expect(insights.posts).toBe(128);
      expect(insights.demographics.age).toHaveLength(5);
      expect(insights.demographics.gender).toHaveLength(2);
    });

    it('should handle social insights fetch error', async () => {
      server.use(
        http.get('/api/social/insights', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(api.getSocialInsights()).rejects.toThrow('Failed to fetch social insights');
    });
  });
});