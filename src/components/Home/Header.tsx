import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-[#1B1035] text-[#F5EDEF] p-5 flex justify-between items-center fixed top-0 w-full z-10">
      <div className="text-2xl font-bold">Salary-Safe</div>

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
        className={`sm:block ${
          isOpen ? "block" : "hidden"
        } absolute sm:relative top-16 sm:top-auto left-0 w-full sm:w-auto bg-[#1B1035] sm:bg-transparent`}
      >
        <ul className="flex flex-col sm:flex-row sm:space-x-6 text-center sm:text-left">
          <li>
            <Link
              to="/"
              className="block sm:inline-block p-4 sm:p-0 hover:text-[#019529]"
            >
              Home
            </Link>
          </li>
          <li>
          <Link
              to="/about"
              className="block sm:inline-block p-4 sm:p-0 hover:text-[#019529]"
            >
              About Us
            </Link>
          </li>
          <li>
          <Link
              to="/features"
              className="block sm:inline-block p-4 sm:p-0 hover:text-[#019529]"
            >
              Features
            </Link>
          </li>
          <li>
          <Link
              to="/request-demo"
              className="block sm:inline-block p-4 sm:p-0 hover:text-[#019529]"
            >
              Contact
            </Link>
          </li>
          <li>
          <Link
              to="/login-company"
              className="block sm:inline-block p-4 sm:p-0 hover:text-[#019529]"
            >
             Login
            </Link>
          </li>
          <li>
          <Link
              to="/signup-company"
              className="block sm:inline-block p-4 sm:p-0 hover:text-[#019529]"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
