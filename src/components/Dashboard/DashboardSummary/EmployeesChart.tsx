import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

// Register the necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmployeesChart: React.FC = () => {
  const data: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Male',
        data: [30, 32, 34, 36, 38, 40, 32, 30, 32, 30, 32, 28],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Female',
        data: [90, 86, 84, 88, 82, 84, 80, 90, 88, 90, 88, 92],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-center h-80">
      <h3 className="text-lg font-medium mb-2">Employees</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default EmployeesChart;
