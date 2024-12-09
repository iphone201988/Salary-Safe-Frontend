import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen ">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
