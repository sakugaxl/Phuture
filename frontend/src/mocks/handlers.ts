import { http, HttpResponse } from 'msw';

export const handlers = [
  // Analytics data
  http.get('/api/analytics', () => {
    return HttpResponse.json({
      metrics: {
        totalRevenue: 125430,
        activeCampaigns: 8,
        newClients: 24,
        engagementRate: 4.8
      },
      trends: {
        revenue: { value: 12.5, isPositive: true },
        campaigns: { value: 5, isPositive: true },
        clients: { value: 8, isPositive: true },
        engagement: { value: 0.5, isPositive: true }
      }
    });
  }),

  // Campaign data
  http.get('/api/campaigns', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Summer Sale 2024',
        platform: 'facebook',
        status: 'active',
        reach: '12.5K',
        engagement: '3.2K',
        conversions: 245,
        spend: 'R 2,500',
        roi: '2.4x',
        description: 'Seasonal promotion targeting summer fashion and accessories',
        startDate: '2024-03-01',
        endDate: '2024-03-31'
      },
      {
        id: 2,
        name: 'Product Launch',
        platform: 'instagram',
        status: 'active',
        reach: '8.7K',
        engagement: '1.8K',
        conversions: 156,
        spend: 'R 1,800',
        roi: '1.8x',
        description: 'New product line introduction campaign',
        startDate: '2024-03-10',
        endDate: '2024-04-10'
      },
      {
        id: 3,
        name: 'Brand Awareness',
        platform: 'linkedin',
        status: 'active',
        reach: '15.3K',
        engagement: '2.5K',
        conversions: 189,
        spend: 'R 3,200',
        roi: '2.1x',
        description: 'Corporate branding and thought leadership campaign',
        startDate: '2024-02-15',
        endDate: '2024-03-15'
      }
      {
        id: 3,
        name: 'Brand Awareness',
        platform: 'tiktok',
        status: 'active',
        reach: '15.3K',
        engagement: '2.5K',
        conversions: 189,
        spend: 'R 3,200',
        roi: '2.1x',
        description: 'Corporate branding and thought leadership campaign',
        startDate: '2024-02-15',
        endDate: '2024-03-15'
      }
    ]);
  }),

  // Social media insights
  http.get('/api/social/insights', () => {
    return HttpResponse.json({
      followers: 24500,
      engagement: 4.8,
      posts: 128,
      demographics: {
        age: [
          { range: '18-24', percentage: 20 },
          { range: '25-34', percentage: 35 },
          { range: '35-44', percentage: 25 },
          { range: '45-54', percentage: 15 },
          { range: '55+', percentage: 5 }
        ],
        gender: [
          { type: 'Male', percentage: 45 },
          { type: 'Female', percentage: 55 }
        ]
      }
    });
  })
];