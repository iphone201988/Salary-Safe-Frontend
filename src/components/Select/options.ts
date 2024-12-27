export const jobTypeOptions = [
  { value: "fulltime", label: "Full-time" },
  { value: "parttime", label: "Part-time" },
  { value: "internship", label: "Internship" },
  { value: "contract", label: "Contract" },
  { value: "temporary", label: "Temporary" },
  { value: "volunteer", label: "Volunteer" },
  { value: "other", label: "Other" },
];
export const jobTypeOptionsExtra = [
    { value: "", text: "Job Type" },
    { value: "fulltime", text: "Full-time" },
    { value: "parttime", text: "Part-time" },
    { value: "internship", text: "Internship" },
    { value: "contract", text: "Contract" },
    { value: "temporary", text: "Temporary" },
    { value: "volunteer", text: "Volunteer" },
    { value: "other", text: "Other" },
];
export const workplaceTypeOptions = [
  { value: "", text: "Workplace Type" },
  { value: "remote", text: "Remote" },
  { value: "onsite", text: "Onsite" },
  { value: "hybrid", text: "Hybrid" },
];

export const getOptionText = (
  options: { value: string; text: string }[],
  value: string
): string | undefined => {
  const option = options.find((opt) => opt.value === value);
  return option?.text; // Returns the text or undefined if not found
};
export const getOptionLabel = (
  options: { value: string; label: string }[],
  value: string | undefined
): string | undefined => {
  const option = options.find((opt) => opt.value === value);
  return option?.label; // Returns the text or undefined if not found
};
