import React from "react";
// import CountUp from "react-countup";
import HrDashboard from "./DashboardSummary/HrDashboard";

const DashboardSummary: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <HrDashboard/>
    </div>
  );
};

export default DashboardSummary;
