import React from 'react';
import EmployeesChart from './EmployeesChart';
import SalaryChart from './SalaryChart';
import EmployeeContractType from './EmployeeContractType';
import CardShowDashboard from './CardShowDashboard';
import EmploymentStatus from './EmploymentStatus';
import HiredVsLeftChart from './HiredVsLeftChart';

const HrDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">HR Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <CardShowDashboard title='Total Salary (YTD)' data='3,360,000' percentage='0.5' />
        <CardShowDashboard title='Average Salary' data='25,560' percentage='-1.9' />
        <CardShowDashboard title='Turnover Rate' data='2.1%' percentage='0.0' />
        <CardShowDashboard title='Average Age' data='3,360,000' percentage='-0.5' />
        <CardShowDashboard title='Parameter Rate' data='90%' percentage='-0.5' />
        <CardShowDashboard title='Absenteeism Rate' data='2.1%' percentage='25' />
      </div>
        <EmployeeContractType />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <EmployeesChart />
        <SalaryChart />
        <EmploymentStatus />
        <HiredVsLeftChart />
      </div>
    </div>
  );
};

export default HrDashboard;
