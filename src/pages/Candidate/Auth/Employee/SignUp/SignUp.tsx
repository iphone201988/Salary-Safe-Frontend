import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import InputField from "../../../../../components/InputField/InputField";
import {
  employeeRegistrationSchema,
  validateForm,
} from "../../../../../Schema/Schemas";
// import { signInWithPopup } from "firebase/auth";
// import { auth, googleauthProvider } from "../../../../../../firebase";
import {
 /*  getcandidatesProfile, */
  userRegister,
  /* userSocialLogin, */
} from "../../../../../API/apis";
// import { useDispatch } from "react-redux";
// import { setUserData } from "../../../../../Redux/reducer/userData";
// import { login } from "../../../../../Redux/reducer/authSlice";
import Loader from "../../../../../components/Loader/Loader";
import MultiSelectComponent from "../../../../../components/MultiSelect/MultiSelect";

interface SignUpFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  location: string;
  jobTitle: string;
  linkedIn: string;
  positionsOfInterest: string;
  experience: string;
  educationLevel: string;
  inviteEmployer: boolean;
}

interface SignUpFormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  // inviteEmployer?: string;
}

const CandidateSignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    location: "",
    jobTitle: "",
    linkedIn: "",
    positionsOfInterest: "",
    experience: "",
    educationLevel: "",
    // keySkills: [] as string[],
    // salaryRange: "",
    // salaryType: "",
    // performanceComp: false,
    // willingToNegotiate: false,
    // minSalary: "",
    // benefits: [] as string[],
    // viewSalaryPermission: "",
    // hideProfileFromEmployer: false,
    // industriesOfInterest: [] as string[],
    // jobTypePreferences: [] as string[],
    // activelyLooking: false,
    // careerGoals: "",
    // devAreas: [] as string[],
    // salaryAdjustments: "",
    // salaryInsightsInterest: false,
    // resume: null as File | null,
    // coverLetter: null as File | null,
    inviteEmployer: false,
    // employerDetails: { name: "", contactPerson: "", contactEmail: "", message: "" },
    // notificationPreferences: [] as string[],
    // jobAlertsFrequency: "",
    // referralSource: "",
    // referralCode: "",
    // agreedToTerms: false,
  });
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<SignUpFormErrors>({});
  const navigate = useNavigate();

  // const GoggleHandler = async () => {
  //   try {
  //     setLoading(true);
  //     const result = await signInWithPopup(auth, googleauthProvider);
  //     console.log("google user", result);
  //     const data = {
  //       email: result.user?.email,
  //       full_name: result.user?.displayName,
  //       photo: result.user?.photoURL,
  //       provider: result.user?.providerData[0].providerId,
  //       provider_id: result.user?.uid,
  //       role: "candidate",
  //     };
  //     try {
  //       const response = await axios.post(userSocialLogin, data);
  //       const res = await axios.get(getcandidatesProfile, {
  //         headers: {
  //           Authorization: `Bearer ${response.data.access_token}`,
  //         },
  //       });
  //       console.log("social user response", response);
  //       dispatch(
  //         setUserData({
  //           name: res.data?.full_name,
  //           email: res.data?.email,
  //           profile: res.data?.profile,
  //           role: res.data?.role,
  //           industry: res.data?.industry,
  //           location: res.data?.location,
  //           size: res.data?.size,
  //         })
  //       );
  //       dispatch(
  //         login({ token: response?.data?.access_token, role: "employeer" })
  //       );
  //       localStorage.setItem("access_token", response.data.access_token);
  //       localStorage.setItem("token_type", response.data.token_type);
  //       toast.success("Logged in successfully!");
  //       navigate("/candidate/dashboard");
  //       setLoading(false);
  //     } catch (error: any) {
  //       console.log(error);
  //       setLoading(false);
  //       const errorMessage =
  //         error?.response?.data?.detail || "An error occurred during login.";
  //       toast.error(errorMessage);
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    console.log("hello");
    setLoading(true);
    e.preventDefault();

    const currentErrors: any = await validateForm(
      employeeRegistrationSchema,
      formData
    );

    if (currentErrors) {
      setErrors(currentErrors);
      return;
    }

    try {
      const response = await axios.post(userRegister, {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: "candidate",
      });
      setLoading(false);
      if (response.status === 200) {
        toast.success("Registration successful!");
        navigate("/login-employee");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Registration failed. Please try again.");
    }
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div className="flex justify-center items-center min-h-screen">
      {loading && <Loader />}
      <div className="w-full max-w-lg p-8 m-10 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Candidate Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-[#000000] text-lg font-bold">
            Personal Information
          </h2>
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <div
            className="flex items-center justify-around w-[80%] mx-auto my-2"
            id="separator"
          >
            {/* <span className="h-[1px] bg-[#3D3D3D] w-[100px]" id="line1"></span>
            <span className="text-[#ffd6d6]">OR</span>
            <span className="h-[1px] bg-[#3D3D3D] w-[100px]" id="line2"></span> */}
          </div>
          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            placeholder="+1 123 456 7890"
            onChange={handleChange}
            error={errors.phone}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <InputField
            label="Location"
            name="location"
            placeholder="City, State/Region, Country"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <InputField
            label="Current Job Title"
            name="currentJob"
            placeholder="baackend devolper"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <InputField
            label="LinkedIn Profile URL"
            name="linkedInUrl"
            placeholder="https://www.linkedin.com/in/techwin-labs-8b131b282/"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          <h2 className="text-[#000000] text-lg font-bold">
            Profile Creation and Setup
          </h2>
          <InputField
            label="Job Titles/Positions of Interest"
            name="postionInterest"
            placeholder="Manager"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Total Years of Experience:</label>
            <select
              name="experience"
              // onChange={handleChange}
              // value={formData.experience}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Experience</option>
              <option value="1-3">1-3 Years</option>
              <option value="4-6">4-6 Years</option>
              <option value="7+">7+ Years</option>
            </select>
          </div>
          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Education Level:</label>
            <select
              name="educationLevel"
              //  onChange={handleChange}
              //  value={formData.educationLevel}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Education Level</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
          <MultiSelectComponent
            isMulti={true}
            label="Skill:"
            options={options}
          />
          <h2 className="text-[#000000] text-lg font-bold">
            Salary Expectations
          </h2>
          <InputField
            label="General Salary Range"
            name="salaryRange"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Preferred Salary Type:</label>
            <select
              name="salaryType"
              //  onChange={handleChange}
              //  value={formData.salaryType}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Type</option>
              <option value="Hourly">Hourly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="performanceComp"
              // checked={formData.performanceComp}
              //  onChange={handleChange}
            />
            <label>Open to performance-based compensation?</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="willingToNegotiate"
              // checked={formData.willingToNegotiate}
              // onChange={handleChange}
            />
            <label>Willing to Negotiate?</label>
          </div>
          <InputField
            label="Minimum Acceptable Salary (Optional)"
            type="number"
            name="minSalary"
            value={formData.phone}
            onChange={handleChange}
          />
          <MultiSelectComponent
            isMulti={true}
            label="Preferred Benefits:"
            options={options}
          />
          <h2 className="text-[#000000] text-lg font-bold">Privacy Controls</h2>
          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Preferred Salary Type:</label>
            <select
              name="viewSalaryPermission"
              //  onChange={handleChange}
              //  value={formData.viewSalaryPermission}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Permission</option>
              <option value="Everyone">Everyone</option>
              <option value="Employers Only">Employers Only</option>
              <option value="Private">Private</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hideProfileFromEmployer"
              //  checked={formData.hideProfileFromEmployer}
              onChange={handleChange}
            />
            <label>Hide my profile from current employer(s)</label>
          </div>
          <h2 className="text-[#000000] text-lg font-bold">
            Job Search Preferences
          </h2>

          <MultiSelectComponent
            isMulti={true}
            label="Industries of Interest:"
            options={options}
          />
          <MultiSelectComponent
            isMulti={true}
            label="Industries of Interest:"
            options={options}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="activelyLooking"
              // checked={formData.activelyLooking}
              onChange={handleChange}
            />
            <label>Are you actively looking for a new job?</label>
          </div>
          <InputField
            label="Career Goals"
            name="careerGoals"
            value={formData.phone}
            onChange={handleChange}
          />
          <MultiSelectComponent
            isMulti={false}
            label="Professional Development Areas:"
            options={options}
          />
          <h2 className="text-[#000000] text-lg font-bold">
            Salary Insights & Customization
          </h2>
          <InputField
            label="Role-Specific Salary Adjustments"
            name="salaryAdjustments"
            value={formData.phone}
            onChange={handleChange}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="salaryInsightsInterest"
              // checked={formData.salaryInsightsInterest}
              onChange={handleChange}
            />
            <label>Interested in salary benchmarks and market insights?</label>
          </div>
          <h2 className="text-[#000000] text-lg font-bold">
            Additional Details (Optional)
          </h2>
          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Upload Resume:</label>
            <input
              type="file"
              name="resume"
              // onChange={handleFileChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Upload Cover Letter (Optional):</label>
            <input
              type="file"
              name="coverLetter"
              // onChange={handleFileChange}
              className="border p-2 w-full rounded"
            />
            <h2 className="text-[#000000] text-lg font-bold">
              Employer Invitation (Optional)
            </h2>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="inviteEmployer"
                checked={formData.inviteEmployer}
                onChange={handleChange}
              />
              <label>Invite an employer to participate in Salary-Safe?</label>
            </div>
          </div>
          {formData.inviteEmployer && (
            <>
              <InputField
                label="Employer Name"
                name="employerDetails.name"
                // value={formData.employerDetails.name}
                onChange={handleChange}
              />
              <InputField
                label="Contact Person’s Name"
                name="employerDetails.contactPerson"
                // value={formData.employerDetails.contactPerson}
                onChange={handleChange}
              />
              <InputField
                label="Contact Email"
                type="email"
                name="employerDetails.contactEmail"
                // value={formData.employerDetails.contactEmail}
                onChange={handleChange}
              />
              <InputField
                label="Message to Employer (optional)"
                name="employerDetails.message"
                // value={formData.employerDetails.message}
                onChange={handleChange}
              />
            </>
          )}
          <h2 className="text-[#000000] text-lg font-bold">
            Notifications & Communication Preferences
          </h2>
          <MultiSelectComponent
            isMulti={true}
            label="Receive notifications via:"
            options={options}
          />
          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Job Alerts Frequency:</label>
            <select
              name="jobAlertsFrequency"
              // onChange={handleChange}
              // value={formData.jobAlertsFrequency}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <h2 className="text-[#000000] text-lg font-bold">
            Referral Information (Optional)
          </h2>
          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">How did you hear about us?:</label>
            <select
              name="referralSource"
              // onChange={handleChange}
              // value={formData.referralSource}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Source</option>
              <option value="Friend">Friend</option>
              <option value="Social Media">Social Media</option>
              <option value="Web Search">Web Search</option>
            </select>
          </div>
          <InputField
            label="Referral Code (Optional)"
            name="referralCode"
            // value={formData.referralCode}
            onChange={handleChange}
          />
          <h2 className="text-[#000000] text-lg font-bold">
            Agreement and Submission
          </h2>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="agreedToTerms"
              // checked={formData.agreedToTerms}
              onChange={handleChange}
            />
            <label>
              I agree to the{" "}
              <Link to="/terms" className="text-blue-500 underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-blue-500 underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-[#019529] text-white px-4 py-2 rounded-md"
          >
            Sign Up
          </button>
          <div className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login-employee" className="text-[#019529] underline">
              Login
            </Link>
          </div>

          {/* Social Login (Optional) */}
          {/* <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={GoggleHandler}
              className="bg-[#4285F4] text-white px-4 py-2 rounded-md"
            >
              Login with Google
            </button>
            <button
              onClick={LinkdinHandler} className="bg-[#0077B5] text-white px-4 py-2 rounded-md"
            >
              Login with LinkedIn
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default CandidateSignUp;
