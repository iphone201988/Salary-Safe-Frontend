import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, ArcElement, BarElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, LineElement, ArcElement, BarElement, Title, Tooltip, Legend, PointElement);

// SalaryChart Component (Line Chart)
const SalaryChart: React.FC = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Salary (in thousands)',
        data: [300, 320, 330, 340, 360, 380],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-lg font-medium">Total Salary</h2>
      <Line data={data} />
    </div>
  );
};


export default SalaryChart;