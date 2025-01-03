import React from "react";
import DashboardSidebar from "../../../components/Dashboard/DashboardSidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard: React.FC = () => {
  const token = useSelector((state: any) => state.auth.token);
  if (!token) return <Navigate to="/login-company" />;

  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <main className="flex-1 bg-gray-100 overflow-y-auto">
        <div /* className="mt-[3rem]" */>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
