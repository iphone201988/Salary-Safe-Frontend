export const getToken = () => localStorage.getItem("access_token");
export const setToken = (token: string) => localStorage.setItem("access_token", token);
export const industrys = [
    "Technology", "Finance", "Healthcare", "Retail", "Education",
    "Manufacturing", "Construction", "Real Estate", "Consulting",
    "Transportation", "Hospitality", "Agriculture",
  ];

  export const getMultiSelectValues=(options:any,values:any)=>{
    return options.filter((option:any) => values.includes(option.value))
  }