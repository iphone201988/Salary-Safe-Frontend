export const getToken = () => localStorage.getItem("access_token");
export const setToken = (token: string) => localStorage.setItem("access_token", token);
export const industrys = [
    "Technology", "Finance", "Healthcare", "Retail", "Education",
    "Manufacturing", "Construction", "Real Estate", "Consulting",
    "Transportation", "Hospitality", "Agriculture",
  ];