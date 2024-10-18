import React from 'react';

const DashboardSummary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Summary Cards */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold">Average Salary Gap</h3>
        <p className="mt-2 text-gray-600">12%</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold">Pay Disparities</h3>
        <p className="mt-2 text-gray-600">$5,000 difference</p>
      </div>
    </div>
  );
};

export default DashboardSummary;
