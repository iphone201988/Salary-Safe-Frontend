import React, { useEffect, useState } from "react";
import CardShowDashboard from "../Dashboard/DashboardSummary/CardShowDashboard";
// import MarketSalaryChart from "./Market-Salary/MarketSalary";
import HistoryOfRoles from "./HistroyRoles/HistoryRoles";
import TopCompaniesChart from "../Dashboard/DashboardSummary/TopComapanyJobCount";
import PieChart from "../Dashboard/DashboardSummary/PieChart";
import axios from "axios";
import { candidateDashboard, getJobsToCandiDate } from "../../API/apis";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../Redux/reducer/userData";
import { logout } from "../../Redux/reducer/authSlice";
interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  salary: string | number;
  jobType: string;
  description: string;
}
const DashboardSummary: React.FC = () => {
  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const [visibleJobs, setVisibleJobs] = useState(6);
  const [dashboardData, setDashboardData] = useState({
    jobCount: 0,
    top_companies: [],
    salary_distribution: [],
    job_type_distribution: [],
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  async function getDashboardData() {
    try {
      const response = await axios({
        method: "post",
        url: `${candidateDashboard}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          job_type: "fulltime",
        },
      });
      console.log("response", response.data);
      if (response.status == 200) {
        setDashboardData(response.data);
      } else {
        setError("Failed to fetch dashboard data.");
      }
    } catch (err:any) {
      console.log("error candidateDashboard",err);
      if(err.response.status ===401){
        dispatch(clearUserData());
        dispatch(logout());
        navigate("/login-employee");
        toast.error(err.response.data.message);
      }
      setError("Error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }
  async function getRecommendedJobData() {
    try {
      const response = await axios({
        method: "get",
        url: `${getJobsToCandiDate}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response.data);
      if (response.status == 200) {
        setJobs(response.data.data);
      } else {
        setError("Failed to fetch dashboard data.");
      }
    } catch (err) {
      setError("Error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getDashboardData();
    getRecommendedJobData();
  }, []);

  if (loading) {
    return <Loader />;
  }


  if (error) {
    return <div>Error: {error}</div>;
  }

  // console.log("dashboardData", dashboardData);

  const handleShowMore = () => {
    setVisibleJobs((prev) => prev + 6); // Show 6 more jobs each time
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Candidate Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <CardShowDashboard title="Job Title" data="Developer" />
          <CardShowDashboard title="Employment Type" data="Full-Time" />
          <CardShowDashboard
            title="Date"
            data={new Date().toISOString().split("T")[0]}
          />
          <CardShowDashboard title="Company" data="Techwin Labs LLP" />
          <CardShowDashboard
            title="Location and Currency"
            data="Mohali, Punjab"
          />
          <CardShowDashboard
            title="Your Salary Range"
            data="$5000"
            percentage="5.2"
          />
        </div>
        <div className="m-5 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4 bg-white p-4" >
          <div className="">
            <TopCompaniesChart
              top_companies={dashboardData.top_companies}
              title="Top Companies"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <PieChart
              labels={dashboardData.salary_distribution.map(
                (item: any) => item.range
              )}
              dataValues={dashboardData.salary_distribution.map(
                (item: any) => item.count
              )}
              title="Salary Distribution"
            />
            <PieChart
              labels={dashboardData.job_type_distribution.map(
                (item: any) => item.job_type
              )}
              dataValues={dashboardData.job_type_distribution.map(
                (item: any) => item.count
              )}
              title="Job Type Distribution"
            />
          </div>
        </div>
        {/* <MarketSalaryChart /> */}
        <div className="bg-white mb-4">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
        Recommended Jobs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.slice(0, visibleJobs).map((job) => (
          <JobCard
            key={job.id}
            id={job.id}           
            title={job.title}
            companyName={job.companyName}
            location={job.location}
            salary={job.salary}
            jobType={job.jobType}
            description={job.description} // Long descriptions will be truncated to 50 words
          />
        ))}
      </div>
      {visibleJobs < jobs.length && ( // Show button only if there are more jobs to display
        <div className="text-center mt-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handleShowMore}
          >
            Show More
          </button>
        </div>
      )}
    </div>
        <HistoryOfRoles />
      </div>
    </div>
  );
};

export default DashboardSummary;
