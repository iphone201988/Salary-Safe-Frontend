import {Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, ArcElement, BarElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import React from 'react';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, LineElement, ArcElement, BarElement, Title, Tooltip, Legend, PointElement);
const HiredVsLeftChart: React.FC = () => {
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Hired',
          data: [5, 10, 6, 12, 7, 15],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Left',
          data: [2, 3, 4, 1, 2, 3],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    };
  
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-lg font-medium">Hired vs. Left</h2>
        <Bar data={data} />
      </div>
    );
  };
  export default HiredVsLeftChart;