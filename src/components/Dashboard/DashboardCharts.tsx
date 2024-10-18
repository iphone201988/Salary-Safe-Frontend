import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Company A', salaryGap: 4000 },
  { name: 'Company B', salaryGap: 3000 },
  { name: 'Company C', salaryGap: 2000 },
];

const DashboardCharts: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Salary Analysis</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="salaryGap" fill="#019529" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardCharts;
