const url =
  import.meta.env.VITE_BACKEND_URL ||"https://17ca-103-149-154-9.ngrok-free.app";

// Company Onboarding
export const companyRegister = url + "/employers/register";
export const companyLogin = url + "/employers/login";
export const candidateRegister = url + "/candidates/signup";
export const candidateLogin = url + "/candidates/login";
export const getJobs = url + "/jobs";
export const createJobs = url + "/jobs";
