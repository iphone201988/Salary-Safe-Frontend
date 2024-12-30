import React, { /* useEffect,  */useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaCog,
  FaLock,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
// import axios from "axios";
// import { getcandidatesProfile } from "../../API/apis";
import { MdOutlineWork } from "react-icons/md";
import { VscFileSubmodule } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { clearUserData, /* setemployeDetails */ } from "../../Redux/reducer/userData";
import { logout } from "../../Redux/reducer/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
// import { candidateDetails } from "../../types";

// interface Data {
//   full_name: string;
// }

const DashboardSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [data, setData] = useState<Data | null>(null);
  // const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.auth.role);
  // const name = useSelector((state: RootState) => state.user.name);
  const { employeDetails } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(clearUserData());
    dispatch(logout());
    navigate("/login-employee");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // const handleFetch = async (): Promise<void> => {
  //   try {
  //     const response:any = await axios.get<candidateDetails>(getcandidatesProfile, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (response.data) {
  //       dispatch(setemployeDetails(response.data));
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.error("Error fetching data:", error.message);
  //     } else {
  //       console.error("Unexpected error:", error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   handleFetch();
  // }, []);

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
        } md:translate-x-0 md:static md:h-auto md:w-64`}
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
          <Link
            to={`/${role}/dashboard/job-list`}
            className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300"
          >
            <MdOutlineWork />
            <span>Jobs</span>
          </Link>
          <Link
            to={`/${role}/dashboard/submit-application`}
            className="flex items-center space-x-3 text-lg hover:text-[#019529] transition duration-300"
          >
            <VscFileSubmodule />
            <span>Submit Application</span>
          </Link>
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
            {employeDetails?.avatar ?(
            <img
            src={
              employeDetails?.avatar
                ? import.meta.env.VITE_STATIC_FILES_URL + employeDetails?.avatar
                : ""
            }
            alt="user-profile"
            className="w-16 h-16 border-2 border-black rounded-full object-cover"
            onError={(e:any) => {
              e.currentTarget.src = "../../assets/avatar.jpg";
            }}
          />):(
            <FaUserCircle className="text-4xl" />
          )}
            <span>{employeDetails?.full_name}</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
