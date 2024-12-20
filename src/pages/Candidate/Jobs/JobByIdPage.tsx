import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import { applyJob, getJobsByIdToCandiDate } from "../../../API/apis";
import { getOptionLabel } from "../../../components/Select/options";
import { scheduleOptions } from "../../Employer/Auth/SignUp/options";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary_min: string;
  salary_max: string;
  requirements: string;
  status: "active" | "closed";
  job_type: "fulltime" | "parttime" | "contract";
  workplace_type: "onsite" | "remote" | "hybrid";
  application_status: "pending" | "approved" | "rejected";
  client_details: {
    id: string;
    email: string;
    company_name: string;
    industry: string;
    company_size: string;
    headquarters_location: string;
    avatar?: string;
  };
  vacancy?: number;
  schedule?: string;
  required_skills:string[]
  created_at: string |any;
}

const JobByIdPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [salaryExpectation, setSalaryExpectation] = useState<number | string>("");
  const [error, setError] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchJobById(id);
    }
  }, [id]);

  const fetchJobById = async (jobId: string) => {
    try {
      setLoading(true);
      const response = await axios({
        method: "get",
        url: `${getJobsByIdToCandiDate}/${jobId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response.data",response.data)
      setJob(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch job details.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      setLoading(true);
      await axios({
        method: "post",
        url: applyJob.replace("id", id!),
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          salary_expectation: salaryExpectation,
          job_id: id,
        },
      });
      setSalaryExpectation("");
      navigate("/candidate/dashboard/job-list");
    } catch (error) {
      console.error(error);
      setError("Failed to apply for the job.");
    } finally {
      setLoading(false);
      setIsApplying(false);
    }
  };

  // if (loading) return <Loader />;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
         <nav className="bg-gray-200 py-3 px-6">
            <Link to="/candidate/dashboard" className="text-blue-600 hover:underline">
              Dashboard
            </Link>{" "}
            /{" "}
            <Link to="/candidate/dashboard/job-list" className="text-blue-600 hover:underline">
              Jobs
            </Link>{" "}
            /{" "}
            <span>{job?.title}</span>
      </nav>
      {loading &&(
        <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-20">
          <Loader />
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="flex items-center p-6 border-b border-gray-200">
          {job?.client_details.avatar && (
            <img
              src={job.client_details.avatar||"s"}
              alt={`${job.client_details.company_name} Logo`}
              className="w-16 h-16 rounded-full mr-4"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold">{job?.title}</h1>
            <p className="text-gray-900 text-lg">{job?.client_details.company_name}</p>
            <p className="text-gray-900">{job?.location}</p>
            <p className="text-gray-900">Requirement {job?.vacancy}</p>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">About this Role</h2>
          <p className="text-gray-700 mb-6">{job?.description}</p>

          <h2 className="text-lg font-semibold mb-4">Qualifications</h2>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            {job?.requirements.split(".").map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold mb-4">Job Information</h2>
          <p className="text-gray-700 space-x-2">
            <span className="font-semibold">Type:</span >  <span className="capitalize ">{job?.job_type}</span>
          </p>
          <p className="text-gray-700 space-x-2">
            <span className="font-semibold">Workplace:</span>{" "}
            <span className="capitalize ">{job?.workplace_type}</span>
          </p>
          <p className="text-gray-700 space-x-2">
            <span className="font-semibold">Shift and schedule</span>{" "}
            <span className="capitalize bg-gray-200 text-gray-700 rounded-full
                px-2 py-1 mr-2">{getOptionLabel(scheduleOptions ,job?.schedule)}</span>
          </p>
          <p className="text-gray-700 space-x-2">
            <span className="font-semibold">Pay:</span>{" "}
            <span>${job?.salary_min} - ${job?.salary_max} a year</span>
          </p>
          {job?.required_skills.length &&(
            <div className="text-gray-700 space-x-2">
              <span className="font-semibold">Required Skills:</span>{" "}
              {job?.required_skills.map((skill:string)=>{
                return <span key={skill} className="bg-gray-200 text-gray-700 rounded-full
                px-2 py-1 mr-2">{skill}</span>
              })}
              </div>
          )}
          <p className="text-gray-700 space-x-2">
            <span className="font-semibold">Posted on:</span>{" "}
            <span> {new Date(job?.created_at).toLocaleDateString()}</span>
          </p>
        </div>

        {/* Footer Section */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <button
            onClick={() => setIsApplying(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Apply Modal */}
      {isApplying && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 max-w-lg">
            <h2 className="text-xl font-bold mb-4">Apply for {job?.title}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleApply();
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Salary Expectation (LPA)
                </label>
                <input
                  type="number"
                  value={salaryExpectation}
                  onChange={(e) => setSalaryExpectation(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setIsApplying(false)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobByIdPage;
