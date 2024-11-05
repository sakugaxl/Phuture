import React, { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import TimeframeFilter from '../components/TimeframeFilter';
import FinancialChart from '../components/FinancialChart';
import ExpensesPieChart from '../components/ExpensesPieChart';

// Sample data - replace with actual API calls
const financialData = [
  { date: 'Jan', income: 150000, expenses: 45000, profit: 105000 },
  { date: 'Feb', income: 165000, expenses: 48000, profit: 117000 },
  { date: 'Mar', income: 180000, expenses: 52000, profit: 128000 },
  { date: 'Apr', income: 175000, expenses: 49000, profit: 126000 },
  { date: 'May', income: 190000, expenses: 55000, profit: 135000 },
  { date: 'Jun', income: 205000, expenses: 58000, profit: 147000 },
];

const expensesData = [
  { name: 'Marketing', value: 25000, color: '#3B82F6' },
  { name: 'Operations', value: 15000, color: '#10B981' },
  { name: 'Salaries', value: 35000, color: '#F59E0B' },
  { name: 'Software', value: 8000, color: '#6366F1' },
];

export default function Financial() {
  const [timeframe, setTimeframe] = useState('monthly');

  return (
    <>
      <header className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Overview</h1>
            <p className="mt-2 text-gray-600">Track your business finances and expenses</p>
          </div>
          <TimeframeFilter timeframe={timeframe} setTimeframe={setTimeframe} />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Monthly Revenue"
          value="R 125,430"
          icon={<DollarSign className="text-green-500" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <DashboardCard
          title="Monthly Expenses"
          value="R 45,230"
          icon={<CreditCard className="text-red-500" />}
          trend={{ value: 3.2, isPositive: false }}
        />
        <DashboardCard
          title="Net Profit"
          value="R 80,200"
          icon={<TrendingUp className="text-blue-500" />}
          trend={{ value: 15.8, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Financial Performance</h3>
              <button className="flex items-center text-blue-600 hover:text-blue-700">
                <span className="text-sm">Detailed Report</span>
                <ArrowUpRight size={16} className="ml-1" />
              </button>
            </div>
            <FinancialChart data={financialData} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Expense Breakdown</h3>
          <ExpensesPieChart data={expensesData} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Software License</p>
                  <p className="text-sm text-gray-500">March 15, 2024</p>
                </div>
                <span className="text-red-600">- R 2,500</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Status</h3>
          <div className="space-y-4">
            {expensesData.map((category) => (
              <div key={category.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">{category.name}</span>
                  <span className="text-sm text-gray-600">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: '75%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}