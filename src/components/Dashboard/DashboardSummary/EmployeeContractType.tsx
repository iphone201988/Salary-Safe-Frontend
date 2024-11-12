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
interface EmployeeContractProps{labels:Array<Object>,datasets:Array<Object>,title:string}

const EmployeeContractType: React.FC<EmployeeContractProps> = ({labels,datasets,title}:EmployeeContractProps) => {
  const data:any = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-lg font-medium">{title}</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default EmployeeContractType;
