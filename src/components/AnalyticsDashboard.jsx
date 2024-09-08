import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AnalyticsDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // In a real application, you'd fetch this data from an API
    const generateData = () => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      return months.map(month => ({
        name: month,
        cost: Math.floor(Math.random() * 5000) + 3000,
        revenue: Math.floor(Math.random() * 10000) + 5000,
      }));
    };

    setData(generateData());
  }, []);

  const calculateTotal = (key) => {
    return data.reduce((sum, item) => sum + item[key], 0).toFixed(2);
  };

  const calculateChange = (key) => {
    if (data.length < 2) return 0;
    const currentMonth = data[data.length - 1][key];
    const previousMonth = data[data.length - 2][key];
    return (((currentMonth - previousMonth) / previousMonth) * 100).toFixed(2);
  };

  const MetricCard = ({ title, value, change }) => (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="text-2xl font-bold">${value}</div>
      <p className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center mt-2`}>
        {change >= 0 ? (
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        ) : (
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        )}
        {Math.abs(change)}%
      </p>
    </div>
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center bg-[#B8B5E8] w-[30%] mx-auto p-2 rounded-full">Analytics Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <MetricCard 
          title="Total Revenue" 
          value={calculateTotal('revenue')} 
          change={calculateChange('revenue')}
        />
        <MetricCard 
          title="Total Cost" 
          value={calculateTotal('cost')} 
          change={calculateChange('cost')}
        />
        <MetricCard 
          title="Net Profit" 
          value={(calculateTotal('revenue') - calculateTotal('cost')).toFixed(2)} 
          change={calculateChange('revenue') - calculateChange('cost')}
        />
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium mb-4">Revenue vs Cost - Last 6 Months</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="cost" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;