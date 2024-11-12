import React from 'react';

interface TotalSalaryProps {
  title: string;
  data: string;
  percentage?: string | undefined;
}

const CardShowDashboard: React.FC<TotalSalaryProps> = ({ title, data, percentage }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="text-3xl font-bold">{data}</p>
      {percentage &&<span className="text-sm text-gray-500">
       <span className={parseFloat(percentage) < 0 ? 'text-red-500' : 'text-green-500'}>
          {percentage}%
        </span>{' '}
        vs Previous Month
      </span>}
    </div>
  );
};

export default CardShowDashboard;
