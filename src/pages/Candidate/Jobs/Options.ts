interface Column<T> {
    id: keyof T;
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
    format?: (value: any) => string;
  }
  export const columnsName: Column<{
    company_name: string;
    title: string;
    job_type: string;
    workplace_type: string;
    salary_min?: string;
    salary_max?: string;
    location?: string;
  }>[] = [
    { id: "company_name", label: "Company Name", minWidth: 120 },
    { id: "title", label: "Job Title", minWidth: 120 },
    { id: "job_type", label: "Job Type", minWidth: 150 },
    { id: "workplace_type", label: "Workplace Type", minWidth: 150 },
    { id: "salary_min", label: "Min Salary", minWidth: 150 },
    { id: "salary_max", label: "Max Salary", minWidth: 150 },
    { id: "location", label: "Location", minWidth: 150 },
  ];
  
  export const columnsSubmittedApplication: Column<{
    company_name: string;
    title: string;
    job_type: string;
    workplace_type: string;
    location?: string;
    status?: string;
  }>[] = [
    { id: "company_name", label: "Company Name", minWidth: 120 },
    { id: "title", label: "Job Title", minWidth: 120 },
    { id: "job_type", label: "Job Type", minWidth: 150 },
    { id: "workplace_type", label: "Workplace Type", minWidth: 150 },
    { id: "status", label: "Status", minWidth: 150 },
    { id: "location", label: "Location", minWidth: 150 },
  ];
  