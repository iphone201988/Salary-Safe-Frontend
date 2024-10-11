// src/pages/Job/JobList.tsx
import React from 'react';

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
}

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  console.log("jobs", jobs);

  // Sample job data for demonstration
  // Remove this sample data if jobs are coming from props
  jobs = [
    {
      id: '1',
      title: 'Software Engineer',
      description: 'Develop software applications',
      location: 'Remote',
      salary: 100000
    },
    {
      id: '2',
      title: 'Data Scientist',
      description: 'Analyze and interpret complex data',
      location: 'On-site',
      salary: 120000
    },
    {
      id: '3',
      title: 'Product Manager',
      description: 'Oversee product development',
      location: 'Hybrid',
      salary: 110000
    }
  ];

  return (
    <div className="w-full flex flex-col ">
      {jobs.length > 0 ? (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Job Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Salary</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{job.title}</td>
                <td className="border px-4 py-2">{job.description}</td>
                <td className="border px-4 py-2">{job.location}</td>
                <td className="border px-4 py-2">${job.salary.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
};

export default JobList;
