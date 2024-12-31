import React from "react";

type Job = {
  title?: string;
  description?: string;
  requirements?: string;
  location?: string;
  job_type?: string;
  workplace_type?: string;
  schedule?: string;
  status?: string;
  vacancy?: number;
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
  console.log("data:::::", data);
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

  const scheduleOptions = {
    day_shift: "Day Shift",
    morning_shift: "Morning Shift",
    evening_shift: "Evening Shift",
    night_shift: "Night Shift",
    rotational_shift: "Rotational Shift",
  };

  console.log("data", data);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white rounded-lg shadow p-4 w-full max-w-lg max-h-[90vh] overflow-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">View Job</h3>
        <div className="mb-4">
          <div className="font-bold text-xl my-1">Job Title:</div>
          <p className="mx-2">{data.title || "N/A"}</p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-xl my-1">Job Description:</p>
          <p className="mx-2">{data.description || "N/A"}</p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-xl my-1">Job Type:</p>
          <p className="mx-2">
            {jobTypes[data.job_type as keyof typeof jobTypes] || "N/A"}
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-xl my-1">Workplace Type:</p>
          <p className="mx-2">
            {workplaceTypes[
              data.workplace_type as keyof typeof workplaceTypes
            ] || "N/A"}
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-xl my-1">Schedule:</p>
          <p className="mx-2">
            {scheduleOptions[data.schedule as keyof typeof scheduleOptions] ||
              "N/A"}
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-xl my-1">Vacancy:</p>
          <p className="mx-2">{data.vacancy || "N/A"}</p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-xl my-1">Status:</p>
          <p className="capitalize mx-2">{data.status || "N/A"}</p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-xl my-1">Requirements:</p>
          <p className="mx-2">{data.requirements || "N/A"}</p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-xl my-1">Location:</p>
          <p className="mx-2">{data.location || "N/A"}</p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-xl my-1">Salary Range:</p>
          <p className="mx-2">
            ${data.salaryRange[0]} - ${data.salaryRange[1]}
          </p>
        </div>
        <div className="mb-4">
          <p className="font-bold text-xl my-1">Is Salary Negotiable?</p>
          <p className="mx-2">{data.isNegotiable ? "Yes" : "No"}</p>
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
