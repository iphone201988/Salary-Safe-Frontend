export const jobTypeOptions = [
    { value: "", text: "Job Type" },
    { value: "fulltime", text: "Full-Time" },
    { value: "parttime", text: "Part-Time" },
    { value: "contract", text: "Contract" },
    { value: "internship", text: "Internship" }
  ];
export const workplaceTypeOptions = [
    { value: "", text: "Workplace Type" },
    { value: "remote", text: "Remote" },
    { value: "onsite", text: "Onsite" },
    { value: "hybrid", text: "Hybrid" }
  ];


  export const getOptionText = (options: { value: string; text: string }[], value: string): string | undefined => {
    const option = options.find(opt => opt.value === value);
    return option?.text; // Returns the text or undefined if not found
  };
  export const getOptionLabel = (options: { value: string; label: string }[], value: string |undefined): string | undefined => {
    const option = options.find(opt => opt.value === value);
    return option?.label; // Returns the text or undefined if not found
  };