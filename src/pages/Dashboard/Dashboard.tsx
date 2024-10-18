import React from 'react';
import DashboardSidebar from '../..//components/Dashboard/DashboardSidebar';
// import DashboardSummary from '../../components/Dashboard/DashboardSummary';
// import DashboardCharts from '../../components/Dashboard/DashboardCharts';
import DashboardActions from '../../components/Dashboard/DashboardActions';
import { Outlet } from 'react-router-dom';
// import DashboardSettings from '../../components/Dashboard/DashboardSettings';
// import { Route, Routes } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-6 bg-gray-100">
        {/* <DashboardActions /> */}
      <Outlet/>
      </main>
    </div>
  );
};

export default Dashboard;
