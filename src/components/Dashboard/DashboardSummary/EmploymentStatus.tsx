import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, ArcElement, BarElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import React from 'react';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, LineElement, ArcElement, BarElement, Title, Tooltip, Legend, PointElement);
const EmploymentStatus: React.FC = () => {
    const data = {
      labels: ['Full-Time', 'Part-Time', 'Contract'],
      datasets: [
        {
          label: 'Employment Status',
          data: [60, 30, 10],
          backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        },
      ],
    };
  
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center ">
        <h2 className="text-lg font-medium">Employment Status</h2>
        <Pie data={data}  />
      </div>
    );
  };
  export default EmploymentStatus;