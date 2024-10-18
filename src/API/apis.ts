const url =
  import.meta.env.VITE_BACKEND_URL ||"https://ac8e-103-149-154-9.ngrok-free.app";

// Company Onboarding
export const companyRegister = url + "/employers/register";
export const companyLogin = url + "/employers/login";
export const companyProfile = url + "/employers/employer";
export const candidateRegister = url + "/candidates/signup";
export const candidateLogin = url + "/candidates/login";
export const getJobs = url + "/jobs";
export const createJobs = url + "/jobs";
