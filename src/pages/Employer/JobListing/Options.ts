interface Column<T> {
    id: keyof T;
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
    format?: (value: any) => string;
  }
  export type columnJobType = {
    id?: string;
    title?: string;
    description?: string;
    requirements?: string;
    desc: string;
    require: string;
    location?: string;
    salaryRange: [number, number];
    salaryRanges?: [number, number];
    isNegotiable?: boolean;
    job_type?: string;
    workplace_type?: string;
    job_type_?: string;
    workplace_type_?: string;
    created_at?: string;
    actions?:any
  };
  export interface Job {
    title: string;
    description: string;
    requirements: string;
    location: string;
    job_type: string;
    workplace_type: string;
    salaryRange: [number, number];
    isNegotiable: boolean;
    id?: string;
    salary_min?: string;
    salary_max?: string;
    created_at?: string;
  }

  

export const columnsName : Column<columnJobType>[] = [
    { id: "title", label: "Title", minWidth: 120 },
    { id: "job_type_", label: "Job Type", minWidth: 150 },
    // { id: "desc", label: "Description", minWidth: 300 },
    // { id: "require", label: "Requirements", minWidth: 200 },
    // { id: "location", label: "Location", minWidth: 150 },
    { id: "workplace_type_", label: "Workplace Type", minWidth: 150 },
    {
        id: "salaryRanges",
        label: "Salary Range",
        minWidth: 200,
    },
    { id: "created_at", label: "Created Date", minWidth: 150 },
    { id: "actions", label: "Action", minWidth: 150 },
    
    // {
    //     id: "isNegotiable",
    //     label: "Negotiable",
    //     minWidth: 100,
    //     format: (value: boolean) => (value ? "Yes" : "No"),
    // },
];



export type applicantColumnsType = {
  id?: string;
  full_name?: string;
  email?: string;
  phone_number?: string;
  location: string;
  current_job_title: string;
  total_years_of_experience?: string;
  key_skills:string;
  actions?:any
};


export const jobApplicantsColumns : Column<applicantColumnsType>[] = [
  { id: "full_name", label: "Name", minWidth: 120 },
  { id: "email", label: "Email", minWidth: 150 },
  { id: "phone_number", label: "Phone", minWidth: 150 },
  { id: "location", label: "Location", minWidth: 150 },
  { id: "current_job_title", label: "Current Job Title", minWidth: 150 },
  { id: "total_years_of_experience", label: "Experience", minWidth: 150 },
  { id: "key_skills", label: "Skills", minWidth: 150 },
  { id: "actions", label: "Action", minWidth: 150 },
];