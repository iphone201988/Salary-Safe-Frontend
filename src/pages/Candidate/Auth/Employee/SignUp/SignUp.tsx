import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import InputField from "../../../../../components/InputField/InputField";
import {
  candidateSignUpSchema,
  validateForm,
} from "../../../../../Schema/Schemas";
// import { signInWithPopup } from "firebase/auth";
// import { auth, googleauthProvider } from "../../../../../../firebase";
import {
  candidateRegister,
  /*  getcandidatesProfile, */
  /* userSocialLogin, */
} from "../../../../../API/apis";
// import { useDispatch } from "react-redux";
// import { setUserData } from "../../../../../Redux/reducer/userData";
// import { login } from "../../../../../Redux/reducer/authSlice";
import Loader from "../../../../../components/Loader/Loader";
import MultiSelectComponent from "../../../../../components/MultiSelect/MultiSelect";
import {
  benefitsOptions,
  educationLevelOptions,
  experienceOptions,
  industriesOfInterestOptional,
  jobAlertsFrequencyOptions,
  jobTypePreferencesOptions,
  notificationPreferencesOptions,
  professionalDevelopmentAreasOptions,
  referralSourceOptions,
  salaryTypeOptions,
  skillsOptions,
  viewSalaryPermissionOptions,
} from "./options";
import {
  SignUpCandidate,
  SignUpCandidateFormErrors,
} from "../../../../../types";

const CandidateSignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignUpCandidate>({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
    location: "",
    current_job_title: "",
    linkedin_profile_url: "",
    job_titles_of_interest: "",
    total_years_of_experience: "",
    education_level: "",
    key_skills: [] as string[],
    general_salary_range: "",
    preferred_salary_type: "",
    open_to_performance_based_compensation: false,
    willing_to_negociate: false,
    minimum_acceptable_salary: "",
    preferred_benefits: [] as string[],
    view_salary_expectations: "",
    hide_profile_from_current_employer: false,
    industries_of_interest: [] as string[],
    job_type_preferences: [] as string[],
    actively_looking_for_new_job: false,
    career_goals: "",
    professional_development_areas: [] as string[],
    role_specific_salary_adjustments: "",
    salaryInsightsInterest: false,
    resume_upload: null as File | null,
    cover_letter_upload: null as File | null,
    invite_employer: false,
    employer_name: "",
    contact_person_name: "",
    contact_email: "",
    message_to_employer: "",
    notificationPreferences: [] as string[],
    job_alerts_frequency: "",
    referral_source: "",
    referral_code: "",
    terms_accepted: false,
  });
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<SignUpCandidateFormErrors>({});
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files?.[0] : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("hello");
    setLoading(true);
    const data = {
      ...formData,
      education_level: formData.education_level.value,
      total_years_of_experience: formData.total_years_of_experience.value,
      view_salary_expectations: formData.view_salary_expectations.value,
      referral_source: formData.referral_source.value,
      preferred_salary_type: formData.preferred_salary_type.value,
      job_alerts_frequency: formData.job_alerts_frequency.value,
      professional_development_areas: formData.professional_development_areas
        .filter((item: any) => item.value)
        .map((item: any) => item.value),
      preferred_benefits: formData.preferred_benefits
        .filter((item: any) => item.value)
        .map((item: any) => item.value),
      notificationPreferences: formData.notificationPreferences
        .filter((item: any) => item.value)
        .map((item: any) => item.value),
      key_skills: formData.key_skills
        .filter((item: any) => item.value)
        .map((item: any) => item.value),
      job_type_preferences: formData.job_type_preferences
        .filter((item: any) => item.value)
        .map((item: any) => item.value),
      industries_of_interest: formData.industries_of_interest
        .filter((item: any) => item.value)
        .map((item: any) => item.value),
    };
    console.log("data", data);
    const currentErrors: any = await validateForm(candidateSignUpSchema, data);

    if (currentErrors) {
      console.log("currentErrors", currentErrors);
      setErrors(currentErrors);
      setLoading(false);
      return;
    }
    setErrors({});
    // Create FormData for multipart/form-data request
    const formDataToSend = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // For arrays, append each item individually
        value.forEach((item) => formDataToSend.append(key, item));
      } else if(key=="resume_upload"||key=="cover_letter_upload"){
        // For files, append the file directly
        // formDataToSend.append(key, value as any);
      }
       else {
        formDataToSend.append(key, value as any);
      }
    });
    // Append the resume and cover letter files
    if (formData.resume_upload) {
      formDataToSend.append("resume_upload", formData.resume_upload);
    }
    if (formData.cover_letter_upload) {
      formDataToSend.append(
        "cover_letter_upload",
        formData.cover_letter_upload
      );
    }
    console.log("formDataToSend", formDataToSend);

    try {
      const response = await axios.post(candidateRegister, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    }
  };

  const handleMultiSelectChange = (field: string, selectedOptions: any) => {
    setFormData({ ...formData, [field]: selectedOptions });
  };
  // console.log("from", formData);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg p-8 m-10 bg-white rounded-lg shadow-md ">
        <h2 className="text-2xl font-bold text-center mb-6">
          Candidate Sign Up
        </h2>

        <form onSubmit={handleSubmit} className={`space-y-4 ${loading?"backdrop:blur-sm":""}`}>
          <h2 className="text-[#000000] text-lg font-bold">
            Personal Information
          </h2>
          <InputField
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            error={errors.full_name}
            placeholder="Enter Full Name"
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Enter Email"
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
            name="phone_number"
            value={formData.phone_number}
            placeholder="+1 123 456 7890"
            onChange={handleChange}
            error={errors.phone_number}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Enter Password"
          />
          <InputField
            label="Location"
            name="location"
            placeholder="City, State/Region, Country"
            value={formData.location}
            onChange={handleChange}
            error={errors.location}
          />

          <InputField
            label="Current Job Title"
            name="current_job_title"
            placeholder="baackend devolper"
            value={formData.current_job_title}
            onChange={handleChange}
            error={errors.current_job_title}
          />
          <InputField
            label="LinkedIn Profile URL"
            name="linkedin_profile_url"
            placeholder="https://www.linkedin.com/in/techwin-labs-8b131b282/"
            value={formData.linkedin_profile_url}
            onChange={handleChange}
            error={errors.linkedin_profile_url}
          />

          <h2 className="text-[#000000] text-lg font-bold">
            Profile Creation and Setup
          </h2>
          <InputField
            label="Job Titles/Positions of Interest"
            name="job_titles_of_interest"
            placeholder="Manager"
            value={formData.job_titles_of_interest}
            onChange={handleChange}
            error={errors.job_titles_of_interest}
          />
          <MultiSelectComponent
            isMulti={false}
            label="Total Years of Experience:"
            value={formData.total_years_of_experience}
            options={experienceOptions}
            onChange={(selected) =>
              handleMultiSelectChange("total_years_of_experience", selected)
            }
            error={errors.total_years_of_experience}
          />
          {/* <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Total Years of Experience:</label>
            <select
              name="total_years_of_experience"
              onChange={handleChange}
              value={formData.total_years_of_experience}
              className="border p-2 w-full rounded"
            >
               <option value="">Select Industry</option>
            {experienceOptions.map((data, index) => (
              <option key={index} value={data.value}>
                {data.label}
              </option>
            ))}
            </select>
          </div> */}
          <MultiSelectComponent
            isMulti={false}
            label="Education Level:"
            value={formData.education_level}
            options={educationLevelOptions}
            onChange={(selected) =>
              handleMultiSelectChange("education_level", selected)
            }
            error={errors.education_level}
          />
          {/* <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Education Level:</label>
            <select
              name="education_level"
               onChange={handleChange}
               value={formData.education_level}
              className="border p-2 w-full rounded"
            >
               <option value="">Select Industry</option>
            {educationLevelOptions.map((data, index) => (
              <option key={index} value={data.value}>
                {data.label}
              </option>
            ))}
            </select>
          </div> */}
          <MultiSelectComponent
            isMulti={true}
            label="Skills:"
            options={skillsOptions}
            value={formData.key_skills}
            onChange={(selected) =>
              handleMultiSelectChange("key_skills", selected)
            }
            error={errors.key_skills}
          />
          <h2 className="text-[#000000] text-lg font-bold">
            Salary Expectations
          </h2>
          <InputField
            label="General Salary Range"
            name="general_salary_range"
            type="number"
            value={formData.general_salary_range}
            onChange={handleChange}
            error={errors.general_salary_range}
            placeholder="Enter General Salary Range"
            min={5000}
          />
          <MultiSelectComponent
            isMulti={false}
            label="Preferred Salary Type:"
            value={formData.preferred_salary_type}
            options={salaryTypeOptions}
            onChange={(selected) =>
              handleMultiSelectChange("preferred_salary_type", selected)
            }
            error={errors.preferred_salary_type}
          />
          {/* <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Preferred Salary Type:</label>
            <select
              name="preferred_salary_type"
               onChange={handleChange}
               value={formData.preferred_salary_type}
              className="border p-2 w-full rounded"
            >
               <option value="">Select Industry</option>
            {salaryTypeOptions.map((data, index) => (
              <option key={index} value={data.value}>
                {data.label }
              </option>
            ))}
            </select>
          </div> */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="open_to_performance_based_compensation"
              name="open_to_performance_based_compensation"
              checked={formData.open_to_performance_based_compensation}
              onChange={handleChange}
            />
            <label htmlFor="open_to_performance_based_compensation">
              Open to performance-based compensation?
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="willing_to_negociate"
              name="willing_to_negociate"
              checked={formData.willing_to_negociate}
              onChange={handleChange}
            />
            <label htmlFor="willing_to_negociate">Willing to Negotiate?</label>
          </div>
          <InputField
            label="Minimum Acceptable Salary (Optional)"
            type="number"
            name="minimum_acceptable_salary"
            value={formData.minimum_acceptable_salary}
            onChange={handleChange}
            error={errors.minimum_acceptable_salary}
            placeholder="Enter Minimum Acceptable Salary"
            min={5000}
          />
          <MultiSelectComponent
            isMulti={true}
            label="Preferred Benefits:"
            options={benefitsOptions}
            value={formData.preferred_benefits}
            onChange={(selected) =>
              handleMultiSelectChange("preferred_benefits", selected)
            }
            error={errors.preferred_benefits}
          />
          <h2 className="text-[#000000] text-lg font-bold">Privacy Controls</h2>
          <MultiSelectComponent
            isMulti={false}
            label="Preferred Salary Type:"
            value={formData.view_salary_expectations}
            options={viewSalaryPermissionOptions}
            onChange={(selected) =>
              handleMultiSelectChange("view_salary_expectations", selected)
            }
            error={errors.preferred_salary_type}
          />
          {/* <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Preferred Salary Type:</label>
            <select
              name="view_salary_expectations"
               onChange={handleChange}
               value={formData.view_salary_expectations}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Permission</option>
              <option value="Everyone">Everyone</option>
              <option value="Employers Only">Employers Only</option>
              <option value="Private">Private</option>
            </select>
          </div> */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hide_profile_from_current_employer"
              name="hide_profile_from_current_employer"
              checked={formData.hide_profile_from_current_employer}
              onChange={handleChange}
            />
            <label htmlFor="hide_profile_from_current_employer">
              Hide my profile from current employer(s)
            </label>
          </div>
          <h2 className="text-[#000000] text-lg font-bold">
            Job Search Preferences
          </h2>

          <MultiSelectComponent
            isMulti={true}
            label="Industries of Interest:"
            value={formData.industries_of_interest}
            options={industriesOfInterestOptional}
            onChange={(selected) =>
              handleMultiSelectChange("industries_of_interest", selected)
            }
            error={errors.industries_of_interest}
          />
          <MultiSelectComponent
            isMulti={true}
            label="Job Type Preferences:"
            options={jobTypePreferencesOptions}
            value={formData.job_type_preferences}
            onChange={(selected) =>
              handleMultiSelectChange("job_type_preferences", selected)
            }
            error={errors.job_type_preferences}
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="actively_looking_for_new_job"
              name="actively_looking_for_new_job"
              checked={formData.actively_looking_for_new_job}
              onChange={handleChange}
            />
            <label htmlFor="actively_looking_for_new_job">
              Are you actively looking for a new job?
            </label>
          </div>
          <InputField
            label="Career Goals"
            name="career_goals"
            value={formData.career_goals}
            onChange={handleChange}
            error={errors.career_goals}
            placeholder="Enter Career Goals"
          />
          <MultiSelectComponent
            isMulti={true}
            label="Professional Development Areas:"
            options={professionalDevelopmentAreasOptions}
            value={formData.professional_development_areas}
            onChange={(selected) =>
              handleMultiSelectChange(
                "professional_development_areas",
                selected
              )
            }
            error={errors.professional_development_areas}
          />
          <h2 className="text-[#000000] text-lg font-bold">
            Salary Insights & Customization
          </h2>
          <InputField
            label="Role-Specific Salary Adjustments"
            name="role_specific_salary_adjustments"
            value={formData.role_specific_salary_adjustments}
            onChange={handleChange}
            error={errors.role_specific_salary_adjustments}
            placeholder="Enter Role-Specific Salary Adjustments"
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="salaryInsightsInterest"
              name="salaryInsightsInterest"
              checked={formData.salaryInsightsInterest}
              onChange={handleChange}
            />
            <label htmlFor="salaryInsightsInterest">
              Interested in salary benchmarks and market insights?
            </label>
          </div>
          <h2 className="text-[#000000] text-lg font-bold">
            Additional Details (Optional)
          </h2>
          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Upload Resume:</label>
            <input
              type="file"
              accept="
              application/pdf,
              application/vnd.openxmlformats-officedocument.wordprocessingml.document,
             .doc,.docx"
              name="resume_upload"
              onChange={handleFileChange}
              className="border p-2 w-full rounded"
            />
            {errors.resume_upload && (
              <small className="text-red-600 font-bold text-sm">
                {errors.resume_upload}
              </small>
            )}
          </div>
          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Upload Cover Letter (Optional):</label>
            <input
              type="file"
              accept="
              application/pdf,
              application/vnd.openxmlformats-officedocument.wordprocessingml.document,
             .doc,.docx"
              name="cover_letter_upload"
              onChange={handleFileChange}
              className="border p-2 w-full rounded"
            />
            <h2 className="text-[#000000] text-lg font-bold">
              Employer Invitation (Optional)
            </h2>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="invite_employer"
                name="invite_employer"
                checked={formData.invite_employer}
                onChange={handleChange}
              />
              <label htmlFor="invite_employer">
                Invite an employer to participate in Salary-Safe?
              </label>
            </div>
          </div>
          {formData.invite_employer && (
            <>
              <InputField
                label="Employer Name"
                name="employer_name"
                value={formData.employer_name}
                onChange={handleChange}
                error={errors.employer_name}
                placeholder="Enter Employer Name"
              />
              <InputField
                label="Contact Person’s Name"
                name="contact_person_name"
                value={formData.contact_person_name}
                onChange={handleChange}
                error={errors.contact_person_name}
                placeholder="Enter Contact Person’s Name here"
              />
              <InputField
                label="Contact Email"
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                error={errors.contact_email}
                placeholder="Enter Contact Email here"
              />
              <InputField
                label="Message to Employer (optional)"
                name="message_to_employer"
                value={formData.message_to_employer}
                onChange={handleChange}
                error={errors.message_to_employer}
                placeholder="Enter Message to Employer"
              />
            </>
          )}
          <h2 className="text-[#000000] text-lg font-bold">
            Notifications & Communication Preferences
          </h2>
          <MultiSelectComponent
            isMulti={true}
            label="Receive notifications via:"
            options={notificationPreferencesOptions}
            value={formData.notificationPreferences}
            onChange={(selected) =>
              handleMultiSelectChange("notificationPreferences", selected)
            }
            error={errors.notificationPreferences}
          />
          <MultiSelectComponent
            isMulti={false}
            label="Job Alerts Frequency:"
            options={jobAlertsFrequencyOptions}
            value={formData.job_alerts_frequency}
            onChange={(selected) =>
              handleMultiSelectChange("job_alerts_frequency", selected)
            }
            error={errors.job_alerts_frequency}
          />
          {/* <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Job Alerts Frequency:</label>
            <select
              name="job_alerts_frequency"
              onChange={handleChange}
              value={formData.job_alerts_frequency}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div> */}
          <h2 className="text-[#000000] text-lg font-bold">
            Referral Information (Optional)
          </h2>
          <MultiSelectComponent
            isMulti={false}
            label="How did you hear about us?:"
            options={referralSourceOptions}
            value={formData.referral_source}
            onChange={(selected) =>
              handleMultiSelectChange("referral_source", selected)
            }
            error={errors.referral_source}
          />
          {/* <div className="w-full flex flex-col space-y-1">
            <label className="text-left">How did you hear about us?:</label>
            <select
              name="referral_source"
              onChange={handleChange}
              value={formData.referral_source}
              className="border p-2 w-full rounded"
            >
              <option value="">Select Source</option>
              <option value="Friend">Friend</option>
              <option value="Social Media">Social Media</option>
              <option value="Web Search">Web Search</option>
            </select>
          </div> */}
          <InputField
            label="Referral Code (Optional)"
            name="referral_code"
            value={formData.referral_code}
            onChange={handleChange}
            error={errors.referral_code}
            placeholder="Enter Referral Code"
          />
          <h2 className="text-[#000000] text-lg font-bold">
            Agreement and Submission
          </h2>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms_accepted"
              name="terms_accepted"
              checked={formData.terms_accepted}
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
            className={`w-full bg-[#019529] text-white px-4 py-2 rounded-md  ${
              formData.terms_accepted ? "bg-[#019529]" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!formData.terms_accepted || loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-4 h-4 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login-employee" className="text-[#019529] underline">
              Login
            </Link>
            {" | "}
            <Link to="/" className="text-[#019529] underline">
              Home
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
