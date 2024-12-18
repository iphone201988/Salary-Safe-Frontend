import React from "react";
import { useNavigate } from "react-router-dom";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary_min: number | string;
  salary_max: number | string;
  requirements: string;
  status: "active" | "closed";
  job_type: string;
  workplace_type: string;
  application_status: "pending" | "approved" | "rejected";
  client_details: {
    id: string;
    email: string;
    company_name: string;
    industry: string;
    company_size: string;
    headquarters_location: string;
  };
  created_at: string; // ISO date string
}

interface GridJobCardProps {
  job: Job;
}

const GridJobCard: React.FC<GridJobCardProps> = ({ job }) => {
  const navigator = useNavigate();

  return (
    <div
      onClick={() => navigator(`/candidate/dashboard/job-list/${job?.id}`)}
      className="p-5 bg-white h-[350px] w-[300px] max-lg:w-[95%] cursor-pointer border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700"
    >
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <img
          src={"https://via.placeholder.com/44"} // Placeholder for company logo
          alt={job?.client_details?.company_name || "Company Logo"}
          className="h-12 w-12 rounded-full object-cover border border-gray-200 dark:border-gray-600"
        />
        <div className="flex flex-wrap gap-2">
          <span className=" capitalize text-xs text-blue-600 bg-blue-100 py-1 px-3 rounded-full">
            {job?.job_type || "Job Type"}
          </span>
          <span className="capitalize text-xs text-green-600 bg-green-100 py-1 px-3 rounded-full">
            {job?.workplace_type || "Workplace Type"}
          </span>
        </div>
      </div>

      {/* Job Title */}
      <h4 className="mt-3 text-lg font-bold text-gray-900 dark:text-gray-100">
        {job?.title || "Job Title"}
      </h4>

      {/* Company and Location */}
      <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        <span>{job?.client_details?.company_name || "Unknown Company"}</span>
        <div className="flex items-center space-x-1">
          <svg
            className="w-4 h-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a6 6 0 016 6c0 4.25-6 10-6 10S4 12.25 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span>{job?.location || "Location not specified"}</span>
        </div>
      </div>

      {/* Salary */}
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center space-x-1">
          <svg
            className="w-4 h-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 3a7 7 0 100 14 7 7 0 000-14zm-.75 4a.75.75 0 011.5 0v2.5h1.25a.75.75 0 110 1.5H10.75a.75.75 0 01-.75-.75V7zm-2 0a.75.75 0 011.5 0v4.25a.75.75 0 11-1.5 0V7z" />
          </svg>
          <span>
            ₹{job?.salary_min || "N/A"} - ₹{job?.salary_max || "N/A"}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-500 line-clamp-3 dark:text-gray-400">
        {job?.description || "No description available."}
      </p>

      {/* Status */}
      <div className="mt-4">
        <span
          className={`text-xs font-semibold ${
            job?.status === "active"
              ? "text-green-600 bg-green-100"
              : "text-red-600 bg-red-100"
          } py-1 px-3 rounded-full`}
        >
          {job?.status === "active" ? "Hiring" : "Closed"}
        </span>
      </div>
    </div>
  );
};

export default GridJobCard;
