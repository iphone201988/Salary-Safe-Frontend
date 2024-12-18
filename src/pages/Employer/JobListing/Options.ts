
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
    status?: string;
    schedule?: string;
    views?: number;
    vacancy?: number;
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
    status?: string;
    schedule?: string;
    views?: number;
    vacancy?: number;
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
  candidateName?: string;
  candidateEmail?: string;
  candidatePhone?: string;
  candidateLocation: string;
  candidateCurrentJobTitle: string;
  candidateEducationLevel?: string; 
  candidateExperience?: string;
  key_skills?:string;
  status?:any;
  actions?:any
};


export const jobApplicantsColumns : Column<applicantColumnsType>[] = [
  { id: "candidateName", label: "Name", minWidth: 120 },
  { id: "candidateEmail", label: "Email", minWidth: 150 },
  // { id: "candidatePhone", label: "Phone", minWidth: 150 },
  { id: "candidateLocation", label: "Location", minWidth: 150 },
  { id: "candidateCurrentJobTitle", label: "Current Job Title", minWidth: 150 },
  { id: "candidateEducationLevel", label: "Education Level", minWidth: 150 },
  { id: "candidateExperience", label: "Experience", minWidth: 100 },
  { id: "status", label: "Application Status", minWidth: 100 },
  { id: "actions", label: "Action", minWidth: 50 },
];