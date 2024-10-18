import React from "react";
import DashboardSidebar from "../..//components/Dashboard/DashboardSidebar";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../utils/helper";

const Dashboard: React.FC = () => {
  const token = getToken();
  if (!token) return <Navigate to="/login-company" />;

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <div className="mt-[3rem]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
