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
    <div className="flex flex-col md:flex-row justify-center items-center h-[100vh] md:h-screen max-720:p-5 max-720:m-auto">
      <div
        onClick={() => handleClick("company")}
        className="bg-white rounded-lg h-auto md:h-[500px] w-full max-w-[420px] shadow-md p-8 m-2 cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
      >
        <h2 className="text-center mb-5 text-xl font-semibold text-gray-800">
          {authType === "login" ? "Login as Employer" : "Signup as Employer"}
        </h2>
        <ImageLoader
          src="https://images.pexels.com/photos/5699475/pexels-photo-5699475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Employer"
          className="rounded-lg h-[200px] object-cover"
        />
      </div>
      <div
        onClick={() => handleClick("employee")}
        className="bg-white h-auto md:h-[500px] w-full max-w-[420px] rounded-lg shadow-md p-8 m-2 cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
      >
        <h2 className="text-center mb-5 text-xl font-semibold text-gray-800">
          {authType === "login" ? "Login as Candidate" : "Signup as Candidate"}
        </h2>
        <ImageLoader
          src="https://images.pexels.com/photos/4226115/pexels-photo-4226115.jpeg"
          alt="Candidate"
          className="rounded-lg h-[200px] object-cover"
        />
      </div>
    </div>
  );
};

export default SelectAuth;
