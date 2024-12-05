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


const ApplyJobCard: React.FC<{ job: Job }> = ({ job }) => {
  const navigator = useNavigate()

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-6 bg-white shadow-md border border-gray-200 rounded-lg max-w-4xl mx-auto my-4">
      {/* Job and Company Details */}
      <div className="flex items-center w-full lg:w-auto mb-4 lg:mb-0">
        <div className="h-16 w-16 rounded-full bg-gray-100 flex justify-center items-center text-lg font-bold text-gray-700">
          {job?.client_details?.company_name.charAt(0)}
        </div>
        <div className="ml-4">
          <h4 className="text-lg font-semibold text-gray-900">{job?.title}</h4>
          <p className="text-sm text-gray-600">{job?.client_details?.company_name}</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="flex-1 lg:ml-6">
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Location:</span> {job?.location}
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Job Type:</span> {job?.job_type}
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Workplace Type:</span> {job?.workplace_type}
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-semibold">Salary:</span> ₹{job?.salary_min} - ₹{job?.salary_max}
        </div>
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Requirements:</span> {job?.requirements}
        </div>
        <p className="text-gray-500 text-sm mb-4">{job?.description}</p>
      </div>

      {/* Apply Button */}
      <div className="flex flex-col items-end lg:items-center">
      
        <button
        onClick={()=>navigator(`/candidate/dashboard/job-list/${job?.id}`)}
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg text-sm"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default ApplyJobCard;
