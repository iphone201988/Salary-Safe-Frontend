import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const MarketSalaryChart: React.FC = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "2021 Salary (in thousands)",
        data: [490, 305, 320, 335, 350, 365, 580, 395, 410, 225, 440, 460], // Variations in salary, with a dip in October
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)", // Light teal
        tension: 0.1,
      },
      {
        label: "2022 Salary (in thousands)",
        data: [310, 325, 340, 355, 370, 385, 400, 515, 430, 445, 460, 480], // Increase with higher August salary
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)", // Blue
        tension: 0.1,
      },
      {
        label: "2023 Salary (in thousands)",
        data: [330, 345, 660, 375, 390, 405, 420, 135, 450, 465, 480, 500], // Huge spike in March and dip in August
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)", // Red
        tension: 0.1,
      },
      {
        label: "2024 Salary (in thousands)",
        data: [350, 165, 380, 395, 410, 425, 640, 455, 470, 585, 500, 520], // Consistent increase throughout the year
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)", // Purple
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-lg font-[800]">Market Salary Range</h2>
      <Line data={data} />
    </div>
  );
};

export default MarketSalaryChart;
