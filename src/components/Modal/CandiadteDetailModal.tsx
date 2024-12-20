const CandidateDetailModal = ({
  data,
  setModal,
}: {
  data: any;
  setModal: (state: boolean) => void;
}) => {
  const { candidate_details, job_details, status, salary_expectation } = data;
  console.log(
    "data::::::::",
    data,
    candidate_details.total_years_of_experience
  );

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 h-[95%] overflow-auto">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center w-full">
            Candidate Details
          </h2>
          <button
            className="text-gray-600 hover:text-gray-800 text-2xl"
            onClick={() => setModal(false)}
          >
            &times;
          </button>
        </div>

        <div className="space-y-6">
          {/* Candidate Information */}
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Candidate Information
            </h3>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p>
                <strong>Name:</strong> {candidate_details.full_name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${candidate_details.email}`}
                  className="text-blue-500 hover:underline"
                >
                  {candidate_details.email}
                </a>
              </p>
              <p>
                <strong>Phone:</strong> {candidate_details.phone_number}
              </p>
              <p>
                <strong>Location:</strong> {candidate_details.location}
              </p>
              <p>
                <strong>Current Job Title:</strong>{" "}
                {candidate_details.current_job_title}
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={candidate_details.linkedin_profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  LinkedIn Profile
                </a>
              </p>
              <p>
                <strong>Total Experience:</strong>{" "}
                {candidate_details.total_years_of_experience
                  ? candidate_details.total_years_of_experience
                  : 0}{" "}
                years
              </p>
              <p>
                <strong>Salary Expectation:</strong> {salary_expectation}
              </p>
            </div>
          </div>

          {/* Job Details */}
          <div>
            <h3 className="text-xl font-medium text-gray-800">
              Job Applied For:
            </h3>
            <div className="mt-2 space-y-3">
              <p>
                <strong>Title:</strong> {job_details.title}
              </p>
              <p>
                <strong>Location:</strong> {job_details.location}
              </p>
              <p>
                <strong>Description:</strong> {job_details.description}
              </p>
              <p>
                <strong>Salary Range:</strong> {job_details.salary_min} -{" "}
                {job_details.salary_max}
              </p>
              <p>
                <strong>Requirements:</strong> {job_details.requirements}
              </p>
              <p>
                <strong>Type:</strong>
                <span className="capitalize"> {job_details.job_type}</span>
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`capitalize ${
                    job_details.status === "active"
                      ? "text-green-500"
                      : "text-red-500"
                  } font-medium`}
                >
                  {job_details.status}
                </span>
              </p>
            </div>
          </div>

          {/* Application Status */}
          <div>
            <h3 className="text-xl font-medium text-gray-800">
              Application Details:
            </h3>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`capitalize ${
                  status === "pending"
                    ? "text-yellow-500"
                    : status === "approved"
                    ? "text-green-500"
                    : "text-red-500"
                } font-medium`}
              >
                {status}
              </span>
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => setModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailModal;
