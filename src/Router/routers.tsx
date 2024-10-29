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
import CandidateDashboard from "../pages/Candidate/Dashboard/Dashboard";
import DashboardSummary from "../components/Dashboard/DashboardSummary";
import DashboardCharts from "../components/Dashboard/DashboardCharts";
import DashboardSettings from "../components/Dashboard/DashboardSettings";
import EmployeeDashboardSummary from "../components/EmployeeDashboard/DashboardSummary";
import EmployeeDashboardSettings from "../components/EmployeeDashboard/DashboardSettings";
import ForgotPassword from "../pages/Employer/Auth/ForgotPassword/ForgotPassword";
import OTPVerify from "../pages/Employer/Auth/VerifyOtp/VerifyOtp";
import ResetPassword from "../pages/Employer/Auth/ResetPassword/ResetPassword";
// import ProtesctedResetRoute from "./ProtesctedResetRoute";
import ProtesctedOtpRoute from "./ProtesctedOtpRoute";
import AuthCallback from "../pages/Employer/Auth/Login/AuthCallback";
import JobForm from "../pages/Job/JobForm";
import ProtectedCompanyRoute from "./ProtectedCompanyRoute";
import ProtectedCandidateRoute from "./ProtectedCandidateRoute";
import JobSalaryAdjustments from "../pages/Candidate/Jobs/JobSalaryAdjustments";
import SupportFeedback from "../pages/Public-Page/Feedback/SupportFeedback";
import JobListings from "../pages/Employer/JobListing/Joblisting";
import InternalSalaryUpload from "../pages/Employer/Internal-upload/InternalUpload";
import CandidatePoolDashboard from "../pages/Employer/CandidatePool/CandidatePool";
import SalaryAnalysis from "../pages/Employer/Salary-Analysis/SalaryAnalysis";
import ReportingInsightsHub from "../pages/Employer/Reporting-InsightsHub/ReportingInsightsHub";

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
    path: "job-list",
    element: <JobSalaryAdjustments />,
  },
  {
    path: "feedback",
    element: <SupportFeedback />,
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
        path: "job-listing",
        element: <ProtectedCompanyRoute element={<JobListings />} />,
      },
      {
        path: "internal-uploads",
        element: <ProtectedCompanyRoute element={<InternalSalaryUpload />} />,
      },
      {
        path: "candidate-pool",
        element: <ProtectedCompanyRoute element={<CandidatePoolDashboard />} />,
      },
      {
        path: "salary-analysis",
        element: <ProtectedCompanyRoute element={<SalaryAnalysis />} />,
      },
      {
        path: "reporting-insights-hub",
        element: <ProtectedCompanyRoute element={<ReportingInsightsHub />} />,
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
    element: <CandidateDashboard />,
    children: [
      {
        path: "",
        element: (
          <ProtectedCandidateRoute element={<EmployeeDashboardSummary />} />
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedCandidateRoute element={<EmployeeDashboardSettings />} />
        ),
      },
    ],
  },
]);

export default router;
