
import  { useState } from 'react';

const JobListings = () => {
    const [jobDetails, setJobDetails] = useState({
        title: '',
        description: '',
        requirements: '',
        salaryRange: '',
        isNegotiable: false,
    });

    const handleChange = (e:any) => {
        const { name, value, type, checked } = e.target;
        setJobDetails((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log('Job Details Submitted:', jobDetails);
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-xl font-semibold mb-4">Job Listings & Salary Range Entry</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        value={jobDetails.title}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Job Description</label>
                    <textarea
                        name="description"
                        value={jobDetails.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Requirements</label>
                    <textarea
                        name="requirements"
                        value={jobDetails.requirements}
                        onChange={handleChange}
                        required
                        rows={2}
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Salary Range</label>
                    <input
                        type="text"
                        name="salaryRange"
                        value={jobDetails.salaryRange}
                        onChange={handleChange}
                        required
                        placeholder="e.g. $60,000 - $80,000"
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="isNegotiable"
                            checked={jobDetails.isNegotiable}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <span>Is Salary Negotiable?</span>
                    </label>
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Submit Job Listing
                </button>
            </form>
        </div>
    );
};

export default JobListings;
