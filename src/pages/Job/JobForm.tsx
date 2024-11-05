import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import NavBar from '../../components/Navbar/Navbar';
import { createJobs } from '../../API/apis';

interface Job {
  title: string;
  description: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  isNegotiable: boolean;
}

const JobForm: React.FC = () => {
  const [jobData, setJobData] = React.useState<Job>({
    title: '',
    description: '',
    location: '',
    minSalary: 0,
    maxSalary: 0,
    isNegotiable: false,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const id = localStorage.getItem("id");
      await axios.post(
        createJobs,
        {
          title: jobData.title,
          minSalary: jobData.minSalary,
          maxSalary: jobData.maxSalary,
          description: jobData.description,
          location: jobData.location,
          isNegotiable: jobData.isNegotiable,
          employer_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJobData({
        title: '',
        description: '',
        location: '',
        minSalary: 0,
        maxSalary: 0,
        isNegotiable: false,
      });
      toast.success("Job created successfully!");
      navigate('/jobs');
    } catch (error) {
      toast.error("Error creating job");
    }
  };

  const getRandomImage = () => {
    const images = [
      "https://picsum.photos/700"
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  const suggestSalaryRange = () => {
    // Example hardcoded salary range suggestion logic
    const suggestedMin = 40000;
    const suggestedMax = 80000;
    return { min: suggestedMin, max: suggestedMax };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-col lg:flex-row items-center justify-between w-full flex-grow p-6 bg-gray-100">
        {/* Job form */}
        <div className="w-full min-h-fit lg:w-1/2  p-8 rounded-lg shadow-lg mb-8 lg:mb-0 lg:mr-6 md:mt-20">
          <h1 className="text-3xl font-bold mb-6 text-center">Create Job</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-1">Title</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={jobData.title}
                onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={jobData.description}
                onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Location</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={jobData.location}
                onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Minimum Salary</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={jobData.minSalary}
                onChange={(e) => setJobData({ ...jobData, minSalary: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Maximum Salary</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={jobData.maxSalary}
                onChange={(e) => setJobData({ ...jobData, maxSalary: Number(e.target.value) })}
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={jobData.isNegotiable}
                onChange={(e) => setJobData({ ...jobData, isNegotiable: e.target.checked })}
              />
              <label className="text-gray-700">Is Salary Negotiable?</label>
            </div>
            {/* Suggested Salary Range */}
            <div className="text-gray-500 mt-4">
              Suggested Salary Range: ${suggestSalaryRange().min} - ${suggestSalaryRange().max}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Image section */}
        <div className="w-full lg:w-1/2 lg:h-[100%] hidden lg:flex justify-center lg:items-center">
          <img src={getRandomImage()} alt="Random" className="rounded-lg max-w-full h-auto lg:max-h-[500px] mt-20" />
        </div>
      </div>
    </div>
  );
};

export default JobForm;
