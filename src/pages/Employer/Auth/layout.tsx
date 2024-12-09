import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full p-3 min-h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
