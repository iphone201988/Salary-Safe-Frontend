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
import ProtectedAuthRoute from "./ProtectedAuthRoute";
import JobPage from "../pages/Job/JobPage";
import JobForm from "../pages/Job/JobForm";
import ProtectedCompanyRoute from "./ProtectedCompanyRoute";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
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
    path: "jobs",
    element: (
      <ProtectedCompanyRoute element={<JobPage />} allowedRoles={["company"]} />
    ),
  },
  {
    path: "create-job",
    element: (
      <ProtectedCompanyRoute element={<JobForm />} allowedRoles={["company"]} />
    ),
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "signup-company",
        element: <ProtectedAuthRoute element={<CompanySignUp />} />,
      },
      {
        path: "login-company",
        element: <ProtectedAuthRoute element={<CompanyLogin />} />,
      },
      {
        path: "signup-employee",
        element: <ProtectedAuthRoute element={<EmployeeSignUp />} />,
      },
      {
        path: "login-employee",
        element: <ProtectedAuthRoute element={<EmployeeLogin />} />,
      },
    ],
  },
]);

export default router;
