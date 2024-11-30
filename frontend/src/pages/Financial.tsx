import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import TimeframeFilter from '../components/TimeframeFilter';
import FinancialChart from '../components/FinancialChart';
import ExpensesPieChart from '../components/ExpensesPieChart';
import { fetchFinancialData } from '../services/api';

export default function Financial() {
  const [timeframe, setTimeframe] = useState('monthly');
  const [financialData, setFinancialData] = useState<any[]>([]);
  const [expensesData, setExpensesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFinancialData = async () => {
      try {
        setLoading(true);
        const { financial, expenses } = await fetchFinancialData(timeframe);
        setFinancialData(financial);
        setExpensesData(expenses);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch financial data:', err);
        setError('Unable to load financial data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadFinancialData();
  }, [timeframe]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading financial data...</p>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

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
          value={`R ${financialData.reduce((acc, item) => acc + item.income, 0).toLocaleString()}`}
          icon={<DollarSign className="text-green-500" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <DashboardCard
          title="Monthly Expenses"
          value={`R ${financialData.reduce((acc, item) => acc + item.expenses, 0).toLocaleString()}`}
          icon={<CreditCard className="text-red-500" />}
          trend={{ value: 3.2, isPositive: false }}
        />
        <DashboardCard
          title="Net Profit"
          value={`R ${financialData.reduce((acc, item) => acc + item.profit, 0).toLocaleString()}`}
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
            {financialData.slice(-3).map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Transaction {index + 1}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <span className="text-red-600">- R {item.expenses.toLocaleString()}</span>
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
