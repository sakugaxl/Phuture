const API_BASE_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL || '/api'
  : '/api';

class ApiService {
  readonly baseUrl = API_BASE_URL;

  // Function to fetch data with authorization token
  private async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const token = localStorage.getItem('auth_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error response:', errorDetails);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  }

  // Fetch analytics data
  async getAnalytics(): Promise<AnalyticsResponse> {
    try {
      const response = await this.fetchWithAuth('/analytics');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw new Error('Failed to fetch analytics data');
    }
  }

  // Fetch marketing campaigns data
  async getCampaigns(): Promise<Campaign[]> {
    try {
      const response = await this.fetchWithAuth('/campaigns');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw new Error('Failed to fetch campaigns');
    }
  }

  // Fetch Instagram insights
  async getSocialInsights(): Promise<any> {
    try {
      const response = await this.fetchWithAuth('/auth/instagram/insights', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      return {
        impressions: data.data.find((metric: any) => metric.name === 'impressions')?.total_value?.value || 0,
        reach: data.data.find((metric: any) => metric.name === 'reach')?.total_value?.value || 0,
        profile_views: data.data.find((metric: any) => metric.name === 'profile_views')?.total_value?.value || 0,
      };
    } catch (error) {
      console.error('Error fetching social insights:', error);
      throw new Error('Failed to fetch social insights');
    }
  }
}

// Interfaces for data structure
export interface AnalyticsResponse {
  metrics: {
    totalRevenue: number;
    activeCampaigns: number;
    newClients: number;
    engagementRate: number;
  };
  trends: {
    revenue: { value: number; isPositive: boolean };
    campaigns: { value: number; isPositive: boolean };
    clients: { value: number; isPositive: boolean };
    engagement: { value: number; isPositive: boolean };
  };
}

export interface Campaign {
  id: number;
  name: string;
  platform: string;
  status: string;
  reach: string;
  engagement: string;
  conversions: number;
  spend: string;
  roi: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface SocialInsights {
  followers: number;
  engagement: number;
  posts: number;
  demographics: {
    age: Array<{ range: string; percentage: number }>;
    gender: Array<{ type: string; percentage: number }>;
  };
}

export const api = new ApiService();
