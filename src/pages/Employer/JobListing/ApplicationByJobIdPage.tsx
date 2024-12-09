import { Link, useParams } from "react-router-dom";
import {useEffect, useState } from "react";
import JobApplicantsTable from "../../../components/Table/JobApplicantsTable";
import { jobApplicantsColumns } from "./Options";
import CandiadteDetailModal from "../../../components/Modal/CandiadteDetailModal";
import { getAllCandidateApplyOnJob } from "../../../API/apis";
import useApiCall from "../../../API/function";
import { RootState } from "../../../Redux/store";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";

const ApplicationByJobIdPage = () => {
  const { apiCall,loading } = useApiCall();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState([]);
  const [rowData, setRowData] = useState();
  const [isModalView, setIsModalView] = useState(false);

  const { jobDetailInApplication } = useSelector((state: RootState) => state.JobDetails);

  // Fetch job applications
  const fetchJobs = async () => {
    try {
      const jobs = await apiCall("get", getAllCandidateApplyOnJob.replace(":job_id", id!));
      console.log("Fetched jobs::::", jobs);

      const formatData = jobs.data.map((job: any) => ({
        ...job,
        candidateName: job?.candidate_details?.full_name,
        candidateEmail: job?.candidate_details?.email,
        candidatePhone: job?.candidate_details?.phone || "N/A",
        candidateCurrentJobTitle: job?.candidate_details?.current_job_title,
        candidateLocation: job?.candidate_details?.location,
        candidateExperience: job?.candidate_details?.total_years_of_experience
          ? `${job?.candidate_details?.total_years_of_experience} Years`
          : "0 year",
        candidateEducationLevel: job?.candidate_details?.education_level || "None", 
      }));

      setData(formatData);

    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-20">
          <Loader />
        </div>
      )}
      {/* Header Section */}

      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-200 py-3 px-6">
        <Link to="/employeer/dashboard" className="text-blue-600 hover:underline">
          Dashboard
        </Link>{" "}
        /{" "}
        <Link to="/employeer/dashboard/job-listing" className="text-blue-600 hover:underline">
          Job Listings
        </Link>{" "}
        / <span>{jobDetailInApplication.title}</span>
      </nav>

      {/* Job Details Section */}
      <section className="bg-white p-6 ">
        <div className=" flex justify-between">
          <div>
        <h2 className="text-xl font-semibold mb-1 relative">{jobDetailInApplication.title} <span className={`text-xs text-pretty absolute ml-2 ${jobDetailInApplication?.status=="active"? "text-green-500":"text-gray-500 line-through" } capitalize`}>{jobDetailInApplication.status}</span></h2>
        <p className="text-gray-600 ml-2">
         {jobDetailInApplication.location}
        </p>
          </div>
        <p className="text-gray-600 mb-2">
          <strong>Posted Date:</strong> {jobDetailInApplication.postedDate}
        </p>
        </div>
      </section>

      {/* Applications Table */}
      <section className="mx-6 mt-1">
        <JobApplicantsTable
          columns={jobApplicantsColumns}
          rows={data}
          tableHeight={580}
          showActionButtons={true}
          setRowData={setRowData}
          setIsView={setIsModalView}
        />
      </section>

      {/* Modal for Candidate Details */}
      {isModalView && (
        <CandiadteDetailModal
          data={rowData}
          setModal={setIsModalView}
        />
      )}
    </div>
  );
};

export default ApplicationByJobIdPage;
