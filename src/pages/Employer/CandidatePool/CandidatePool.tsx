import { useState } from "react";

const CandidatePoolDashboard = () => {
  const [candidateData, setCandidateData] = useState({
    name: "",
    email: "",
    skills: "",
    salaryExpectation: "",
  });

  const [candidates, setCandidates] = useState<any>([]);
  const [notification, setNotification] = useState("");

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setCandidateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newCandidate = { ...candidateData };
    setCandidates((prevCandidates: any) => [...prevCandidates, newCandidate]);
    setNotification(
      `Candidate ${newCandidate.name} has been invited successfully!`
    );
    setCandidateData({
      name: "",
      email: "",
      skills: "",
      salaryExpectation: "",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-xl font-semibold mb-4">Candidate Pool Management</h3>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block mb-1">Candidate Name</label>
          <input
            type="text"
            name="name"
            value={candidateData.name}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Candidate Email</label>
          <input
            type="email"
            name="email"
            value={candidateData.email}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={candidateData.skills}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Salary Expectation</label>
          <input
            type="number"
            name="salaryExpectation"
            value={candidateData.salaryExpectation}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Invite Candidate
        </button>
      </form>
      {notification && <p className="text-green-600">{notification}</p>}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Candidate List</h4>
        <ul className="list-disc pl-5">
          {candidates.map((candidate: any, index:any) => (
            <li key={index} className="mb-1">
              {candidate.name} - {candidate.skills} - $
              {candidate.salaryExpectation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CandidatePoolDashboard;
