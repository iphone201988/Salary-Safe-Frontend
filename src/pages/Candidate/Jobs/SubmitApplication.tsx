import React, { useEffect, useState } from "react";
import axios from "axios";
import SubmittedJobApplication from "../../../components/Table/SubmittedJobApplication";
import { columnsSubmittedApplication } from "./Options";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import { submittedApplication } from "../../../API/apis";
import { getOptionText, jobTypeOptions, workplaceTypeOptions } from "../../../components/Select/options";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../../Redux/reducer/userData";
import { logout } from "../../../Redux/reducer/authSlice";


interface Application {
  id: string;
  job_id: string;
  candidate_id: string;
  status:string;
  title: string;
  workplace_type: string |undefined;
  job_type: string |undefined;
  company_name: string;
  location: string; 
  created_at: string;
}
  

const SubmittedApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [_error, setError] = useState<any>("");
  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function getData(): Promise<any> {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method: "get",
        url: `${submittedApplication}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("log",response)
      if (response.status === 200) {
        const data = response.data?.data || [];
        const formattedApplications = data.map((item: any): Application => ({
          title: item.job_details.title,
          location: item.job_details.location,
          status: item.status,
          job_type: getOptionText(jobTypeOptions,item.job_details.job_type),
          workplace_type: getOptionText(workplaceTypeOptions,item.job_details.workplace_type),
          company_name: item.job_details.client_details.company_name,
          created_at: item.created_at,
          candidate_id: item.candidate_id,
          job_id: item.job_id,
          id:item.id
        }));
        setApplications(formattedApplications);
      } else {
        setApplications([]);
      }
    } catch (error: any) {
      console.log("error submittedApplication",error);
      if(error.response.status ===401){
        dispatch(clearUserData());
        dispatch(logout());
        navigate("/login-employee");
      toast.error(error.response.data.message);
        }
      setError(error.response?.data?.message || error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  // if (loading) {
  //   return <Loader />;
  // }
  console.log("applications",applications)
  return (
    <div className="min-h-screen flex flex-col ">
      <nav className="bg-gray-200 py-3 px-6">
        <Link to="/candidate/dashboard" className="text-blue-600 hover:underline">
          Dashboard
        </Link>{" "}
        /{" "}
        <span>Submit Applications</span>
      </nav>
      <main className=" p-4 container mx-auto bg-white">
      {loading &&(
        <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-20">
          <Loader />
        </div>
      )}
        <SubmittedJobApplication
          columns={columnsSubmittedApplication}
          rows={applications}
          showActionButtons={true}
        />
      </main>
    </div>
  );
};

export default SubmittedApplicationsPage;
