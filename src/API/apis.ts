const url =
  import.meta.env.VITE_BACKEND_URL ||"https://salarysafe.onrender.com/api/v1";

// Company Onboarding

export const userRegister = url + "/users/signup";
export const userLogin = url + "/login";
export const userSocialLogin = url + "/login/social";
export const forgetPassword = url + "/password-recovery";
export const requestADemo = url + "/users/request_demo";
export const companyRegister = url + "/employers/register";
export const companyLogin = url + "/employers/login";
export const companyProfile = url + "/employers/employer";
export const candidateRegister = url + "/candidates/signup";
export const candidateLogin = url + "/candidates/login";
export const getJobs = url + "/jobs";
export const createJobs = url + "/jobs";
export const companyDetails = url + "/users/me"
