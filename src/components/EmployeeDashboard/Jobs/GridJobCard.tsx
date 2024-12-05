import React from "react";
import { useNavigate } from "react-router-dom";
// import { useRedirection } from "../../../../Context/RedirectContext";
// import { applyJob } from "../../../../Redux/ApplyJobSlice";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
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
  // const { redirectToApplyPage } = useRedirection();
  const navigator = useNavigate()

  // const dispatch = useDispatch();
  // const appliedJob = useSelector((state) => state.appliedJob.appliedJob);

  // const handleCardClick = () => {
  //   redirectToApplyPage();

  //   if (!appliedJob) {
  //     dispatch(applyJob(job.id)); // Using `id` field
  //   } else {
  //     toast.error("You have already applied to this job");
  //   }
  // };

  return (
    <div
    onClick={()=>navigator(`/candidate/dashboard/job-list/${job?.id}`)}
      className="p-3 bg-white h-[280px] max-lg:w-[343px] max-lg:justify-center max-lg:items-center w-[277px] cursor-pointer border-2 border-gray-400 mt-10 font-extrabold shadow border-solid dark:bg-[#ffffff] dark:border-[#ffffff]"
    >
      {/* Job Header */}
      <div className="flex justify-between">
        <img
          src={"https://via.placeholder.com/44"} // Placeholder for company logo
          alt={job?.client_details?.company_name || "Company Logo"}
          className="h-[44px] w-[44px] rounded-full"
        />

        <div>
          <button
            type="button"
            className="text-[#56cdad] bg-[#effaf7] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-[#effaf7] dark:hover:bg-[#effaf7] dark:focus:ring-blue-800"
          >
            {job?.job_type || "Job Type"}
          </button>
          <button
            type="button"
            className="text-[#56cdad] bg-[#effaf7] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-[#effaf7] dark:hover:bg-[#effaf7] dark:focus:ring-blue-800"
          >
            {job?.workplace_type || "Job Type"}
          </button>
        </div>
      </div>

      {/* Job Title */}
      <h5 className="mb-2 text-[20px] font-semibold tracking-tight text-gray-900 dark:text-[#25324b]">
        {job?.title || "Job Title"}
      </h5>

      {/* Company and Location */}
      <div className="flex font-normal">
        <div className="mr-3 text-gray-400">{job?.client_details?.company_name || "N/A"}</div>
        <div className="text-gray-400">{job?.location || "Location not specified"}</div>
      </div>

      {/* Salary */}
      <div className="mt-2 text-gray-500">
        <span>
          Salary: ${job?.salary_min || "N/A"} - ${job?.salary_max || "N/A"}
        </span>
      </div>

      {/* Job Description */}
      <p className="mt-3 text-gray-500 line-clamp-3">{job?.description || "No description available."}</p>

      {/* Job Status */}
      <div className="text-gray-500 mt-2">
        <span className={`font-bold ${job?.status === "active" ? "text-green-600" : "text-red-600"}`}>
          {job?.status === "active" ? "Hiring" : "Closed"}
        </span>
      </div>
    </div>
  );
};

export default GridJobCard;
