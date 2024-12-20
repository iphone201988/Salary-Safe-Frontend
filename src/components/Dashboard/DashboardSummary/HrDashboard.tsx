import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import BarChart from "../../Charts/BarChart";
import PieChart from "../../Charts/PieChart";
import LineChart from "../../Charts/LineChart";
import CardShowDashboard from "./CardShowDashboard";
// import HistoryOfRoles from "./HistoryRoles";
import HorizontalBarChart from "../../Charts/HorizontalBarChart";
import Loader from "../../Loader/Loader";
interface CandidateDashboardData {
  candidate_views: CandidateView[];
  role_performance: RolePerformance[];
  salary_competitiveness: SalaryCompetitiveness[];
  budget_impact: BudgetImpact[];
  application_conversion_rate: ApplicationConversionRate[];
  top_performing_roles: TopPerformingRole[];
  engagement_data: EngagementData;
  job_trends: JobTrend[];
}

interface CandidateView {
  title: string;
  views: number;
}

interface RolePerformance {
  role: string;
  applications: number;
}

interface SalaryCompetitiveness {
  title: string;
  competitiveness: string; // Assuming competitiveness is a percentage in string format
}

interface BudgetImpact {
  title: string;
  avg_salary: string;
}

interface ApplicationConversionRate {
  title: string;
  conversion_rate: number;
}

interface TopPerformingRole {
  role: string;
  applications: number;
}

interface EngagementData {
  total_views: number;
  total_applications: number;
  avg_salary_expectation: string;
  total_jobs_posted: number;
}

interface JobTrend {
  month: string;
  job_count: number;
}

const HrDashboard: React.FC = () => {
  const [clientDashboard, setClientDashboard] =
    useState<CandidateDashboardData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((state: any) => state.auth.token);

  async function fetchDashboardData() {
    try {
      const response = await axios.get(
        "https://salarysafe.ai/api/v1/clients/dashboard/metrics",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setClientDashboard(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch dashboard data.");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);


  if (error)
    return <div className="text-center text-red-500 text-lg p-6">{error}</div>;

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {loading&&(
        <Loader/>
      )}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
        Employer Dashboard
      </h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {clientDashboard?.engagement_data && (
          <>
            <CardShowDashboard
              title="Total Jobs Posted"
              data={clientDashboard.engagement_data.total_jobs_posted}
            />
            <CardShowDashboard
              title="Total Applications"
              data={clientDashboard.engagement_data.total_applications}
            />
            <CardShowDashboard
              title="Total Job Views"
              data={clientDashboard.engagement_data.total_views}
            />
            <CardShowDashboard
              title="Average Salary Expectation"
              data={`$${
                clientDashboard.engagement_data.avg_salary_expectation.split(
                  "."
                )[0]
              }`}
            />
          </>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
          <BarChart
            labels={
              clientDashboard?.candidate_views.map((view) => view.title) || []
            }
            datasets={[
              {
                label: "Candidate Views",
                data:
                  clientDashboard?.candidate_views.map((view) => view.views) ||
                  [],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ]}
            title="Candidate Views"
          />
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
          <PieChart
            labels={
              clientDashboard?.role_performance.map((role) => role.role) || []
            }
            dataValues={
              clientDashboard?.role_performance.map(
                (role) => role.applications
              ) || []
            }
            backgroundColors={["#FF6384", "#36A2EB", "#FFCE56"]}
            title="Role Performance (Applications)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
          <LineChart
            labels={
              clientDashboard?.application_conversion_rate.map(
                (item) => item.title
              ) || []
            }
            datasets={[
              {
                label: "Conversion Rate (%)",
                data:
                  clientDashboard?.application_conversion_rate.map(
                    (item) => item.conversion_rate
                  ) || [],
                borderColor: "rgba(54, 162, 235, 1)",
              },
            ]}
            title="Application Conversion Rate"
          />
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
          <LineChart
            labels={
              clientDashboard?.job_trends.map((trend) => trend.month) || []
            }
            datasets={[
              {
                label: "Jobs Posted",
                data:
                  clientDashboard?.job_trends.map((trend) => trend.job_count) ||
                  [],
                borderColor: "rgba(75, 192, 192, 1)",
              },
            ]}
            title="Job Trends Over Time"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
          <HorizontalBarChart
            labels={
              clientDashboard?.top_performing_roles.map((role) => role.role) ||
              []
            }
            datasets={[
              {
                label: "Applications",
                data:
                  clientDashboard?.top_performing_roles.map(
                    (role) => role.applications
                  ) || [],
                backgroundColor: "rgba(153, 102, 255, 0.6)",
              },
            ]}
            title="Top Performing Roles"
          />
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg">
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
        </div>
      </div>

      {/* History Section */}
      {/* <div className="bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
        <HistoryOfRoles />
      </div> */}
    </div>
  );
};

export default HrDashboard;
