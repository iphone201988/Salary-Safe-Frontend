import React, { useState } from "react";
import Many from "../../../assets/Many.png";
import Double from "../../../assets/Double.png";
import { Pagination, Stack } from "@mui/material";
import "./style.css";
import ApplyJobCard from "./ApplyJobCard";
import GridJobCard from "./GridJobCard";
// import { getAllJobs, setPage, settotalPage } from "../../../Redux/alljobsSlice";
// import { setJobSorting } from "../../../Redux/filterSlice";
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
  
  const AllJobs: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
    const [viewMode, setViewMode] = useState("list");
    const [page, setPage] = useState(1);
    const jobsPerPage = 3; // Jobs per page
  
    const toggleViewMode = (mode: string) => setViewMode(mode);
  
    // Paginate jobs for display
    const paginatedJobs = jobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);

//   const handleSortChange = (event:any) => {
//     dispatch(setJobSorting(event.target.value));
//   }

//   const fetchJob = async () => {
//     const token = localStorage.getItem("token");
//     const queryString = `?industry[]=${jobpageIndustry.join('&industry[]=')}&employment[]=${employmentType.join('&employment[]=')}&salaryRange[]=${salaryRange.join('&salaryRange[]=')}&sort=${jobsSorting}&page=${page}`;
//     const url = `${apiUrl}users/allJobs${queryString}`;

//     try {
//       const res = await getMethod(url, {}, token);
//       if (res) {
//         dispatch(getAllJobs(res.data.data));
//         dispatch(setPage(res.data.page));
//         dispatch(settotalPage(res.data.totalPages));
//       }
//     } catch (error) {
//       console.log("error while fetching jobs");
//     }
//   };

//   useEffect(() => {
//     fetchJob();
//   }, [salaryRange, employmentType, jobpageIndustry, jobsSorting]);


  return (
    <>
      <div className="flex  justify-between max-lg:gap-4 shadow-md border border-gray-200 rounded-lg">
        <div className="m-4 bg-[#ffffff] ">
          <div className="title text-[20px] font-bold">All Jobs</div>
          <div className="paragraph">Showing {jobs?.length} Results</div>
        </div>
        <div className="right flex max-lg:flex-col max-lg:mr-3">
          <div className="rleft flex justify-between mt-5">
            <div className="mt-2 max-lg:hidden">Sort by:</div>
            <div className="max-lg:mt-5">
              <div className="form-box mt-2 ml-1">
                <select className="rounded-sm border border-gray-500" name="sortOption" id="sortOption" /* value={jobsSorting} onChange={handleSortChange} */>
                  <option value="latest">Most Relevant</option>
                  <option value="asecByName">From A to Z</option>
                  <option value="dsecByName">From Z to A</option>
                  <option value="old">Oldest Job Post</option>
                </select>
              </div>
            </div>
          </div>
         
          <div className="h-[30px] border-r-2 border-gray-400 max-lg:hidden ml-4 mt-6">

          </div>
          <div className="rright flex mt-7 mr-5 ml-2 max-lg:hidden">
            <div
              className={`Grid h-[3vh] cursor-pointer ${viewMode === "grid" ? "bg-orange-500" : ""
                }`}
              onClick={() => toggleViewMode("grid")}
            >
              <img src={Many}alt="more" />
            </div>
            <div
              className={`List h-[3vh] ml-2 cursor-pointer ${viewMode === "list" ? "bg-orange-500" : ""
                }`}
              onClick={() => toggleViewMode("list")}
            >
              <img src={Double} alt="Doubleline"  className="text-white"/>
            </div>
          </div>
        </div>
      </div>

      
      {viewMode === "list" ? (
        <>
          {paginatedJobs.map((job, index) => (
            <ApplyJobCard key={index} job={job} />
          ))}
        </>
      ) : (
        <div className="flex flex-wrap gap-8 max-lg:justify-center max-lg:mt-4">
          {paginatedJobs.map((job, index) => (
            <GridJobCard key={index} job={job} />
          ))}
        </div>
      )}
      <div className=" flex justify-center text-center mt-7 lg:pb-[100px]">
        <Stack spacing={2}>
          <Pagination
            onChange={(_event, value) => setPage(value)}
            page={page}
            count={Math.ceil(jobs.length / jobsPerPage)}
            shape="rounded"
            sx={{
              '& .Mui-selected': {
                backgroundColor: '#4640dE',
                color: "#fff",
              },
              '& .Mui-selected:hover': {
                backgroundColor: '#4640DE',
              },
            }}
          />
        </Stack>
      </div>
    </>
  );
};

export default AllJobs;
