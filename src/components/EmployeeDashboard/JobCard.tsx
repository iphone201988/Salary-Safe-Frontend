import React from "react";

interface JobCardProps {
  title: string; // Job title
  companyName: string; // Company name
  location: string; // Job location
  salary: string | number; // Job salary
  jobType: string; // Type of job (e.g., Full-Time, Part-Time)
  description: string; // Job description
  id?: string; // Job description
}

const truncateDescription = (description: string, wordLimit: number) => {
  const words = description.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "..."; // Truncate and append "..."
  }
  return description;
};

const JobCard: React.FC<JobCardProps> = ({ title, companyName, location, salary, jobType, description , }) => {
  const shortDescription = truncateDescription(description, 100); // Limit description to 50 words

  return (
    <div className="p-4 bg-white shadow rounded-lg m-3">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-600">{companyName}</p>
      <div className="text-sm text-gray-500 mt-2">
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Salary:</strong> ${salary}</p>
        <p><strong>Job Type:</strong> {jobType}</p>
      </div>
      <p className="text-sm text-gray-700 mt-4">{shortDescription}</p>
    </div>
  );
};

export default JobCard;
