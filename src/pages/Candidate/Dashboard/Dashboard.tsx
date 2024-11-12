import React from "react";
import DashboardSidebar from "../../../components/EmployeeDashboard/DashboardSidebar";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";

const Dashboard: React.FC = () => {
  const token = useSelector((state:RootState ) => state.auth.token);
  const role = useSelector((state:RootState ) => state.auth.role);
  if (!token ||!role) return <Navigate to="/" />;

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
