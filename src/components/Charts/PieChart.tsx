import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface PieChartProps {
  labels: string[];
  dataValues: number[];
  backgroundColors?: string[];
  title: string;
}

const PieChart: React.FC<PieChartProps> = ({
  labels,
  dataValues,
  backgroundColors,
  title,
}) => {
  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
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

  return <Pie data={data} options={options} />;
};

export default PieChart;
