import axios from "axios";
import React, { useState, useEffect } from "react";

// API Endpoints
const insightsAPI = "https://api.example.com/market-insights";
const historyAPI = "https://api.example.com/salary-history";

// Types
interface Insight {
  role: string;
  averageSalary: number;
  marketTrend: string;
  alignment: string;
}

interface HistoryItem {
  date: string;
  role: string;
  expectedSalary: number;
  marketRate: number;
  adjustmentReason: string;
}

const DashboardSummary: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Fetch insights and history on mount
  useEffect(() => {
    fetchInsights();
    fetchHistory();
  }, []);

  // Fetch market insights
  const fetchInsights = async () => {
    try {
      const response = await axios.get<Insight[]>(insightsAPI);
      setInsights(response.data);
    } catch (error) {
      console.error("Error fetching market insights:", error);
    }
  };

  // Fetch salary history
  const fetchHistory = async () => {
    try {
      const response = await axios.get<HistoryItem[]>(historyAPI);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching salary history:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-8">Insights and Analytics Dashboard</h2>

      {/* Real-Time Market Insights */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">Real-Time Market Insights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="p-4 border rounded-md bg-gray-50">
              <h4 className="text-xl font-medium">{insight.role}</h4>
              <p className="mt-2">**Average Salary**: ${insight.averageSalary}</p>
              <p className="mt-2">**Market Trend**: {insight.marketTrend}</p>
              <p className="mt-2">**Alignment**: {insight.alignment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* History Tracking */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">History Tracking</h3>
        <table className="min-w-full bg-white border rounded-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-left font-semibold text-gray-600">Date</th>
              <th className="p-4 text-left font-semibold text-gray-600">Role</th>
              <th className="p-4 text-left font-semibold text-gray-600">Expected Salary</th>
              <th className="p-4 text-left font-semibold text-gray-600">Market Rate</th>
              <th className="p-4 text-left font-semibold text-gray-600">Adjustment Reason</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4">{item.date}</td>
                <td className="p-4">{item.role}</td>
                <td className="p-4">${item.expectedSalary}</td>
                <td className="p-4">${item.marketRate}</td>
                <td className="p-4">{item.adjustmentReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default DashboardSummary;