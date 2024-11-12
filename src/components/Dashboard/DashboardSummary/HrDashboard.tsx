import React from 'react';
import EmployeesChart from './EmployeesChart';
import SalaryChart from './SalaryChart';
import EmployeeContractType from './EmployeeContractType';
import CardShowDashboard from './CardShowDashboard';
import EmploymentStatus from './EmploymentStatus';
import HiredVsLeftChart from './HiredVsLeftChart';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import CandidateTable from './CandidateRecommdation';
interface CandidateRecommendation {
    name: string;
    range: string;
    recommendation: string;
  }
const candidateData: CandidateRecommendation[] = [
    { name: 'John Doe', range: '$50,000 - $60,000', recommendation: '$55,000' },
    { name: 'Jane Smith', range: '$70,000 - $80,000', recommendation: '$75,000' },
    { name: 'Alice Johnson', range: '$90,000 - $100,000', recommendation: '$95,000' },
  ];
const HrDashboard: React.FC = () => {

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">Employer Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <CardShowDashboard title='Job Title' data="Devlovper" />
        <CardShowDashboard title='Employment Type' data='Full-Time'  />
        <CardShowDashboard title='Date' data={new Date().toISOString().split("T")[0]} />
        <CardShowDashboard title='Location and currency' data='Mohali,punjab'/>
        <CardShowDashboard title='Your Salary Range' data='$500000' />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <EmploymentStatus labels={['Man', 'Women']} datasets={[
        {
          label: 'Actual Salaries (Average by gender)',
          data: [6000000, 4000000 ],
          backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        },
    ]}
    title={"Actual Salaries (Average by gender)"}
      />
        <SalaryChart />
        <EmployeeContractType />
        <EmployeesChart />
        <HiredVsLeftChart />
        </div>
        
        <div className="p-6 rounded-lg shadow-md mt-10">
    <h2 className="text-xl font-semibold mb-4 text-center">Candidate Recommendations</h2>
    <div className="overflow-x-auto">
      <CandidateTable data={candidateData} />
    </div>
  </div>
       
    </div>
  );
};

export default HrDashboard;
