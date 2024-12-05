import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

// Register the necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TopCompaniesChartProps {
  top_companies: {
    company_name: string;
    job_count: number;
  }[];
  title: string;
}

const TopCompaniesChart: React.FC<TopCompaniesChartProps> = ({ top_companies, title }) => {
  const data: ChartData<'bar'> = {
    labels: top_companies.map((company) => company.company_name), // Extract company names for the x-axis
    datasets: [
      {
        label: 'Job Count',
        data: top_companies.map((company) => company.job_count), // Extract job counts for the bars
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'center'
      },
      // title: {
      //   display: true,
      //   text: title,
      // },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-center h-80">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TopCompaniesChart;
