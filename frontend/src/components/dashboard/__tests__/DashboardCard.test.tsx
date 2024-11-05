import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardCard from '../DashboardCard';
import { DollarSign } from 'lucide-react';

describe('DashboardCard', () => {
  it('renders card with all props', () => {
    render(
      <DashboardCard
        title="Total Revenue"
        value="R 125,430"
        icon={<DollarSign data-testid="dollar-icon" />}
        trend={{ value: 12.5, isPositive: true }}
      />
    );

    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('R 125,430')).toBeInTheDocument();
    expect(screen.getByTestId('dollar-icon')).toBeInTheDocument();
    expect(screen.getByText('12.5%')).toBeInTheDocument();
  });

  it('renders without trend data', () => {
    render(
      <DashboardCard
        title="Active Users"
        value="1,234"
        icon={<DollarSign data-testid="dollar-icon" />}
      />
    );

    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.queryByText('%')).not.toBeInTheDocument();
  });
});