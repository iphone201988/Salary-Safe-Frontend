import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

// Register the necessary chart components
ChartJS.register(ArcElement, Title, Tooltip, Legend);

interface PieChartProps {
  labels: string[]; // Array of labels for the pie chart (e.g., salary ranges, job types)
  dataValues: number[]; // Array of values corresponding to the labels (e.g., count of jobs)
  title: string; // Title of the chart
}

const PieChart: React.FC<PieChartProps> = ({ labels, dataValues, title }) => {
  const chartData: ChartData<'pie'> = {
    labels: labels, // Labels for the pie chart
    datasets: [
      {
        label: title,
        data: dataValues, // Data values corresponding to the labels
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        align: 'center',
      },
      title: {
        display: false,
        text: title,
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-center  flex flex-col justify-center items-center ">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
