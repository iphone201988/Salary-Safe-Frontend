import React, { useEffect, useState } from "react";
import CardShowDashboard from "../Dashboard/DashboardSummary/CardShowDashboard";
// import MarketSalaryChart from "./Market-Salary/MarketSalary";
// import HistoryOfRoles from "./HistroyRoles/HistoryRoles";
// import TopCompaniesChart from "../Dashboard/DashboardSummary/TopComapanyJobCount";
// import PieChart from "../Dashboard/DashboardSummary/PieChart";
import axios from "axios";
// import { candidateDashboard, getJobsToCandiDate } from "../../API/apis";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { clearUserData } from "../../Redux/reducer/userData";
// import { logout } from "../../Redux/reducer/authSlice";
import BarChart from "../Charts/BarChart";
import PieChart from "../Charts/PieChart";
// import LineChart from "../Charts/LineChart";
import HorizontalBarChart from "../Charts/HorizontalBarChart";
import ApplicationHistory from "./ApplicationHistory";
interface JobDetails {
  salary_min: string;
  salary_max: string;
  status: string;
  requirements: string;
  views: number;
  required_skills: string[];
  is_salary_negotiable: boolean;
  job_type: string;
  id: string;
  description: string;
  workplace_type: string;
  client_id: string;
  title: string;
  schedule: string;
  created_at: string;
  location: string;
  updated_at: string;
}

interface ApplicationHistoryItem {
  id: string;
  status: string;
  salary_expectation: string;
  job_details: JobDetails;
}
interface CandidateDashboardData {
  trending_roles: { title: string; applications: number }[];
  industry_trends: { industry: string; growth_rate: number }[];
  salary_evolution: { month: string; average_salary: string }[];
  recommended_jobs: {
    id: string;
    title: string;
    companyName: string;
    location: string;
    salary: string;
    jobType: string;
    description: string;
  }[];
  application_history: ApplicationHistoryItem[];
  engagement_data: {
    total_applications: number;
    rejected_applications: number;
    pending_applications: number;
    accepted_applications: number;
  };
}
const DashboardSummary: React.FC = () => {
  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
    
  const [candidateDashboard, setCandidateDashboard] =
      useState<CandidateDashboardData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  async function fetchDashboardData() {
    try {
      const response = await axios.get(
        "https://salarysafe.ai/api/v1/candidates/dashboard/metrics",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setCandidateDashboard(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch dashboard data.");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loader />;
  }


  if (error) {
    return <div>Error: {error}</div>;
  }

  // console.log("dashboardData", dashboardData);
  const handleShowMore = () => {
    navigate("candidate/dashboard/job-list")
  };
  function generateColorCombinations(count: number): string[] {
    const colors: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
      colors.push(randomColor());
    }
  
    return colors;
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Candidate Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <CardShowDashboard title="Total Applications" data={`${candidateDashboard?.engagement_data.total_applications}`} />
          <CardShowDashboard title="Pending Applications" data={`${candidateDashboard?.engagement_data.pending_applications}`} />
          <CardShowDashboard title="Accepted Applications" data={`${candidateDashboard?.engagement_data.accepted_applications}`} />
          <CardShowDashboard title="Rejected Applications" data={`${candidateDashboard?.engagement_data.rejected_applications}`} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
          <BarChart
            labels={
              candidateDashboard?.salary_evolution.map((view) => view.month) || []
            }
            datasets={[
              {
                label: "salary",
                data:
                  candidateDashboard?.salary_evolution.map((view) => Number(view.average_salary)) ||
                  [],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ]}
            title="Salary Evolution"
          />
        </div>
    
         <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
          <PieChart
            labels={
              candidateDashboard?.trending_roles.map((role) => role.title) || []
            }
            dataValues={
              candidateDashboard?.trending_roles.map(
                (role) => role.applications
              ) || []
            }
            backgroundColors={generateColorCombinations(candidateDashboard?.trending_roles.length??0)}
            title="Applications"
          />
            
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
          <HorizontalBarChart
            labels={
              candidateDashboard?.industry_trends.map((role) => role.industry) ||
              []
            }
            datasets={[
              {
                label: "Industry",
                data:
                candidateDashboard?.industry_trends.map(
                    (role) => role.growth_rate
                  ) || [],
                backgroundColor: "rgba(153, 102, 255, 0.6)",
              },
            ]}
            title="Industry Trends"
          />
        </div>
        {/* <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
          <LineChart
            labels={
              clientDashboard?.salary_competitiveness.map(
                (trend) => trend.title
              ) || []
            }
            datasets={[
              {
                label: "Competitive(%)",
                data:
                  clientDashboard?.salary_competitiveness.map((trend) =>
                    Number(trend.competitiveness)
                  ) || [],
                borderColor: "rgba(5, 19, 192, 1)",
              },
            ]}
            title="Salary Competitiveness"
          />
        </div> */}
      </div>
      {candidateDashboard && candidateDashboard.recommended_jobs.length > 0 &&(
        <div className="bg-white mb-4 p-5">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-start">
        Recommended Jobs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {candidateDashboard?.recommended_jobs.slice(0, 10).map((job) => (
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
      { (candidateDashboard?.recommended_jobs?candidateDashboard?.recommended_jobs.length:0)>10 && ( // Show button only if there are more jobs to display
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
      )}
    {candidateDashboard && candidateDashboard.application_history.length > 0 &&(
        <div className="bg-white mb-4">
        <ApplicationHistory applicationHistory={candidateDashboard?.application_history} />
    </div>
    )}
        {/* <HistoryOfRoles /> */}
      </div>
    </div>
  );
};

export default DashboardSummary;
