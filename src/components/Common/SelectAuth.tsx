import React from "react";
import { /* useDispatch, */ useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import ImageLoader from "./ImageLoader";

const SelectAuth: React.FC = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const authType = useSelector(
    (state: RootState) => state.selectOption.authType
  );

  const handleClick = (role: string) => {
    const path = authType === "login" ? `/login-${role}` : `/signup-${role}`;
    navigate(path);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen">
      <div
        onClick={() => handleClick("company")}
        className="bg-white rounded-lg shadow-md p-8 w-3/4 md:w-1/3 m-2 cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
      >
        <h2 className="text-center mb-5 text-xl font-semibold text-gray-800">
          {authType === "login" ? "Login as Employer" : "Signup as Employer"}
        </h2>
        <ImageLoader
          src="https://images.pexels.com/photos/5699475/pexels-photo-5699475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Employer"
          className="rounded-lg w-full h-48 object-cover"
        />
      </div>
      <div
        onClick={() => handleClick("employee")}
        className="bg-white rounded-lg shadow-md p-8 w-3/4 md:w-1/3 m-2 cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
      >
        <h2 className="text-center mb-5 text-xl font-semibold text-gray-800">
          {authType === "login" ? "Login as Candidate" : "Signup as Candidate"}
        </h2>
        <ImageLoader
          src="https://images.pexels.com/photos/4226115/pexels-photo-4226115.jpeg"
          alt="Candidate"
          className="rounded-lg w-full h-48 object-cover"
        />
      </div>
    </div>
  );
};

export default SelectAuth;
