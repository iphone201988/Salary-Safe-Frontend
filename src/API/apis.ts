const url =
  import.meta.env.VITE_BACKEND_URL ||
  "https://9291-103-149-154-9.ngrok-free.app";

// Company Onboarding
export const companyRegister = url + "/candidates/signup";
export const companyLogin = url + "/candidates/login";
