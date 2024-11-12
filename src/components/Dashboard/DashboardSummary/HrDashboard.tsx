import React from 'react';
import EmployeesChart from './EmployeesChart';
import SalaryChart from './SalaryChart';
import EmployeeContractType from './EmployeeContractType';
import CardShowDashboard from './CardShowDashboard';
import EmploymentStatus from './EmploymentStatus';
import HiredVsLeftChart from './HiredVsLeftChart';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';

const HrDashboard: React.FC = () => {
    const { employeerDetails } = useSelector((state: RootState) => state.user);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <EmployeesChart />
        <SalaryChart />
       
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <EmploymentStatus />
        <EmployeeContractType />
        <HiredVsLeftChart />
      </div>
    </div>
  );
};

export default HrDashboard;
