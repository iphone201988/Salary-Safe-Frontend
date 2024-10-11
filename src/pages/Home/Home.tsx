import { useEffect, useState } from "react";
import { useNavigate, } from "react-router-dom";
import NavBar from "../../components/Navbar/Navbar";
const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking for an access token in localStorage
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
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

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar */}
     <NavBar />
      {/* Main Content */}
      <div className="w-full flex-grow flex justify-center items-center">
        <div className="max-w-max space-y-4">
          <h1 className="text-6xl">Welcome to Salary-Safe</h1>
          <p className="text-xl">
            Your trusted platform for transparent and fair salary management
          </p>
          <div className="flex justify-around items-center">
            {isLoggedIn ? (
              <button className="btn-primary text-white" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <a href="/signup-company" className="text-white">
                  <button className="btn-primary">Register Your Company</button>
                </a>
                <a href="/signup-employee" className="text-white">
                  <button className="btn-primary">Register as Employee</button>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
