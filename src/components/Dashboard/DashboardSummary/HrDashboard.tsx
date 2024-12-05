import React from "react";
// import EmployeesChart from "./EmployeesChart";
import SalaryChart from "./SalaryChart";
import EmployeeContractType from "./EmployeeContractType";
import CardShowDashboard from "./CardShowDashboard";
import PieChart from "./PieChart";
// import HiredVsLeftChart from "./HiredVsLeftChart";
import CandidateTable from "./CandidateRecommdation";
import HistoryOfRoles from "./HistoryRoles";
interface CandidateRecommendation {
  name: string;
  range: string;
  recommendation: string;
}
const candidateData: CandidateRecommendation[] = [
  { name: "John Doe", range: "$50,000 - $60,000", recommendation: "$55,000" },
  { name: "Jane Smith", range: "$70,000 - $80,000", recommendation: "$75,000" },
  {
    name: "Alice Johnson",
    range: "$90,000 - $100,000",
    recommendation: "$95,000",
  },
];
const HrDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">
        Employer Dashboard
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <CardShowDashboard title="Job Title" data="Devlovper" />
        <CardShowDashboard title="Employment Type" data="Full-Time" />
        <CardShowDashboard
          title="Date"
          data={new Date().toISOString().split("T")[0]}
        />
        <CardShowDashboard title="Location and currency" data="Mohali,punjab" />
        <CardShowDashboard title="Your Salary Range" data="$500000" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <PieChart
          labels={["Man", "Women"]}
          dataValues={[6000000, 4000000]}
          title={"Actual Salaries (Average by gender)"}
        />
         <EmployeeContractType
          labels={[
            "Health Insurance",
            "Paid Time Off",
            "Stock Options",
            "Retirement Plan",
            "Pick Drop taxi",
          ]}
          datasets={[
            {
              label: "Non-salary Benefits",
              data: [10, 10, 10, 10, 10],
              backgroundColor: [
                "#4CAF50",
                "#FF9800",
                "#2196F3",
                "#2224f5",
                "#1186l3",
              ],
            },
          ]}
          title="Non-salary Benefits"
        />
        <SalaryChart
          labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
          datasets={[
            {
              label: "Man Salary (in thousands)",
              data: [300, 320, 330, 340, 360, 380],
              fill: false,
              borderColor: "rgba(75, 192, 192, 1)",
              tension: 0.1,
            },
            {
              label: "Women Salary (in thousands)",
              data: [200, 205, 230, 230, 260, 380],
              fill: false,
              borderColor: "rgba(275, 192, 192, 1)",
              tension: 0.1,
            },
          ]}
          title="Market Salary Range"
        />
       
        {/* <EmployeesChart />
        <HiredVsLeftChart /> */}
      </div>

      <div className="p-6 rounded-lg shadow-md mt-10 border bg-white">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Candidate Recommendations
        </h2>
        <div className="overflow-x-auto border ">
          <CandidateTable data={candidateData} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 border mt-10">
        <SalaryChart
          labels={["2017-2018", "2018-2019", "2019-2020", "2020-2021", "2021-2022", "2022-2023","2023-2024"]}
          datasets={[
            {
              label: " Node js(People Using)",
              data: [300, 320, 330, 340, 360, 380, 500],
              fill: false,
              borderColor: "rgba(75, 192, 192, 1)",
              tension: 0.1,
            },
            {
              label: "Python(People Using)",
              data: [200, 205, 230, 235, 260, 380,400],
              fill: false,
              borderColor: "rgba(275, 192, 192, 1)",
              tension: 0.1,
            },
            {
              label: "Java(People Using)",
              data: [100, 200, 230, 250, 300, 350, 380],
              fill: false,
              borderColor: "rgba(275, 192, 275, 1)",
              tension: 0.1,
            },
          ]}
          title="Trends and Analysis"
        />
      </div>
    <div className="mt-10">
      <HistoryOfRoles/>
      </div>
    </div>
  );
};

export default HrDashboard;
