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

const truncateDescription = (description: string, wordLimit: number) => {
  const words = description.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return description;
};

const ApplyJobCard: React.FC<{ job: Job }> = ({ job }) => {
  const navigator = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center p-6 bg-white shadow-lg border border-gray-200 rounded-lg max-w-4xl mx-auto my-6 hover:shadow-xl transition-all">
      {/* Left Section: Logo and Job Details */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center w-full lg:w-auto mb-4 lg:mb-0">
        {/* Company Logo */}
        <div className="h-16 w-16 flex-shrink-0 rounded-full bg-blue-100 flex justify-center items-center text-lg font-bold text-blue-600 shadow-md">
          {job.client_details.company_name?.charAt(0).toUpperCase() || "C"}
        </div>
        {/* Job Details */}
        <div className="mt-3 lg:mt-0 lg:ml-4">
          <h4 className="text-lg font-bold text-gray-900">{job.title}</h4>
          <p className="text-sm text-gray-500">
            {job.client_details.company_name || "Unknown Company"}
          </p>
            <span className="flex items-center space-x-1">
              <i className="fas fa-map-marker-alt text-blue-500"></i>
              <span className="text-xs" >{job.location}</span>
            </span>
          <div className="flex items-center text-gray-600 text-sm mt-2 space-x-3">
            <span className="flex items-center space-x-1">
              <i className="fas fa-briefcase text-green-500"></i>
              <span className="capitalize">{job.job_type},{" "}{job.workplace_type}</span>
            </span>
          </div>
          <p className="text-sm font-medium text-blue-600 mt-1">
            ₹{job.salary_min} - ₹{job.salary_max}
          </p>
          <div className="text-sm">
          <span className="font-medium text-gray-900">{job.created_at.slice(0,10)} <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              job.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {job.status === "active" ? "Open" : "Closed"}
          </span></span>
        </div>
        </div>
      </div>

      {/* Middle Section: Job Description and Requirements */}
      <div className="flex-1 lg:ml-6 space-y-3 text-gray-700">
        <div className="text-sm">
          <span className="font-bold text-gray-900">Description:</span>{" "}
          {truncateDescription(job.description, 20)}
        </div>
        <div className="text-sm">
          <span className="font-bold text-gray-900">Requirements:</span>{" "}
          {truncateDescription(job.requirements, 20)}
        </div>
      </div>
      <div className="flex flex-col items-end lg:items-center mt-4 lg:mt-0">
        <button
          onClick={() => navigator(`/candidate/dashboard/job-list/${job.id}`)}
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-md text-sm transition-all transform hover:scale-105"
        >
          Apply Now
        </button>

      {/* Right Section: Apply Button */}
      </div>
    </div>
  );
};

export default ApplyJobCard;
