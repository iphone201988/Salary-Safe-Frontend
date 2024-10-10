import { RouterProvider } from "react-router-dom";
import router from "./routers";

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
