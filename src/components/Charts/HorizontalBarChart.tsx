import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface HorizontalBarChartProps {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
    title: string;
  }
  

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
    labels,
    datasets,
    title,
  }) => {
    const data = {
      labels,
      datasets,
    };
  
    const options = {
      indexAxis: "y" as const, // Horizontal bars
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: title,
        },
      },
    };
  
    return <Bar data={data} options={options} />;
  };

export default HorizontalBarChart;
