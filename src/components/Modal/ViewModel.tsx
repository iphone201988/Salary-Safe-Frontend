import React from "react";

type Job = {
  title?: string;
  description?: string;
  requirements?: string;
  location?: string;
  job_type?: string;
  workplace_type?: string;
  salaryRange: [number, number];
  isNegotiable?: boolean;
  id?: string;
  salary_min?: string;
  salary_max?: string;
  created_at?: string;
};

interface ViewModelProps {
  data: Job;
  setModelopen: (isOpen: boolean) => void;
}

const ViewModel: React.FC<ViewModelProps> = ({ data, setModelopen }) => {
  const jobTypes = {
    fulltime: "Full-time",
    parttime: "Part-time",
    internship: "Internship",
    contract: "Contract",
    temporary: "Temporary",
    volunteer: "Volunteer",
    other: "Other",
  };

  const workplaceTypes = {
    onsite: "Onsite",
    remote: "Remote",
    hybrid: "Hybrid",
  };
  console.log("data",data);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white rounded-lg shadow p-4 w-full max-w-lg max-h-[90vh] overflow-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">View Job</h3>
        <div className="mb-4">
          <p className="font-medium">Job Title:</p>
          <p>{data.title || "N/A"}</p>
        </div>
        <div className="mb-4">
          <p className="font-medium">Job Description:</p>
          <p>{data.description || "N/A"}</p>
        </div>
        <div className="mb-4">
          <p className="font-medium">Job Type:</p>
          <p>{jobTypes[data.job_type as keyof typeof jobTypes] || "N/A"}</p>
        </div>
        <div className="mb-4">
          <p className="font-medium">Workplace Type:</p>
          <p>{workplaceTypes[data.workplace_type as keyof typeof workplaceTypes] || "N/A"}</p>
        </div>
        <div className="mb-4">
          <p className="font-medium">Requirements:</p>
          <p>{data.requirements || "N/A"}</p>
        </div>
        <div className="mb-4">
          <p className="font-medium">Location:</p>
          <p>{data.location || "N/A"}</p>
        </div>
        <div className="mb-4">
          <p className="font-medium">Salary Range:</p>
          <p>${data.salaryRange[0]} - ${data.salaryRange[1]}</p>
        </div>
        <div className="mb-4">
          <p className="font-medium">Is Salary Negotiable?</p>
          <p>{data.isNegotiable ? "Yes" : "No"}</p>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setModelopen(false)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModel;
