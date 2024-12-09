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

export const IndustryceOptions = industrys.map(industry => ({
  value: industry.toLowerCase().replace(/\s+/g, '-'),
  label: industry
}));

export const sizeOptions = [
  { value: "", label: "Select Size" },
  { value: "0-10", label: "0-10" },
  { value: "10-50", label: "10-50" },
  { value: "50-100", label: "50-100" },
  { value: "100 or above", label: "100 or above" }
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
