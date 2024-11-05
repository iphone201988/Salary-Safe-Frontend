import axios from "axios";
import React, { useState, useEffect } from "react";

// Mock API endpoint URLs
const marketRatesAPI = "https://api.example.com/market-rates";
const updateSalaryAPI = "https://api.example.com/update-salary";

// Types for job and salary data
interface Job {
  id: string;
  title: string;
  company: string;
}

interface MarketRate {
  average: number;
  min: number;
  max: number;
}

const JobSalaryAdjustments: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // List of matched jobs
  const [selectedJob, setSelectedJob] = useState<Job | null>(null); // Current selected job
  const [salary, setSalary] = useState<string>(""); // User-defined salary expectation
  const [marketRate, setMarketRate] = useState<MarketRate | null>(null); // Market rate data
  const [insight, setInsight] = useState<string>(""); // Insight message

  // Fetch matched jobs (for demonstration, this could be a user's job matches)
  const fetchJobs = async () => {
    try {
      // Mock job data (Replace with actual API call)
      const jobData = [
        { id: "1", title: "Software Engineer", company: "Tech Corp" },
        { id: "2", title: "Product Manager", company: "Innovate Inc." },
      ];
      setJobs(jobData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Fetch market rates for the selected job
  const fetchMarketRate = async (jobTitle: string) => {
    try {
      const response = await axios.get<MarketRate>(`${marketRatesAPI}?title=${jobTitle}`);
      setMarketRate(response.data);
      calculateInsight(response.data, parseFloat(salary));
    } catch (error) {
      console.error("Error fetching market rates:", error);
    }
  };

  // Update salary expectation for the selected job
  const handleSalaryUpdate = async () => {
    try {
      if (selectedJob) {
        await axios.patch(updateSalaryAPI, {
          jobId: selectedJob.id,
          salaryExpectation: salary,
        });
        console.log("Salary updated for job:", selectedJob.title);
      }
    } catch (error) {
      console.error("Error updating salary:", error);
    }
  };

  // Calculate insight based on market data and user's salary
  const calculateInsight = (market: MarketRate, candidateSalary: number) => {
    if (candidateSalary < market.min) {
      setInsight("Your salary expectation is below the market minimum for this role.");
    } else if (candidateSalary > market.max) {
      setInsight("Your salary expectation is above the market maximum for this role.");
    } else {
      setInsight("Your salary expectation aligns well with the market average.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Fetch market rate when selected job or salary changes
  useEffect(() => {
    if (selectedJob) fetchMarketRate(selectedJob.title);
  }, [selectedJob, salary]);

  return (
    <div className="p-6 max-w-3xl mx-auto  shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Job-Specific Salary Adjustments</h2>

      <div className="mb-4">
        <label className="block text-gray-600">Select Job</label>
        <select
          onChange={(e) => setSelectedJob(jobs.find(job => job.id === e.target.value) || null)}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="">-- Select a Job --</option>
          {jobs.map(job => (
            <option key={job.id} value={job.id}>
              {job.title} at {job.company}
            </option>
          ))}
        </select>
      </div>

      {selectedJob && (
        <>
          <div className="mb-4">
            <label className="block text-gray-600">Salary Expectation</label>
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter salary expectation"
            />
          </div>

          <div className="mb-4">
            <button
              onClick={handleSalaryUpdate}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Update Salary Expectation
            </button>
          </div>

          {marketRate && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <h3 className="text-xl font-semibold">Market Insights</h3>
              <p className="mt-2 text-gray-700">
                **Market Range**: ${marketRate.min} - ${marketRate.max} (Average: ${marketRate.average})
              </p>
              <p className="mt-2 text-blue-600 font-medium">{insight}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobSalaryAdjustments;
