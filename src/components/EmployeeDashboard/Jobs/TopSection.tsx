// import {useState } from 'react'
// import SelectLocation from '../../../component/Dropdown'
import { TextField } from '@mui/material'
import { FiSearch } from 'react-icons/fi'
import { CiLocationOn } from 'react-icons/ci'
// import Filter from '../../Find-Job/Filter/Filter'
import AllJobs from './AllJobs';
// import "./style.css";
// import {useDispatch,useSelector} from "react-redux";
// import { setJobSearch } from '../../../Redux/filterSlice'
// import { getAllJobs } from '../../../Redux/alljobsSlice'
// import { apiUrl } from '../../../Api/apiList'
// import { getMethod } from '../../../Api/ApiResponse'


const TopSection = () => {
//   const dispatch = useDispatch();
//   const jobSearch = useSelector((state)=>state.filter.jobSearchtext);
//   const jobpageIndustry = useSelector((state) => state.filter.JobPageIndustry)
//   const employmentType = useSelector((state) => state.filter.employment)
//   const salaryRange = useSelector((state) => state.filter.salaryRange)
//   const jobsSorting = useSelector((state) => state.filter.jobsSorting)
//   const [viewMode, setViewMode] = useState("list");



//   const toggleViewMode = (mode) => {
//     setViewMode(mode);
//   };



//   const fetchJob = async () => {
//     const token = localStorage.getItem("token");
//     const queryString = `?industry[]=${jobpageIndustry.join('&industry[]=')}&employment[]=${employmentType.join('&employment[]=')}&salaryRange[]=${salaryRange.join('&salaryRange[]=')}&sort=${jobsSorting}&search=${encodeURIComponent(jobSearch)}`;
//     const url = `${apiUrl}users/allJobs${queryString}`;

//     try {
//       const res = await getMethod(url, {}, token);
//       if (res) {
//         dispatch(getAllJobs(res.data.data));
//       }
//     } catch (error) {
//       console.log("error while fetching jobs");
//     }
//   };

//   useEffect(() => {
//     fetchJob();
//   }, [salaryRange, employmentType, jobpageIndustry, jobsSorting]);


//   const handleSearchTextChange = (event:any) => {
//     dispatch(setJobSearch(event.target.value));
//   };

//   const handleSearch = async () => {
//     fetchJob();
//   };
  return (
    <div className='scrollbar overflow-y-auto h-[100%]'>
        <div className="h-[70px] flex bg-[#ffffff] border border-gray-300 text-center mx-auto mt-10 p-1 relative z-20">
            <div className="text-black flex justify-between w-[30%]">
              <FiSearch className="mt-7 mr-5 ml-2" />
              <TextField
                id="standard-basic"
                label="Job Title"
                variant="standard"
                className="mt-[-3px]"
                style={{ width: "260px" }}
                // onChange={handleSearchTextChange}
              />
            </div>
            <div className="text-black flex justify-between w-[30%]">
              <CiLocationOn className="mt-5 ml-4 mr-4 "  />
              <TextField
                id="standard-basic"
                label="Company Name"
                variant="standard"
                className="mt-[-3px]"
                style={{ width: "260px" }}
                // onChange={handleSearchTextChange}
              />
            </div>
            <div className="text-black flex justify-between w-[30%]">
              <CiLocationOn className="mt-5 ml-4 mr-4 "  />
              <TextField
                id="standard-basic"
                label="Location"
                variant="standard"
                className="mt-[-3px]"
                style={{ width: "260px" }}
                // onChange={handleSearchTextChange}
              />
            </div>
            
            <button
            // onClick={handleSearch}
              type="button"
              className="text-white w-[30%] nav_button mt-2 p-4 font-bold ml-[3vw] text-[20px] h-[50px]  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-yellow-400 relative"
              
            >
              Search
            </button>
          </div>
          <hr className="h-px bg-gray-200 border-0 dark:bg-gray-300 max-w-full" />

          <div className="w-[100%] h-[1350px] mx-auto mb-[30px]">
        <div className="flex w-[100%] h-[100%] justify-around">
       {/*    <div className="filter pl-5 pt-12  w-[17%] ">
            <Filter use={"2"}/>
          </div> */}
          <div className="job_content w-[80%]">
            <AllJobs jobs={[]} />
          </div>
        </div>
      </div>
        </div>
  )
}

export default TopSection