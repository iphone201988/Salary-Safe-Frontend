const url =
  import.meta.env.VITE_BACKEND_URL ||"https://salarysafe.onrender.com/api/v1";

// Company Onboarding

export const userRegister = url + "/users/signup";
export const clientUpdate = url + "/clients/me";
export const getcandidatesProfile = url + "/candidates/me";
export const userLogin = url + "/login";
export const userSocialLogin = url + "/login/social";
export const forgetPassword = url + "/utils/password-recovery";
export const resetPassword = url + "/utils/reset-password";
export const requestADemo = url + "/users/request_demo";
export const companyRegister = url + "/employers/register";
export const companyLogin = url + "/employers/login";
export const companyProfile = url + "/employers/employer";
export const candidateRegister = url + "/candidates/register";
export const candidateLogin = url + "/candidates/login";
export const getClientJobs = url + "/jobs/me";
export const createJobs = url + "/jobs/";
export const companyDetails = url + "/clients/me"
export const getSearchJobsToCandiDate = url + "/jobs/filters/search"
export const getJobsToCandiDate = url + "/jobs/me/matches"
export const getJobsByIdToCandiDate = url + "/jobs"
export const applyJob = url + "/jobs/id/apply"
export const submittedApplication = url + "/jobs/applications/me"
export const submittedApplicationById = url + "/jobs/applications"
export const candidateDashboard = url + "/jobs/filters/insights"
export const getAllCandidateApplyOnJob = url + "/jobs/:job_id/applications"

//Employeer register
export const employeerRegister = url + "/clients/register";
export const employeerLogin = url + "/clients/login";