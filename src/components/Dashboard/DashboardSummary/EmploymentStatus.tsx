import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, ArcElement, BarElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import React from 'react';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, LineElement, ArcElement, BarElement, Title, Tooltip, Legend, PointElement);

interface EmployeeStatusProps{labels:Array<Object>,datasets:Array<Object>,title:string}
const EmploymentStatus: React.FC<EmployeeStatusProps> = ({labels,datasets,title}:EmployeeStatusProps) => {
    const data:any = {
      labels: labels,
      datasets: datasets,
    };
  
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-lg font-medium">{title}</h2>
        <Pie data={data} width={200} height={200} />
      </div>
    );
  };
  export default EmploymentStatus;