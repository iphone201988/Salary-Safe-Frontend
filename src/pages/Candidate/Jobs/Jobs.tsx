import React, { ChangeEvent, useEffect, useState } from "react";
// import { columnsName } from "./Options";
// import TableForCandiadteJob from "../../../components/Table/TableForCandiadteJob";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";
import { getJobsToCandiDate, getSearchJobsToCandiDate } from "../../../API/apis";
import AllJobs from "../../../components/EmployeeDashboard/Jobs/AllJobs";
import Select from "../../../components/Select/Select";
import { jobTypeOptions, workplaceTypeOptions } from "../../../components/Select/options";
interface SearchJob {
  job_title: string;
  job_type: string;
  company_name: string;
  workplace_type: string;
  min_salary: number;
  max_salary: number;
}
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

const JobMatchingPage: React.FC = () => {
  const [searchJob, setSearchJob] = useState<SearchJob>({
    job_title: '',
    job_type: '',
    company_name: '',
    workplace_type: '',
    min_salary: 0,
    max_salary: 0,
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const token = useSelector((state: any) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  //get data from api
  function getData(): Promise<any> {
    setLoading(true);
    setError(null);
    return axios
      .get(getJobsToCandiDate, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        setJobs(response.data.data); // Axios response data is accessed with `response.data`
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        // setJobs(dummyJobs);
        setError(error.response?.data?.message || error.message); // Capture error message
      });
  }
  useEffect(() => {
    getData();
  }, []);

  // Dummy data
  // const dummyJobs = [
  //   {
  //     title: "Software Engineer",
  //     description: "Develop software solutions",
  //     location: "Remote",
  //     salary_min: "60000",
  //     salary_max: "90000",
  //     requirements: "JavaScript, React",
  //     status: "active",
  //     job_type: "fulltime",
  //     workplace_type: "remote",
  //     company_name: "TechCorp",
  //     created_at: "2019-08-24T14:15:22Z",
  //     id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  //   },
  //   {
  //     title: "Software Engineer",
  //     description: "Develop software solutions",
  //     location: "Remote",
  //     salary_min: "60000",
  //     salary_max: "90000",
  //     requirements: "JavaScript, React",
  //     status: "active",
  //     job_type: "fulltime",
  //     workplace_type: "remote",
  //     company_name: "TechCorp",
  //     created_at: "2019-08-24T14:15:22Z",
  //     id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  //   },
  //   {
  //     title: "Software Engineer",
  //     description: "Develop software solutions",
  //     location: "Remote",
  //     salary_min: "60000",
  //     salary_max: "90000",
  //     requirements: "JavaScript, React",
  //     status: "active",
  //     job_type: "fulltime",
  //     workplace_type: "remote",
  //     company_name: "TechCorp",
  //     created_at: "2019-08-24T14:15:22Z",
  //     id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  //   },
  //   {
  //     title: "Software Engineer",
  //     description: "Develop software solutions",
  //     location: "Remote",
  //     salary_min: "60000",
  //     salary_max: "90000",
  //     requirements: "JavaScript, React",
  //     status: "active",
  //     job_type: "fulltime",
  //     workplace_type: "remote",
  //     company_name: "TechCorp",
  //     created_at: "2019-08-24T14:15:22Z",
  //     id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  //   },
  // ];

  const handleSearch = async() => {
    setLoading(true);
    // Filter dummy data based on search criteria
    // const filteredJobs = jobs.filter((job) => {
    //   const matchesJobTitle =
    //     jobTitle === "" ||
    //     job.job_type.toLowerCase().includes(jobTitle.toLowerCase());
    //   const matchesJobType = job_type === "" || job.job_type === job_type;
    //   const matchesCompanyName =
    //     company_name === "" ||
    //     job.company_name.toLowerCase().includes(company_name.toLowerCase());
    //   const matchesWorkPlaceType =
    //     workplace_type === "" || job.workplace_type === workplace_type;
    //   const matchesMinSalary =
    //     salary_min === undefined || Number(job.salary_min) >= salary_min;
    //   const matchesMaxSalary =
    //     salary_max === undefined || Number(job.salary_max) <= salary_max;

    //   return (
    //     matchesJobTitle &&
    //     matchesJobType &&
    //     matchesCompanyName &&
    //     matchesWorkPlaceType &&
    //     matchesMinSalary &&
    //     matchesMaxSalary
    //   );
    // });
    // form api response
    try {
      const filteredSearchJob = Object.fromEntries(
        Object.entries(searchJob).filter(
          ([_, value]) => value !== undefined && value !== "" && value !== 0
        )
      );
      console.log(filteredSearchJob);
      const response = await axios({
        method:"post",
        url:getSearchJobsToCandiDate,
        data: filteredSearchJob,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.status ==200){
        console.log(response.data)
        setJobs(response.data.data||[]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);

      
    }
  };
  const handleSearchChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchJob({ ...searchJob, [e.target.name]: e.target.value });
  };
  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-white ">
      {/* Fixed Navigation */}
      <nav className="fixed top-0  right-6 w-[80vw] bg-white shadow p-4 z-10">
        <div className="container mx-auto grid grid-cols-7 gap-6 items-center">
          {/* Job Title Input */}
          <input
            type="text"
            placeholder="Job Title"
            name="job_title"
            value={searchJob?.job_title}
            onChange={handleSearchChange}
            className="border rounded p-2 col-span-1"
          />
          {/* Job Type Selector */}
          <Select value={searchJob?.job_type} name={"job_type"} onChange={handleSearchChange} className="border rounded p-2 col-span-1" options={jobTypeOptions}/>
          {/* Company Name Input */}
          <input
            type="text"
            placeholder="Company Name"
            name="company_name"
            value={searchJob?.company_name}
            onChange={handleSearchChange}
            className="border rounded p-2 col-span-1"
          />
          {/* Work Place Type Selector */}
          <Select value={searchJob?.workplace_type} name={"workplace_type"} onChange={handleSearchChange} className="border rounded p-2 col-span-1" options={workplaceTypeOptions}/>
          {/* Min Salary Input */}
          <input
            type="number"
            placeholder="Min Salary"
            name="min_salary"
            value={searchJob?.min_salary}
            onChange={handleSearchChange}
            className="border rounded p-2 col-span-1"
          />
          {/* Max Salary Input */}
          <input
            type="number"
            placeholder="Max Salary"
            value={searchJob?.max_salary}
            name="max_salary"
            onChange={handleSearchChange}
            className="border rounded p-2 col-span-1"
          />
          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 col-span-1"
          >
            Search
          </button>
        </div>
      </nav>

      {/* Main Body */}
      <main className="mt-20 p-4 container mx-auto shadow-md border border-gray-200 rounded-lg">
      {/* <TableForCandiadteJob columns={columnsName} rows={jobs} showActionButtons={true} /> */}
        {/* <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">Job Title</th>
              <th className="border px-4 py-2">Job Type</th>
              <th className="border px-4 py-2">Company Name</th>
              <th className="border px-4 py-2">Workplace Type</th>
              <th className="border px-4 py-2">Min Salary</th>
              <th className="border px-4 py-2">Max Salary</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{job.jobTitle}</td>
                  <td className="border px-4 py-2">{job.job_type}</td>
                  <td className="border px-4 py-2">{job.company_name}</td>
                  <td className="border px-4 py-2">{job.workplace_type}</td>
                  <td className="border px-4 py-2">{job.salary_min}</td>
                  <td className="border px-4 py-2">{job.salary_max}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No jobs found. Please refine your search.
                </td>
              </tr>
            )}
          </tbody>
        </table> */}
        <AllJobs jobs={jobs}/>
      </main>
    </div>
  );
};

export default JobMatchingPage;
