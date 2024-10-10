import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/Home";
import AboutPage from "../pages/About/About";
import ProductPage from "../pages/Product/Product";
import ContactPage from "../pages/Contact/Contact";
import CompanySignUp from "../pages/Auth/Company/SignUp/Signup";
import EmployeeSignUp from "../pages/Auth/Employee/SignUp/SignUp";
import AuthLayout from "../pages/Auth/layout";
import CompanyLogin from "../pages/Auth/Company/Login/Login";
import EmployeeLogin from "../pages/Auth/Employee/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "about",
    element: <AboutPage />,
  },
  {
    path: "product",
    element: <ProductPage />,
  },
  {
    path: "contact",
    element: <ContactPage />,
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "signup-company",
        element: <CompanySignUp />,
      },
      {
        path: "login-company",
        element: <CompanyLogin />,
      },
      {
        path: "signup-employee",
        element: <EmployeeSignUp />,
      },
      {
        path: "login-employee",
        element: <EmployeeLogin />,
      },
    ],
  },
]);

export default router;
