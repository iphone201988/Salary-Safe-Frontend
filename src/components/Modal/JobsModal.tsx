import { Range } from "react-range";
import {
  // jobtypesOptions,
  scheduleOptions,
} from "../../pages/Employer/Auth/SignUp/options";
type Job = {
  title?: string;
  description?: string;
  requirements?: string;
  location?: string;
  job_type?: string;
  workplace_type?: string;
  salaryRanges?: [number, number];
  salaryRange: [number, number];
  isNegotiable?: boolean;
  id?: string;
  schedule: string;
  vacancy: number;
  views: number;
  status: string;
  salary_min?: string;
  salary_max?: string;
  created_at?: string;
};
interface JobsModalProps {
  handleSubmitJob: (e: React.FormEvent<HTMLFormElement>) => void;
  data?: Job | any; // Using your `Job` type
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSalaryChange: (values: number[]) => void; // Tuple for salary range
  setModelopen: (isOpen: boolean) => void;
  title: string;
}
const JobsModal: React.FC<JobsModalProps> = ({
  handleSubmitJob,
  data,
  handleChange,
  handleSalaryChange,
  setModelopen,
  title,
}) => {
  console.log("data?.salaryRange:::", data);
  const jobTypes = [
    { value: "fulltime", label: "Full-time" },
    { value: "parttime", label: "Part-time" },
    { value: "internship", label: "Internship" },
    { value: "contract", label: "Contract" },
    { value: "temporary", label: "Temporary" },
    { value: "volunteer", label: "Volunteer" },
    { value: "other", label: "Other" },
  ];

  const workplaceTypes = [
    { value: "onsite", label: "Onsite" },
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
  ];
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 ">
      <div className="bg-white rounded-lg shadow p-4 w-full max-w-lg max-h-[90vh] overflow-auto scrollbar-none">
        <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
        <form onSubmit={handleSubmitJob}>
          <div className="mb-4">
            <label className="block mb-1">Job Title</label>
            <input
              type="text"
              name="title"
              value={data?.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Job Description</label>
            <textarea
              name="description"
              value={data?.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Job Type</label>
            <select
              name="job_type"
              onChange={handleChange}
              value={data?.job_type}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Job Type</option>
              {jobTypes.map((data, index) => (
                <option key={index} value={data.value}>
                  {data.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Workplace Type</label>
            <select
              name="workplace_type"
              onChange={handleChange}
              value={data?.workplace_type}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Workplace Type</option>
              {workplaceTypes.map((data, index) => (
                <option key={index} value={data.value}>
                  {data.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Schedule</label>
            <select
              name="schedule"
              onChange={handleChange}
              value={data?.schedule}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Schedule Type</option>
              {scheduleOptions.map((data, index) => (
                <option key={index} value={data.value}>
                  {data.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Vacancy</label>
            <input
              type="number"
              name="vacancy"
              value={data?.vacancy}
              onChange={handleChange}
              required
              placeholder="e.g. 1"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={data?.status}
              className="border p-2 w-full rounded"
            >
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Views</label>
            <input
              type="number"
              name="views"
              value={data?.views}
              onChange={handleChange}
              required
              placeholder="e.g. 1"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Requirements</label>
            <textarea
              name="requirements"
              value={data?.requirements}
              onChange={handleChange}
              required
              rows={2}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={data?.location}
              onChange={handleChange}
              required
              placeholder="e.g. Mohali,India"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Salary Range</label>
            <div className="flex items-center gap-4">
              <span>${data?.salaryRange[0]}</span>
              <Range
                values={[...data?.salaryRange!]
                  .map((val) => Number(val)) // Ensure all values are numbers
                  .sort((a, b) => a - b)} // Sort in ascending order
                step={5000}
                min={30000}
                max={200000}
                onChange={handleSalaryChange}
                renderTrack={({ props, children }) => {
                  const [min, max] = [30000, 200000];
                  let rangeStart;
                  let rangeEnd;
                  if(data?.salaryRange){
                    rangeStart =
                     ((data?.salaryRange[0] - min) / (max - min)) * 100;
                    rangeEnd =
                     ((data?.salaryRange[1] - min) / (max - min)) * 100;
                  }

                  return (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "6px",
                        width: "100%",
                        background: `linear-gradient(to right, 
                                        black 0%, 
                                        black ${rangeStart}%, 
                                        blue ${rangeStart}%, 
                                        blue ${rangeEnd}%, 
                                        black ${rangeEnd}%)`,
                      }}
                    >
                      {children}
                    </div>
                  );
                }}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "20px",
                      width: "20px",
                      backgroundColor: "blue",
                      borderRadius: "50%",
                    }}
                  />
                )}
              />
              <span>${data?.salaryRange[1]}</span>
            </div>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isNegotiable"
                checked={data?.isNegotiable}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Is Salary Negotiable?</span>
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setModelopen(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobsModal;
