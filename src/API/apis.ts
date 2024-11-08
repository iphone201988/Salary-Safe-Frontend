const url =
  import.meta.env.VITE_BACKEND_URL ||"https://salarysafe.onrender.com/api/v1";

// Company Onboarding

export const userRegister = url + "/users/signup";
export const clientUpdate = url + "/clients/me";
export const getClientProfile = url + "/clients/me";
export const getcandidatesProfile = url + "/candidates/me";
export const userLogin = url + "/login";
export const userSocialLogin = url + "/login/social";
export const forgetPassword = url + "/password-recovery";
export const resetPassword = url + "/reset-password";
export const requestADemo = url + "/users/request_demo";
export const companyRegister = url + "/employers/register";
export const companyLogin = url + "/employers/login";
export const companyProfile = url + "/employers/employer";
export const candidateRegister = url + "/candidates/register";
export const candidateLogin = url + "/candidates/login";
export const getJobs = url + "/jobs";
export const createJobs = url + "/jobs";
export const companyDetails = url + "/clients/me"
//Employeer register
export const employeerRegister = url + "/clients/register";
export const employeerLogin = url + "/clients/login";