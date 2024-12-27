import React from "react";
import { useNavigate } from "react-router-dom";

interface JobDetails {
  salary_min: string;
  salary_max: string;
  status: string;
  requirements: string;
  views: number;
  required_skills: string[];
  is_salary_negotiable: boolean;
  job_type: string;
  id: string;
  description: string;
  workplace_type: string;
  client_id: string;
  title: string;
  schedule: string;
  created_at: string;
  location: string;
  updated_at: string;
}

interface ApplicationHistoryItem {
  id: string;
  status: string;
  salary_expectation: string;
  job_details: JobDetails;
}

interface ApplicationHistoryProps {
  applicationHistory?: ApplicationHistoryItem[];
}

const ApplicationHistory: React.FC<ApplicationHistoryProps> = ({ applicationHistory }) => {
  const navigate = useNavigate()

  if (!applicationHistory || applicationHistory.length === 0) {
    return <p className="text-gray-500">No application history available.</p>;
  }



  const toggleShowAll = () => navigate("/candidate/dashboard/submit-application");

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Application History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {applicationHistory.map((application) => (
          <div onClick={() =>navigate(`/candidate/dashboard/submit-application/${application.id}`)}
            key={application.id}
            className="border rounded-lg p-4 hover:shadow-md transition bg-gray-50 cursor-pointer"
          >
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              {application.job_details.title}
            </h3>
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span
                className={`font-medium ${
                  application.status === "pending"
                    ? "text-yellow-500"
                    : application.status === "accepted"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {application.status}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              Location: {application.job_details.location}
            </p>
            <p className="text-sm text-gray-600">
              Expected Salary: ₹ {application.salary_expectation}
            </p>
            <p className="text-sm text-gray-600">
              Job Type: {application.job_details.job_type}
            </p>
            <ul className="text-sm text-gray-600 list-disc ">
              Required Skills:
              {application.job_details.required_skills.map((skill) => (
                <li className="ml-6" key={skill}>{skill}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-600">
              Created At:{" "}
              {new Date(application.job_details.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
      {applicationHistory.length > 10 && (
        <button
          onClick={toggleShowAll}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
         Show More
        </button>
      )}
    </div>
  );
};

export default ApplicationHistory;
