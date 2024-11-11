export const getToken = () => localStorage.getItem("access_token");
export const setToken = (token: string) =>
  localStorage.setItem("access_token", token);
export const industrys = [
  "Technology",
  "Finance",
  "Healthcare",
  "Retail",
  "Education",
  "Manufacturing",
  "Construction",
  "Real Estate",
  "Consulting",
  "Transportation",
  "Hospitality",
  "Agriculture",
];

interface Option {
  value: string | number;
  label: string;
}

export const getMultiSelectValues = (
  options: Option[],
  values: string | number | (string | number | any)[]
): Option[] => {
  const valueArray = Array.isArray(values) ? values : [values];

  return options.filter((option) => valueArray.includes(option.value));
};
