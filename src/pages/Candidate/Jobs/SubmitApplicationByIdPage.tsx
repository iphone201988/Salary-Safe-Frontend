import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { submittedApplicationById } from "../../../API/apis";

const SubmitApplicationByIdPage = () => {
  const { id } = useParams<{ id: string }>();
  const token = useSelector((state: any) => state.auth.token);
  const [application, setApplication] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${submittedApplicationById}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplication(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch application details.");
      } finally {
        setLoading(false);
      }
    };
    fetchApplicationDetails();
  }, [id, token]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Application Details</h1>

        {/* Application Status */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Application Status:</h2>
          <p className={`text-lg font-medium mt-2 ${
            application?.status === "pending" ? "text-yellow-500" : 
            application?.status === "approved" ? "text-green-500" : 
            "text-red-500"
          }`}>
            {application?.status?.toUpperCase()}
          </p>
        </div>

        {/* Job Details Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Job Details</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <p><strong>Title:</strong> {application?.job_details?.title}</p>
            <p><strong>Description:</strong> {application?.job_details?.description}</p>
            <p><strong>Location:</strong> {application?.job_details?.location}</p>
            <p><strong>Salary:</strong> {application?.job_details?.salary_min} - {application?.job_details?.salary_max}</p>
            <p><strong>Requirements:</strong> {application?.job_details?.requirements}</p>
            <p><strong>Job Type:</strong> {application?.job_details?.job_type}</p>
            <p><strong>Workplace Type:</strong> {application?.job_details?.workplace_type}</p>
            <p><strong>Status:</strong> {application?.job_details?.status}</p>
            <p><strong>Application Status:</strong> {application?.job_details?.application_status}</p>
            <p><strong>Posted On:</strong> {new Date(application?.job_details?.created_at).toLocaleString()}</p>
          </div>
        </div>

        {/* Client Details Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Company Details</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <p><strong>Company Name:</strong> {application?.job_details?.client_details?.company_name}</p>
            <p><strong>Email:</strong> {application?.job_details?.client_details?.email}</p>
            <p><strong>Industry:</strong> {application?.job_details?.client_details?.industry}</p>
            <p><strong>Company Size:</strong> {application?.job_details?.client_details?.company_size}</p>
            <p><strong>Headquarters:</strong> {application?.job_details?.client_details?.headquarters_location}</p>
          </div>
        </div>

        {/* Candidate Details Section */}
        {/* <div className="mb-6">
          <h2 className="text-lg font-semibold">Candidate Details</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <p><strong>Full Name:</strong> {application?.candidate_details?.full_name}</p>
            <p><strong>Email:</strong> {application?.candidate_details?.email}</p>
            <p><strong>Phone Number:</strong> {application?.candidate_details?.phone_number}</p>
            <p><strong>Location:</strong> {application?.candidate_details?.location}</p>
            <p><strong>Current Job Title:</strong> {application?.candidate_details?.current_job_title}</p>
            <p><strong>LinkedIn Profile:</strong> <a href={application?.candidate_details?.linkedin_profile_url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">View Profile</a></p>
            <p><strong>Job Titles of Interest:</strong> {application?.candidate_details?.job_titles_of_interest}</p>
            <p><strong>Total Years of Experience:</strong> {application?.candidate_details?.total_years_of_experience}</p>
            <p><strong>Education Level:</strong> {application?.candidate_details?.education_level}</p>
            <p><strong>Key Skills:</strong> {application?.candidate_details?.key_skills?.join(", ")}</p>
          </div>
        </div> */}

        {/* Created At */}
        <div>
          <h2 className="text-lg font-semibold">Application Submitted On:</h2>
          <p className="mt-2">{new Date(application?.created_at).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default SubmitApplicationByIdPage;
