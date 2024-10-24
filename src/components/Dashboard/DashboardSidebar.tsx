import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaFileAlt,
  FaChartLine,
  FaCog,
  FaLock,
  FaUserCircle,
} from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";

const DashboardSidebar: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    localStorage.clear(); // Clear localStorage
    navigate("/login-company"); // Navigate to login page
  };
  return (
    <aside className="w-64 h-[100vh] flex flex-col  justify-between bg-gradient-to-b from-[#1B1035] to-[#120A2A] text-[#F5EDEF] shadow-lg">
      <nav className="flex flex-col p-6 space-y-6">
        <div className="flex p-6 animate-bounce">
          <FaLock className="text-[#019529] text-3xl mr-3" /> 
          <h1 className="text-3xl font-bold text-[#F5EDEF]">Salary Safe</h1>
        </div>
        <Link
          to="/dashboard"
          className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300"
        >
          <FaChartPie />
          <span>Overview</span>
        </Link>

        <Link
          to="/dashboard/reports"
          className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300"
        >
          <FaFileAlt />
          <span>Salary Reports</span>
        </Link>

        <Link
          to="/dashboard/analytics"
          className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300"
        >
          <FaChartLine />
          <span>Analytics</span>
        </Link>

        <Link
          to="/dashboard/settings"
          className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300"
        >
          <FaCog />
          <span>Settings</span>
        </Link>
        <div onClick={handleLogout}
          className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300"
        >
          <RiLogoutBoxRLine />
          <span>Logout</span>
        </div>
      </nav>
      <div className="flex items-center justify-center p-6 border-t border-[#38304B]">
        <Link
          to="#"
          className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300"
        >
          <FaUserCircle className="text-4xl" />
          <span>Rohit Kumar</span>
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
