import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, ArcElement, BarElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, LineElement, ArcElement, BarElement, Title, Tooltip, Legend, PointElement);
interface SalaryChartProps{labels:Array<Object>,datasets:Array<Object>,title:string}

// SalaryChart Component (Line Chart)
const SalaryChart: React.FC<SalaryChartProps> = ({labels,datasets,title}:SalaryChartProps) => {
  const data:any = {
    labels:labels,
    datasets: datasets,
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-lg font-medium">{title}</h2>
      <Line data={data} />
    </div>
  );
};


export default SalaryChart;