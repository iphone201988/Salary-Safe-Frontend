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
import FeaturesPage from "../pages/Features/FeaturesPage";
import RequestDemoPage from "../pages/RequestDemo/RequestDemoPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardSummary from "../components/Dashboard/DashboardSummary";
import DashboardCharts from "../components/Dashboard/DashboardCharts";
import DashboardSettings from "../components/Dashboard/DashboardSettings";
import ForgotPassword from "../pages/Auth/Company/ForgotPassword/ForgotPassword";
import OTPVerify from "../pages/Auth/Company/VerifyOtp/VerifyOtp";
import ResetPassword from "../pages/Auth/Company/ResetPassword/ResetPassword";
import ProtesctedResetRoute from "./ProtesctedResetRoute";
import ProtesctedOtpRoute from "./ProtesctedOtpRoute";
import AuthCallback from "../pages/Auth/Company/Login/AuthCallback";

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
    path: "features",
    element: <FeaturesPage />,
  },
  {
    path: "request-demo",
    element: <RequestDemoPage />,
  },
  {
    path: "product",
    element: <ProductPage />,
  },
  {
    path: "contact",
    element: <ContactPage />,
  },
  // {
  //   path: "jobs",
  //   element: (
  //     <ProtectedCompanyRoute element={<JobPage />} allowedRoles={["company"]} />
  //   ),
  // },
  // {
  //   path: "create-job",
  //   element: (
  //     <ProtectedCompanyRoute element={<JobForm />} allowedRoles={["company"]} />
  //   ),
  // },
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
        path: "auth/linkedin/callback",
        element: <ProtectedAuthRoute element={<AuthCallback />} />,
      },
      // {
      //   path: "signup-employee",
      //   element: <ProtectedAuthRoute element={<EmployeeSignUp />} />,
      // },
      // {
      //   path: "login-employee",
      //   element: <ProtectedAuthRoute element={<EmployeeLogin />} />,
      // },
      {
        path: "forgot-password",
        element: <ProtectedAuthRoute element={<ForgotPassword />} />,
      },
      {
        path: "otp-verify",
        element: <ProtesctedOtpRoute element={<OTPVerify />} />,
      },
      {
        path: "reset-password",
        element: <ProtesctedResetRoute element={<ResetPassword />} />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <DashboardSummary />,
      },
      {
        path: "reports",
        element: <DashboardCharts />,
      },
      {
        path: "analytics",
        element: <DashboardCharts />,
      },
      {
        path: "settings",
        element: <DashboardSettings />,
      },
    ],
  },
]);

export default router;
