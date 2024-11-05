import React, { useEffect, useState } from "react";
import axios from "axios";

// Placeholder API endpoints
const jobMatchingAPI = "https://api.example.com/job-matching";
const applicationAPI = "https://api.example.com/apply";

const JobMatchingPage: React.FC = () => {
  const [salaryExpectation, setSalaryExpectation] = useState<number>(0);
  const [jobMatches, setJobMatches] = useState([]);
  const [isTransparencyAgreement, setIsTransparencyAgreement] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("");

  useEffect(() => {
    // Fetch job matches based on candidate preferences (replace with actual fetch logic)
    const fetchJobMatches = async () => {
      try {
        const response = await axios.get(jobMatchingAPI);
        setJobMatches(response.data);
      } catch (error) {
        console.error("Error fetching job matches:", error);
      }
    };
    fetchJobMatches();
  }, []);

  // Handle salary expectation submission
  const handleSalarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to adjust salary expectations can be added here
    alert(`Salary expectation set to $${salaryExpectation}`);
  };

  // Handle job application submission
  const handleApplicationSubmit = async (jobId: string) => {
    try {
       await axios.post(applicationAPI, {
        jobId,
        salaryExpectation,
        transparencyAgreement: isTransparencyAgreement,
      });
      setApplicationStatus("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      setApplicationStatus("Failed to submit application.");
    }
  };

  return (
    <>
        <div className="p-6 max-w-3xl mx-auto  shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold text-center mb-8">Job Matching and Application</h2>

          {/* Salary Expectation Input */}
          <section className="mb-10">
            <h3 className="text-2xl font-semibold mb-4">Set Your Salary Expectation</h3>
            <form onSubmit={handleSalarySubmit}>
              <input
                type="number"
                value={salaryExpectation}
                onChange={(e) => setSalaryExpectation(Number(e.target.value))}
                placeholder="Enter your salary expectation"
                className="w-full px-4 py-2 border rounded-md mb-4"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
              >
                Submit Salary Expectation
              </button>
            </form>
          </section>

          {/* Job Matches List */}
          <section className="mb-10">
            <h3 className="text-2xl font-semibold mb-4">Job Matches</h3>
            <ul>
              {jobMatches.length === 0 ? (
                <li>No job matches found.</li>
              ) : (
                jobMatches.map((job: any) => (
                  <li key={job.id} className="border p-4 mb-4 rounded-lg">
                    <h4 className="text-xl font-medium">{job.title}</h4>
                    <p>Company: {job.company}</p>
                    <p>Salary Range: ${job.salaryMin} - ${job.salaryMax}</p>
                    <button
                      onClick={() => handleApplicationSubmit(job.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Apply Now
                    </button>
                    <label className="inline-flex items-center mt-2">
                      <input
                        type="checkbox"
                        checked={isTransparencyAgreement}
                        onChange={() => setIsTransparencyAgreement(!isTransparencyAgreement)}
                        className="form-checkbox"
                      />
                      <span className="ml-2">Enter salary transparency agreement</span>
                    </label>
                  </li>
                ))
              )}
            </ul>
          </section>

          {/* Application Status */}
          {applicationStatus && <p className="text-center text-green-500">{applicationStatus}</p>}
        </div>
     </>
  );
};

export default JobMatchingPage;
