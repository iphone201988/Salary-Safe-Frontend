import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';  // Import icons

interface TotalSalaryProps {
  title: string;
  data: string | number;
  percentage?: string | undefined;
}

const CardShowDashboard: React.FC<TotalSalaryProps> = ({ title, data, percentage }) => {
  const percentageValue = parseFloat(percentage || "0"); // Default to 0 if no percentage is provided

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-lg font-[800]">{title}</h2>
      <p className="text-2xl font-[500]">{data}</p>

      {percentage && (
        <span className="text-sm text-gray-500">
          <span className={percentageValue < 0 ? 'text-red-500' : 'text-green-500'}>
            {percentageValue < 0 ? (
              <FaArrowDown className="inline-block mr-1" />
            ) : (
              <FaArrowUp className="inline-block mr-1" />
            )}
            {percentage}%
          </span>
          {' '}vs Previous Month
        </span>
      )}
    </div>
  );
};

export default CardShowDashboard;
