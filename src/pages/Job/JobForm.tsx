// // src/pages/Job/JobForm.tsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // For navigation after job creation
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import NavBar from '../../components/Navbar/Navbar';

// interface Job {
//     title: string;
//     description: string;
//     location: string;
//     salary: number;
// }

// interface JobFormProps {
//     onJobCreation?: (job: Omit<Job, 'id'>) => void;
// }

// const JobForm: React.FC<JobFormProps> = () => {
//     const [jobData, setJobData] = React.useState<Job>({
//         title: '',
//         description: '',
//         location: '',
//         salary: 0,
//     });
//     const navigate = useNavigate(); // Hook for navigation

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             await axios.post('/api/jobs', jobData); // Update with your API endpoint
//             toast.success('Job created successfully!');
//             navigate('/'); // Navigate back to the job listings page after creation
//         } catch (error) {
//             toast.error('Error creating job');
//         }
//     };

//     return (
//         <div className="flex flex-col min-h-screen"> {/* Flex column to structure layout */}
//             <NavBar />
//             <div className="flex-grow flex items-center justify-center bg-gray-100 mt-20"> {/* Container for form */}
//                 <div className="w-full max-w-md shadow-lg p-4 bg-white rounded"> {/* Form container */}
//                     <h1 className="text-2xl font-bold mb-4 text-center">Create Job</h1>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-4">
//                             <label className="block text-gray-700">Title</label>
//                             <input
//                                 type="text"
//                                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//                                 value={jobData.title}
//                                 onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
//                                 required
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700">Description</label>
//                             <textarea
//                                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//                                 value={jobData.description}
//                                 onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
//                                 required
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700">Location</label>
//                             <input
//                                 type="text"
//                                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//                                 value={jobData.location}
//                                 onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
//                                 required
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700">Salary</label>
//                             <input
//                                 type="number"
//                                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
//                                 value={jobData.salary}
//                                 onChange={(e) => setJobData({ ...jobData, salary: Number(e.target.value) })}
//                                 required
//                             />
//                         </div>

//                         <button
//                             type="submit"
//                             className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
//                         >
//                             Submit
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default JobForm;
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
  salary: number;
}

interface JobFormProps {
  onJobCreation?: (job: Omit<Job, 'id'>) => void;
}

const JobForm: React.FC<JobFormProps> = () => {
  const [jobData, setJobData] = React.useState<Job>({
    title: '',
    description: '',
    location: '',
    salary: 0,
  });
  const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("access_token");
            const id = localStorage.getItem("id");
            console.log("token", token, createJobs);
            const response = await axios.post(
                createJobs,
                {
                    title: jobData?.title,
                    salary_range: jobData?.salary,
                    description: jobData?.description,
                    location: jobData?.location,
                    employer_id: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                    },
                }
            );
            console.log("respsone", response);
            setJobData({
                title: '',
                description: '',
                location: '',
                salary: 0,
            });

            toast.success("Job created successfully!");
            navigate('/jobs');
        } catch (error) {
            console.log("error", error);
            toast.error("Error creating job");
        }
    };

  const getRandomImage = () => {
    const images = [
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fsame-person-different-jobs&psig=AOvVaw3-8C6MrH8haQvIqIECkOAp&ust=1728721849836000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiRxfT0hYkDFQAAAAAdAAAAABAEhttps://www.shutterstock.com/shutterstock/photos/2458634841/display_1500/stock-photo-investors-growth-charts-and-investment-analysis-concepts-of-business-growth-profit-development-2458634841.jpghttps://api.deepai.org/job-view-file/95d7dcf9-abb0-47d0-83e9-72566cf04b82/outputs/output.jpg?art-image=truehttps://plus.unsplash.com/premium_photo-1683288662019-c92caea8276d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1683288537078-a04cc87545f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1683288537184-7ef228ca6820?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1683288706548-e8b6bb72fe86?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-col lg:flex-row items-center justify-between w-full flex-grow p-6 bg-gray-100">
        
        {/* Job form */}
        <div className="w-full min-h-fit lg:w-1/2 bg-white p-8 rounded-lg shadow-lg mb-8 lg:mb-0 lg:mr-6 md:mt-20">
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
              <label className="block text-gray-700 mb-1">Salary</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                value={jobData.salary}
                onChange={(e) => setJobData({ ...jobData, salary: Number(e.target.value) })}
                required
              />
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
          <img src={getRandomImage()} alt="Random" className="rounded-lg  max-w-full h-auto lg:max-h-[500px] mt-20" />
        </div>
      </div>
    </div>
  );
};

export default JobForm;

