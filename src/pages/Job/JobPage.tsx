// src/pages/Job/JobPage.tsx
import React, { useEffect, useState } from 'react';
import JobList from './JobList';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getJobs } from "../../API/apis";
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/Navbar/Navbar';

interface Job {
    id: string;
    title: string;
    description: string;
    location: string;
    salary: number;
}

const JobPage: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const token = localStorage.getItem('access_token');
            console.log("token", token,getJobs);
            const response = await axios.get(getJobs+"/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("response",response); // Log the response data to inspect its structure
            console.log("Request Headers", response.config.headers);
            setJobs(response.data);
        } catch (error) {
            toast.error('Error fetching jobs');
        } finally {
            setLoading(false);
        }
    };


    const navigateToCreateJob = () => {
        navigate('/create-job');
    };

    return (
        <>
            <NavBar />
            <div className="w-full min-h-screen flex flex-col items-center p-8 ">
                <div className='flex items-center justify-between w-full mt-20'>
                    <h1 className="text-4xl font-bold mb-6">Job Listings</h1>
                    <button
                        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        onClick={navigateToCreateJob}
                    >
                        Create Job
                    </button>

                </div>
                {loading ? (
                    <p>Loading jobs...</p>
                ) : (
                    <JobList jobs={jobs} />
                )}
                {/* Create Job Button */}

                {/* The JobForm will now be on a separate page */}
            </div>
        </>
    );
};

export default JobPage;
