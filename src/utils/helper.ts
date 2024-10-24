export const getToken = () => localStorage.getItem("access_token");
export const setToken = (token: string) => localStorage.setItem("access_token", token);
