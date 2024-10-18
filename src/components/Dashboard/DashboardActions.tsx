import React from 'react';

const DashboardActions: React.FC = () => {
  return (
    <div className="flex space-x-4 mt-6">
      <button className="bg-[#019529] text-white px-4 py-2 rounded-md hover:bg-[#017a22]">Generate Report</button>
      <button className="bg-[#019529] text-white px-4 py-2 rounded-md hover:bg-[#017a22]">Download Data</button>
    </div>
  );
};

export default DashboardActions;
