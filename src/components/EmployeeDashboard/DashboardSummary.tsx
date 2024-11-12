import React from "react";
import CardShowDashboard from "../Dashboard/DashboardSummary/CardShowDashboard";
import MarketSalaryChart from "./Market-Salary/MarketSalary";
import HistoryOfRoles from "./HistroyRoles/HistoryRoles";

const DashboardSummary: React.FC = () => {
  return (
    <div className="h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Candidate Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <CardShowDashboard title="Job Title" data="Devlovper" />
          <CardShowDashboard title="Employment Type" data="Full-Time" />
          <CardShowDashboard
            title="Date"
            data={new Date().toISOString().split("T")[0]}
          />
          <CardShowDashboard title="Company" data="Techwin labs llp" />
          <CardShowDashboard
            title="Location and currency"
            data="Mohali , punjab"
          />
          <CardShowDashboard
            title="Your Salary Range"
            data="$5000"
            percentage="5.2"
          />
        </div>
        <div className="m-5">
          <MarketSalaryChart />
        </div>
        <HistoryOfRoles />
      </div>
    </div>
  );
};

export default DashboardSummary;
