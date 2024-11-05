const API_BASE_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL || '/api'
  : '/api';

class ApiService {
  readonly baseUrl = API_BASE_URL;

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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  }

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

  async getSocialInsights(): Promise<SocialInsights> {
    try {
      const response = await this.fetchWithAuth('/social/insights');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching social insights:', error);
      throw new Error('Failed to fetch social insights');
    }
  }

  // Add more API methods as needed
}

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