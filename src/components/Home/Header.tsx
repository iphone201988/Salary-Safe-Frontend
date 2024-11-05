import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { clearUserData } from "../../Redux/reducer/userData";
import { logout } from "../../Redux/reducer/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { setSelectOption } from "../../Redux/reducer/selectOption";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.auth.role);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const homePage = () => {
    navigate("/");
  };
  const handleLoginSignup = (type:number|string) => {
    return () => {
      dispatch(setSelectOption({ authType: type }));
      navigate("/auth");
    };

  };

  const linkClasses = (path: string) =>
    `block p-4 ${
      location.pathname === path ? "text-[#019529]" : "hover:text-[#019529]"
    }`;

  return (
    <header className="bg-[#1B1035] text-[#F5EDEF] p-5 flex justify-between items-center fixed top-0 w-full z-10 shadow-lg ">
      <div onClick={homePage} className="text-2xl font-bold cursor-pointer">
        Salary-Safe
      </div>

      {/* Hamburger Icon for Mobile */}
      <button
        className="block sm:hidden text-[#F5EDEF]"
        onClick={toggleMenu}
        aria-label="Toggle Navigation"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          ></path>
        </svg>
      </button>

      {/* Navigation Menu */}
      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } sm:flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-0 sm:static absolute top-full left-0 w-full sm:w-auto bg-[#1B1035] sm:bg-transparent`}
      >
        <ul className="flex flex-col sm:flex-row sm:space-x-6 text-center sm:text-left w-full sm:w-auto">
          <li>
            <Link to="/" className={linkClasses("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={linkClasses("/about")}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/features" className={linkClasses("/features")}>
              Features
            </Link>
          </li>
          <li>
            <Link to="/request-demo" className={linkClasses("/request-demo")}>
              Contact
            </Link>
          </li>

          {/* Auth Links */}
          {role === "candidate" || role === "employeer" ? (
            <>
              <li>
                <Link
                  to={`/${role}/dashboard`}
                  className={linkClasses(`/${role}/dashboard`)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  className="block p-4 text-[#F5EDEF] hover:text-[#019529]"
                  onClick={() => {
                    localStorage.removeItem("access_token");
                    dispatch(clearUserData());
                    dispatch(logout());
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
            <li>
              <div
                onClick={handleLoginSignup("signup")}
                className="block p-4 cursor-pointer hover:text-[#019529]"
              >
                Sign Up
              </div>
            </li>
            <li>
              <div
                onClick={handleLoginSignup("login")}
                className="block p-4 border border-[#F5EDEF] rounded cursor-pointer hover:bg-[#F5EDEF] hover:text-[#1B1035]"
              >
                Login
              </div>
            </li>
          </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
