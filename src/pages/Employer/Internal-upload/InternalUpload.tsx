import { useState } from "react";

const InternalSalaryUpload = () => {
  const [file, setFile] = useState(null);
  const [confidentialityAgreement, setConfidentialityAgreement] =
    useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e:any) => {
    setFile(e.target.files[0]);
  };

  const handleAgreementChange = (e:any) => {
    setConfidentialityAgreement(e.target.checked);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus("Please select a file to upload.");
      return;
    }
    if (!confidentialityAgreement) {
      setUploadStatus("You must agree to the confidentiality terms.");
      return;
    }

    setUploadStatus("Uploading...");
    setTimeout(() => {
      setUploadStatus("File uploaded successfully!");
      setFile(null);
      setConfidentialityAgreement(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-xl font-semibold mb-4">
        Internal Salary Data Submission
      </h3>
      <p className="mb-4 text-gray-600">
        Upload your internal salary details for tailored analysis and
        benchmarking.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">
            Upload Salary Data File (CSV/Excel)
          </label>
          <input
            type="file"
            accept=".csv, .xlsx"
            onChange={handleFileChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={confidentialityAgreement}
              onChange={handleAgreementChange}
              className="mr-2"
              required
            />
            <span>
              I agree to the confidentiality terms and conditions regarding the
              handling of my salary data.
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Submit Salary Data
        </button>
      </form>
      {uploadStatus && <p className="mt-4 text-red-600">{uploadStatus}</p>}
    </div>
  );
};

export default InternalSalaryUpload;
