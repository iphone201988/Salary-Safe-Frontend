// NavBar.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

interface NavBarProps {
  // You can extend this interface if you need to pass more props in the future.
}

const NavBar: React.FC<NavBarProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null); // Specify the type
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking for an access token in localStorage
    const token = localStorage.getItem("access_token");
    const role:string|null = localStorage.getItem("role");
    setIsLoggedIn(!!token); // Set logged-in state based on token presence
    setRole(role);
  }, []);

  const handleLogout = () => {
    let role = localStorage.getItem("role");
    navigate(role === "company" ? "/login-company" : "/login-employee");
    // Clear the token from localStorage and reset login state
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    setIsLoggedIn(false);
  };

  const handleLoginDropdown = () => {
    setShowRegisterDropdown(false)
    setShowLoginDropdown(!showLoginDropdown)
  };
  const handleRegisterDropdown = () => {
    setShowLoginDropdown(false)
    setShowRegisterDropdown(!showRegisterDropdown)
  };

  return (
    <nav className="w-full bg-gray-800 text-white p-4 flex justify-between items-center fixed">
      <div className="flex justify-between w-full items-center space-x-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold">
            <img src={logo} alt="Salary-Safe Logo" className="w-10 h-10" />
          </Link>
          <Link to="/" className="text-2xl font-bold">
            Salary-Safe
          </Link>
        </div>
        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
            {/* Login/Register Dropdowns */}
            {!isLoggedIn && (
            <>
              <div className="relative">
                <button
                  onClick={handleLoginDropdown}
                  className="hover:text-gray-300"
                >
                  Login
                </button>
                {showLoginDropdown && (
                  <div className="absolute bg-gray-700 rounded shadow-lg mt-2 p-2">
                    <Link to="/login-employee" className="block hover:text-gray-300">
                      Login as Employee
                    </Link>
                    <Link to="/login-company" className="block hover:text-gray-300">
                      Login as Company
                    </Link>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={handleRegisterDropdown}
                  className="hover:text-gray-300"
                >
                  Register
                </button>
                {showRegisterDropdown && (
                  <div className="absolute bg-gray-700 rounded shadow-lg mt-2 p-2">
                    <Link to="/signup-employee" className="block hover:text-gray-300">
                      Register as Employee
                    </Link>
                    <Link to="/signup-company" className="block hover:text-gray-300">
                      Register Your Company
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          {/* Conditionally render Jobs link */}
          {isLoggedIn && role === "company" && ( // Fixing the conditional rendering
            <Link to="/jobs" className="hover:text-gray-300">
              Jobs
            </Link>
          )}
          <Link to="/product" className="hover:text-gray-300">
            Product
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          {/* Logout Button */}
          {isLoggedIn && (
            <button onClick={handleLogout} className="btn-primary text-white">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
