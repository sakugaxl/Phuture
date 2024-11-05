import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ActiveCampaigns from '../ActiveCampaigns';
import { api } from '../../../services/api';

// Mock the API
jest.mock('../../../services/api');

describe('ActiveCampaigns', () => {
  const mockCampaigns = [
    {
      id: 1,
      name: 'Summer Sale 2024',
      platform: 'facebook',
      status: 'active',
      reach: '12.5K',
      engagement: '3.2K',
      conversions: 245,
      spend: 'R 2,500',
      roi: '2.4x'
    }
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  it('renders campaigns successfully', async () => {
    // Mock the API call
    (api.getCampaigns as jest.Mock).mockResolvedValue(mockCampaigns);

    render(<ActiveCampaigns />);

    // Check loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for campaigns to load
    await waitFor(() => {
      expect(screen.getByText('Summer Sale 2024')).toBeInTheDocument();
    });

    expect(screen.getByText('12.5K')).toBeInTheDocument();
    expect(screen.getByText('3.2K')).toBeInTheDocument();
  });

  it('handles error state', async () => {
    // Mock API error
    (api.getCampaigns as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    render(<ActiveCampaigns />);

    await waitFor(() => {
      expect(screen.getByText('Error loading campaigns')).toBeInTheDocument();
    });
  });
});