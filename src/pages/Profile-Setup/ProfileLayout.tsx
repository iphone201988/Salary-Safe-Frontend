import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="fullscreen-bg h-screen w-screen bg-[#ffffff] flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default ProfileLayout;
