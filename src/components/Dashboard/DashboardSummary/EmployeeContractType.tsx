import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement
  } from 'chart.js';
  
  ChartJS.register(
    ArcElement,       // Needed for pie and doughnut charts
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,       // Needed for bar charts
    LineElement,      // Needed for line charts
    PointElement      // Needed for line charts
  );
const EmployeeContractType: React.FC = () => {
  const data = {
    labels: ['Full-Time', 'Part-Time', 'Contractor'],
    datasets: [
      {
        label: 'Employee Contract Type',
        data: [300, 50, 100],
        backgroundColor: ['#4CAF50', '#FF9800', '#2196F3'],
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-lg font-medium">Type of Employee Contract</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default EmployeeContractType;
