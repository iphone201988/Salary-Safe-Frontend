import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Public-Page/Home/Home";
import AboutPage from "../pages/Public-Page/About/About";
import ContactPage from "../pages/Public-Page/Contact/Contact";
import CompanySignUp from "../pages/Employer/Auth/SignUp/Signup";
import EmployeeSignUp from "../pages/Candidate/Auth/Employee/SignUp/SignUp";
import AuthLayout from "../pages/Employer/Auth/layout";
import CompanyLogin from "../pages/Employer/Auth/Login/Login";
import EmployeeLogin from "../pages/Candidate/Auth/Employee/Login/Login";
import ProtectedAuthRoute from "./ProtectedAuthRoute";
// import JobPage from "../pages/Job/JobPage";
// import JobForm from "../pages/Job/JobForm";
// import ProtectedCompanyRoute from "./ProtectedCompanyRoute";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import FeaturesPage from "../pages/Public-Page/Features/FeaturesPage";
import RequestDemoPage from "../pages/Public-Page/RequestDemo/RequestDemoPage";
import Dashboard from "../pages/Employer/Dashboard/Dashboard";
import DashboardSummary from "../components/Dashboard/DashboardSummary";
import DashboardCharts from "../components/Dashboard/DashboardCharts";
import DashboardSettings from "../components/Dashboard/DashboardSettings";
import ForgotPassword from "../pages/Employer/Auth/ForgotPassword/ForgotPassword";
import OTPVerify from "../pages/Employer/Auth/VerifyOtp/VerifyOtp";
import ResetPassword from "../pages/Employer/Auth/ResetPassword/ResetPassword";
// import ProtesctedResetRoute from "./ProtesctedResetRoute";
import ProtesctedOtpRoute from "./ProtesctedOtpRoute";
import AuthCallback from "../pages/Employer/Auth/Login/AuthCallback";
import JobForm from "../pages/Job/JobForm";
import ProtectedCompanyRoute from "./ProtectedCompanyRoute";
import ProtectedCandidateRoute from "./ProtectedCandidateRoute";

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
    path: "contact",
    element: <ContactPage />,
  },
  // {
  //   path: "jobs",
  //   element: (
  //     <ProtectedCompanyRoute element={<JobPage />} allowedRoles={["company"]} />
  //   ),
  // },
  {
    path: "create-job",
    element: <JobForm />,
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
        path: "auth/linkedin/callback",
        element: <ProtectedAuthRoute element={<AuthCallback />} />,
      },
      {
        path: "signup-employee",
        element: <ProtectedAuthRoute element={<EmployeeSignUp />} />,
      },
      {
        path: "login-employee",
        element: <ProtectedAuthRoute element={<EmployeeLogin />} />,
      },
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
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/employeer/dashboard/",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <ProtectedCompanyRoute element={<DashboardSummary />} />,
      },
      {
        path: "reports",
        element: <ProtectedCompanyRoute element={<DashboardCharts />} />,
      },
      {
        path: "analytics",
        element: <ProtectedCompanyRoute element={<DashboardCharts />} />,
      },
      {
        path: "settings",
        element: <ProtectedCompanyRoute element={<DashboardSettings />} />,
      },
    ],
  },
  {
    path: "/candidate/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <ProtectedCandidateRoute element={<DashboardSummary />} />,
      },
      {
        path: "reports",
        element: <ProtectedCandidateRoute element={<DashboardCharts />} />,
      },
      {
        path: "analytics",
        element: <ProtectedCandidateRoute element={<DashboardCharts />} />,
      },
      {
        path: "settings",
        element: <ProtectedCandidateRoute element={<DashboardSettings />} />,
      },
    ],
  },
]);

export default router;
