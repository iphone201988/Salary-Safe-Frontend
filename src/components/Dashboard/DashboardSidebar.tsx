import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaFileAlt,
  FaChartLine,
  FaCog,
  FaLock,
  FaUserCircle,
  FaBars,
  FaBriefcase,
  FaUpload,
  FaUsers,
  FaChartBar,
  FaInfoCircle,
} from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import axios from "axios";
import { companyDetails } from "../../API/apis";
import { useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";
import {
  clearUserData,
  setemployeerDetails,
} from "../../Redux/reducer/userData";
import { logout } from "../../Redux/reducer/authSlice";
import { EmployeerDetails } from "../../types";

const DashboardSidebar: React.FC = () => {
  const token = useSelector((state: any) => state.auth.token);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.auth.role);
  const { employeerDetails } = useSelector((state: RootState) => state.user);
  const handleLogout = () => {
    localStorage.clear();
    if (role) {
      navigate(role === "employeer" ? "/login-company" : "/login-employee");
    }
    dispatch(clearUserData());
    dispatch(logout());
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleFetch = async (): Promise<void> => {
    try {
      const response = await axios.get<EmployeerDetails>(companyDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        dispatch(setemployeerDetails(response.data));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching data:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 border border-gray-300 rounded text-white md:hidden"
        onClick={toggleSidebar}
      >
        <FaBars className="text-black right-2" />
      </button>

      <aside
        onClick={() => setIsOpen(false)}
        className={`fixed top-0 right-0 h-full w-64 z-50 flex flex-col justify-between bg-gradient-to-b from-[#1B1035] to-[#120A2A] text-[#F5EDEF] shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:static md:h-auto md:w-64 overflow-auto hide-scrollbar`}
      >
        <nav className="flex flex-col p-6 space-y-6">
          <div className="flex p-6">
            <FaLock className="text-[#019529] text-3xl mr-3" />
            <h1 className="text-3xl font-bold text-[#F5EDEF]">Salary Safe</h1>
          </div>
          <Link
            to={`/${role}/dashboard`}
            className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300"
          >
            <FaChartPie />
            <span>Overview</span>
          </Link>

          {role === "employeer" && (
            <Link
              to={`/${role}/dashboard/job-listing`}
              className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300"
            >
              <FaBriefcase />
              <span>Job Listing</span>
            </Link>
          )}
          {/* {role === "employeer" && (
            <Link
              to={`/${role}/dashboard/internal-uploads`}
              className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300"
            >
              <FaUpload />
              <span>Salary Upload</span>
            </Link>
          )} */}
          {/* {role === "employeer" && (
            <Link
              to={`/${role}/dashboard/candidate-pool`}
              className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300"
            >
              <FaUsers />
              <span>Candidate Pool</span>
            </Link>
          )} */}
          {/* {role === "employeer" && (
            <Link
              to={`/${role}/dashboard/salary-analysis`}
              className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300"
            >
              <FaChartBar />
              <span>Salary Analysis</span>
            </Link>
          )} */}
          {/* {role === "employeer" && (
            <Link
              to={`/${role}/dashboard/reporting-insights-hub`}
              className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300"
            >
              <FaInfoCircle />
              <span>Reporting InsightsHub</span>
            </Link>
          )} */}

          {/* <Link
            to={`/${role}/dashboard/reports`}
            className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300"
          >
            <FaFileAlt />
            <span>Salary Reports</span>
          </Link> */}

          {/* <Link
            to={`/${role}/dashboard/analytics`}
            className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300"
          >
            <FaChartLine />
            <span>Analytics</span>
          </Link> */}

          <Link
            to={`/${role}/dashboard/settings`}
            className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300"
          >
            <FaCog />
            <span>Settings</span>
          </Link>
          <div
            onClick={handleLogout}
            className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300 cursor-pointer"
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
            <div>
              {employeerDetails && <FaUserCircle className="text-4xl" />}
            </div>
            <span>{employeerDetails?.company_name || "demo"}</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
