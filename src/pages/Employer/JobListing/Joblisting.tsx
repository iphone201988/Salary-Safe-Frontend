import { useEffect, useState } from "react";
import { createJobs, getClientJobs } from "../../../API/apis";
import Loader from "../../../components/Loader/Loader";
import { useSelector } from "react-redux";
import StickyHeadTable from "../../../components/Table/StickyHeadTable";
import JobsModal from "../../../components/Modal/JobsModal";
import useApiCall from "../../../API/function"; // Adjust path
import { columnJobType, columnsName, Job } from "./Options";
import DeleteConformModel from "../../../components/Modal/DeleteConformModel";
import ViewModel from "../../../components/Modal/ViewModel";
import {
  getOptionText,
  jobTypeOptions,
  workplaceTypeOptions,
} from "../../../components/Select/options";
import { Link } from "react-router-dom";

const JobListings = () => {
  const { apiCall, loading } = useApiCall();

  const [jobDetails, setJobDetails] = useState<Job>({
    title: "",
    description: "",
    requirements: "",
    location: "",
    job_type: "",
    workplace_type: "",
    salaryRange: [50000, 150000],
    isNegotiable: false,
  });

  const [jobList, setJobList] = useState<Job[]>([]); // Explicitly type the jobList state
  const [rowData, setRowData] = useState<columnJobType>(); // Explicitly type the jobList state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalView, setIsModalView] = useState(false);
  //   const [loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const token = useSelector((state: any) => state.auth.token);

  const handleDelete = (data: any) => {
    console.log("Job deleted", data);
    setIsDelete(false);
    deleteJob(data?.id);
  };

  const handleCancel = () => {
    setIsDelete(false);
  };
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setJobDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleEditChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setRowData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const fetchJobs = async () => {
    try {
      const jobs = await apiCall("get", getClientJobs);
      console.log("Fetched jobs:", jobs);
      setJobList(jobs.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };
  const deleteJob = async (id: string) => {
    try {
      await apiCall("delete", `${createJobs}${id}`);
      console.log(`Job ${id} deleted successfully.`);
      fetchJobs();
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, [token]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // setJobList((prev) => [...prev, jobDetails]); // Add job to the list
    try {
      const data = {
        title: jobDetails.title,
        description: jobDetails.description,
        location: jobDetails.location,
        salary_min: jobDetails.salaryRange[0],
        salary_max: jobDetails.salaryRange[1],
        requirements: jobDetails.requirements,
        job_type: jobDetails.job_type,
        workplace_type: jobDetails.workplace_type,
        schedule: jobDetails.schedule,
        status: jobDetails.status,
        vacancy: jobDetails.vacancy,
        views: jobDetails.views,
      };
      await apiCall("post", createJobs, data);
      fetchJobs();
      setJobDetails({
        title: "",
        description: "",
        requirements: "",
        location: "",
        job_type: "",
        workplace_type: "",
        salaryRange: [50000, 150000], // Default min and max values
        isNegotiable: false,
      });
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    // setJobList((prev) => [...prev, jobDetails]); // Add job to the list
    try {
      const data = {
        title: rowData?.title,
        description: rowData?.description,
        location: rowData?.location,
        salary_min: rowData?.salaryRange[0],
        salary_max: rowData?.salaryRange[1],
        requirements: rowData?.requirements,
        job_type: rowData?.job_type,
        workplace_type: rowData?.workplace_type,
        schedule: rowData?.schedule,
        status: rowData?.status,
        vacancy: rowData?.vacancy,
        views: rowData?.views,
      };
      await apiCall("patch", ` ${createJobs}${rowData?.id}`, data);
      fetchJobs();
      setIsModalEditOpen(false); // Close the modal
    } catch (error) {
      console.log(error);
    }
  };
  const handleSalaryChange = (values: number[]) => {
    setJobDetails((prev: any) => ({
      ...prev,
      salaryRange: values,
    }));
  };
  const handleEditSalaryChange = (values: number[]) => {
    setRowData((prev: any) => ({
      ...prev,
      salaryRange: values,
    }));
  };
  // console.log("jobList", jobList);
  const truncateDescription = (description: string, wordLimit: number) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "..."; // Truncate and append "..."
    }
    return description;
  };
  const mappedJobs = jobList.map((job) => ({
    ...job,
    salaryRange: [job.salary_min, job.salary_max],
    salaryRanges: `$${job.salary_min} - $${job.salary_max}`,
    desc: truncateDescription(job?.description, 8),
    require: truncateDescription(job?.requirements, 8),
    created_at: job?.created_at?.slice(0, 10),
    job_type_: getOptionText(jobTypeOptions, job.job_type),
    workplace_type_: getOptionText(workplaceTypeOptions, job.workplace_type),
  }));
  // console.log("mappedJobs",mappedJobs)
  console.log("IsModalEditOpen", isModalEditOpen);
  return (
    <div className="container mx-auto ">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-20">
          <Loader />
        </div>
      )}
      <nav className="bg-gray-200 py-3 px-6">
        <Link
          to="/employeer/dashboard"
          className="text-blue-600 hover:underline"
        >
          Dashboard
        </Link>{" "}
        / <span>Job Listings</span>
      </nav>
      <div className="p-4">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-2xl font-semibold">Job Listings</h3>
          {/* Create Job Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Create Job
          </button>
        </div>
        <StickyHeadTable
          columns={columnsName}
          rows={mappedJobs}
          showActionButtons={true}
          setIsUpdate={setIsModalEditOpen}
          setIsView={setIsModalView}
          setIsDelete={setIsDelete}
          setRowData={setRowData}
          deleteJob={deleteJob}
          tableHeight={580}
        />
      </div>

      {/* Modal for Job Creation */}
      {isModalOpen && (
        <JobsModal
          handleSubmitJob={handleSubmit}
          data={jobDetails}
          handleChange={handleChange}
          handleSalaryChange={handleSalaryChange}
          setModelopen={setIsModalOpen}
          title="Create Job"
        />
      )}
      {isModalEditOpen && (
        <JobsModal
          handleSubmitJob={handleEditSubmit}
          data={rowData!}
          handleChange={handleEditChange}
          handleSalaryChange={handleEditSalaryChange}
          setModelopen={setIsModalEditOpen}
          title="Edit Job"
        />
      )}
      {isModalView && (
        <ViewModel data={rowData!} setModelopen={setIsModalView} />
      )}
      {isDelete && (
        <DeleteConformModel
          onCancel={handleCancel}
          onConfirm={() => handleDelete(rowData)}
        />
      )}
    </div>
  );
};

export default JobListings;
