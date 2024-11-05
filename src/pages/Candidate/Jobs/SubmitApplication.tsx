import React, { useEffect, useState } from "react";
import axios from "axios";

interface Application {
  id: string; // Unique identifier for the application
  jobTitle: string; // Title of the job
  companyName: string; // Name of the company
  status: string; // Status of the application (e.g., Pending, Accepted, Rejected)
  submittedDate: string; // Date of application submission
}

const SubmittedApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Fetch submitted applications from the API
    const fetchApplications = async () => {
      try {
        const response = await axios.get("https://api.example.com/applications"); // Replace with your actual API endpoint
        setApplications(response.data); // Assuming the response is an array of applications
      } catch (err) {
        setError("Failed to fetch applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <>
        <h2 className="text-3xl font-semibold text-center mb-8">My Submitted Applications</h2>

        {loading && <p className="text-center">Loading applications...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {applications.length === 0 && !loading && (
          <p className="text-center">No applications submitted yet.</p>
        )}

        {applications.length > 0 && (
          <div className="max-w-3xl mx-auto  shadow-lg rounded-lg">
            <ul className="divide-y divide-gray-200">
              {applications.map((application) => (
                <li key={application.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{application.jobTitle}</h3>
                    <p className="text-gray-600">{application.companyName}</p>
                    <p className="text-sm text-gray-500">Submitted on: {application.submittedDate}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-bold rounded ${application.status === "Accepted" ? "bg-green-200 text-green-600" : application.status === "Rejected" ? "bg-red-200 text-red-600" : "bg-yellow-200 text-yellow-600"}`}>
                    {application.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
    </>
  );
};

export default SubmittedApplicationsPage;
