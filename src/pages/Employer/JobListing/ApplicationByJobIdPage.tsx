import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import JobApplicantsTable from "../../../components/Table/JobApplicantsTable";
import { jobApplicantsColumns } from "./Options";
import ViewModel from "../../../components/Modal/ViewModel";
import { getAllCandidateApplyOnJob } from '../../../API/apis';
import useApiCall from '../../../API/function';

const ApplicationByJobIdPage = () => {
  const { apiCall,/*  loading, error  */} = useApiCall();
  const { id } = useParams<{ id: string }>();
  const [_data, setData] = useState([]);
  const [rowData,setRowData]=useState();
  const [isModalView, setIsModalView] = useState(false);
  const fetchJobs = async () => {
    try {
      const jobs = await apiCall("get", getAllCandidateApplyOnJob.replace(":job_id",id!));
      console.log("Fetched jobs:", jobs);
      setData(jobs.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };
  useEffect(()=>{
   fetchJobs();
  },[])
  return (
    <div className='min-h-screen mx-auto bg-white'>
      <h1 className="text-3xl font-bold p-4 text-white bg-[#1B1035]">Applications for Job ID: {id}</h1>
      {/* navigator perivous page */}
      <button className="bg-[#1B1035] hover:bg-[#1B103
      35] text-white font-bold py-2 px-4 rounded">
        <Link to="/employeer/dashboard/job-listing">Back</Link>
      </button>
      <div className="flex justify-between items-center mx-4 px-4">
      <JobApplicantsTable
        columns={jobApplicantsColumns}
        rows={[{
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "full_name": "string",
          "email": "user@example.com",
          "phone_number": "string",
          "location": "string",
          "current_job_title": "string",
          "linkedin_profile_url": "string",
          "job_titles_of_interest": "string",
          "total_years_of_experience": 0,
          "education_level": "string",
          "key_skills": [
            "string","string"
          ],
          "actions":<>demo</>
        }]}
        tableHeight={580}
        showActionButtons={true}
        setRowData={setRowData}
        setIsView={setIsModalView}
      />
      
      </div>
       {isModalView && (
        <ViewModel
          data={rowData!}
          setModelopen={setIsModalView}
        />
      )}
    </div>
  );
};

export default ApplicationByJobIdPage;
