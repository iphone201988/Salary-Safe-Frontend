import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import InputField from "../../../../components/InputField/InputField";
import {
  employeerRegistrationSchema,
  validateForm,
} from "../../../../Schema/Schemas";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { employeerRegister } from "../../../../API/apis";
import Loader from "../../../../components/Loader/Loader";
import { industrys } from "../../../../utils/helper";
import MultiSelectComponent from "../../../../components/MultiSelect/MultiSelect";

interface SignUpFormData {
  companyName: string;
  companyLocation: string;
  companySize: string;
  email: string;
  phone: string;
  password: string;
  industry: string;
  PrimaryContact: string;
  primaryHiringGoals: any[];
  preferredJobLocations: any[];
  rolesPositions: any[];
  jobTypes: any[];
  keyMetrics: any | string;
  roleCustomization: any | string;
  salaryBenchmarking: any | string;
  candidateViewingPreferences: any | string;
  offerOptimization: any | string;
  marketRoleAlerts: any | string;
  customReports: any | any;
  automatedUpdates: any | string;
  candidateFeedback: any | string;
  referralHow: string | any;
  referralCode: string | any;
}

interface SignUpFormErrors {
  companyName?: string;
  companyLocation?: string;
  companySize?: string;
  email?: string;
  phone?: string;
  password?: string;
  industry?: string;
  PrimaryContact?: string;
  primaryHiringGoals?: string;
  preferredJobLocations?: string;
  rolesPositions?: string;
  jobTypes?: string;
  keyMetrics?: string;
  roleCustomization?: string;
  salaryBenchmarking?: string;
  candidateViewingPreferences?: string;
  offerOptimization?: any | string;
  marketRoleAlerts?: string;
  customReports?: any | string;
  automatedUpdates?: any | string;
  candidateFeedback?: any | string;
  referralHow?: string;
  referralCode?: string;
}

interface TeamMember {
  name: string;
  email: string;
  role: string;
}

const libraries: any = ["places"];

const CompanySignUp: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBFBwlTTtqbm5uwk0tIWEOEwR9CXSeCJuA",
    libraries,
  });
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<SignUpFormData>({
    companyName: "",
    companyLocation: "",
    companySize: "",
    email: "",
    phone: "",
    password: "",
    industry: "",
    PrimaryContact: "",
    primaryHiringGoals: [],
    preferredJobLocations: [],
    rolesPositions: [],
    jobTypes: [],
    keyMetrics: "",
    roleCustomization: "",
    salaryBenchmarking: "",
    candidateViewingPreferences: "",
    offerOptimization: "",
    marketRoleAlerts: "",
    customReports: "",
    automatedUpdates: "",
    candidateFeedback: "",
    referralHow: "",
    referralCode: "",
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: "", email: "", role: "" },
  ]);

  const [errors, setErrors] = useState<SignUpFormErrors>({});
  const navigate = useNavigate();
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelectChange = (field: string, selectedOptions: any) => {
    setFormData({ ...formData, [field]: selectedOptions });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      ...formData,
      automatedUpdates: formData.automatedUpdates.value,
      candidateFeedback: formData.candidateFeedback.value,
      customReports: formData.customReports.value,
      offerOptimization: formData.offerOptimization.value,
      marketRoleAlerts: formData.marketRoleAlerts.value,
      candidateViewingPreferences: formData.candidateViewingPreferences.value,
      roleCustomization: formData.roleCustomization.value,
      salaryBenchmarking: formData.salaryBenchmarking.value,
      keyMetrics: formData.keyMetrics.value,
      referralHow: formData.referralHow.value,
      teamMembers,
      primaryHiringGoals: formData.primaryHiringGoals
        .filter((item) => item.value)
        .map((item) => item.value),
      preferredJobLocations: formData.preferredJobLocations
        .filter((item) => item.value)
        .map((item) => item.value),
      rolesPositions: formData.rolesPositions
        .filter((item) => item.value)
        .map((item) => item.value),
      jobTypes: formData.jobTypes
        .filter((item) => item.value)
        .map((item) => item.value),
    };

    console.log(data);

    const currentErrors: any = await validateForm(
      employeerRegistrationSchema,
      data
    );

    console.log("currentErrors::", currentErrors, formData);
    if (currentErrors) {
      setErrors(currentErrors);
      setLoading(false);
      return;
    }
    setErrors({});
    try {
      const body = {
        email: formData.email,
        company_name: formData.companyName,
        industry: formData.industry,
        company_size: formData.companySize,
        headquarters_location: formData.companyLocation,
        primary_contact_person: formData.PrimaryContact, 
        contact_phone_number: formData.phone,
        primary_hiring_goals: data.primaryHiringGoals,
        preferred_job_locations: data.preferredJobLocations,
        roles_of_interest: data.rolesPositions,
        job_types: data.jobTypes,
        dashboard_metrics: data.keyMetrics,
        role_specific_customization: data.roleCustomization,
        enable_competitive_salary_benchmarking: data.salaryBenchmarking,
        receive_salary_adjustment_suggestions: "",
        candidate_viewing_preferences: data.candidateViewingPreferences,
        enable_offer_optimization: data.offerOptimization,
        enable_budget_analysis: "",
        enable_real_time_market_alerts: "",
        enable_custom_reporting: "",
        preferred_report_frequency: "string",
        enable_automated_updates: data.automatedUpdates,
        enable_candidate_feedback_analysis: data.candidateFeedback,
        invite_team_member: data.teamMembers,
        referral_source: data.referralHow,
        referral_code: data.referralCode,
        terms_accepted: true,
        password: formData.password,
      };
      const response = await axios.post(employeerRegister, body);
      if (response.status === 200) {
        toast.success("Registration successful!");
        navigate("/login-company");
      } else {
        setLoading(false);
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error("Registration failed. Please try again.");
    }
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.formatted_address) {
      setFormData({ ...formData, companyLocation: place.formatted_address });
    }
  };

  const options = [
    { value: "goal1", label: "goal1" },
    { value: "goal2", label: "goal2" },
    { value: "goal3", label: "goal3" },
  ];

  const jobtypesOptions = [
    { value: "Full-Time", label: "Full-Time" },
    { value: "Part-Time", label: "Part-Time" },
    { value: "Contract", label: "Contract" },
    { value: "Internship", label: "Internship" },
    { value: "Freelance", label: "Freelance" },
  ];

  // const preference = [
  //   { value: "Yes", label: "Yes" },
  //   { value: "No", label: "No" },
  // ];

  const pool = [
    { value: "1", label: "Experience and Skill Sets" },
    { value: "2", label: "Salary Expectations" },
    { value: "3", label: "Fit and Alignment Insights" },
    { value: "4", label: "Engagement Metrics" },
  ];

  const offer = [
    { value: "1", label: "Salary Negotiation Support" },
    { value: "2", label: "Offer Acceptance Probability Model" },
    { value: "3", label: "Budget Impact Analysis" },
  ];

  // const preference2 = [
  //   { value: "1", label: "Enable Competitive Salary Benchmarking" },
  //   { value: "2", label: "Receive Salary Adjustment Suggestions" },
  // ];

  const referralHow = [
    { value: "Referral", label: "Referral" },
    { value: "Friend", label: "Friend" },
    { value: "Social Media", label: "Social Media" },
    { value: "Other", label: "Other" },
  ];

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
  ];

  const Preferred_Job_Locations = [
    { value: "1", label: "Remote" },
    { value: "2", label: "On-site" },
  ];

  const Positions_of_Interest = [{ value: "1", label: "Software Engineer" }];

  const Key_Metrics = [
    { value: "candidateViews", label: "Candidate Views" },
    { value: "rolePerformance", label: "Role Performance" },
    { value: "salaryCompetitiveness", label: "Salary Competitiveness" },
    { value: "budgetImpactAnalysis", label: "Budget Impact Analysis" },
    { value: "engagementData", label: "Engagement Data" },
  ];

  const Role_Specific = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const SalaryBenchmarkingOptions = [
    {
      value: "enableBenchmarking",
      label: "Enable Competitive Salary Benchmarking",
    },
    {
      value: "receiveAdjustmentSuggestions",
      label: "Receive Salary Adjustment Suggestions",
    },
  ];

  const MarketAndRoleAlertsOptions = [
    { value: "enableRealTimeAlerts", label: "Enable Real-Time Market Alerts" },
  ];

  const CustomReportsOptions = [
    { value: "enableCustomReports", label: "Enable Custom Reporting" },
  ];

  const AutomatedUpdatesOptions = [
    { value: "enableAutomatedUpdates", label: "Enable Automated Updates" },
  ];

  const CandidateFeedbackInsightsOptions = [
    {
      value: "enableFeedbackAnalysis",
      label: "Enable Candidate Feedback Analysis",
    },
  ];

  const handleAddMember = () => {
    setTeamMembers([...teamMembers, { name: "", email: "", role: "" }]);
  };

  const handleInputChange = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    const newMembers = [...teamMembers];
    newMembers[index][field] = value;
    setTeamMembers(newMembers);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {loading && <Loader />}
      <div className="w-full max-w-lg p-8 m-10 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Employer Sign-Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="font-[600] text-lg">Company Information</div>
          <InputField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            error={errors.companyName}
          />

          <label className="block text-gray-700">Industry</label>
          <select
            name="industry"
            className={`border border-black rounded-md w-full p-2 ${
              errors?.industry && "border-red-600"
            }`}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            value={formData.industry}
          >
            <option value="">Select Industry</option>
            {industrys.map((data, index) => (
              <option key={index} value={data}>
                {data}
              </option>
            ))}
          </select>
          {errors?.industry && (
            <small className="text-red-600 font-bold text-sm">
              {errors.industry}
            </small>
          )}

          <label className="block text-gray-700">Company Size</label>
          <select
            name="companySize"
            className={`border border-black rounded-md w-full p-2 ${
              errors?.companySize && "border-red-600"
            }`}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            value={formData.companySize}
          >
            <option value="">Select Size</option>
            <option value="0-10">0-10</option>
            <option value="10-50">10-50</option>
            <option value="50-100">50-100</option>
            <option value="100 or above">100 or above</option>
          </select>
          {errors?.companySize && (
            <small className="text-red-600 font-bold text-sm">
              {errors.companySize}
            </small>
          )}

          {isLoaded && (
            <div>
              <label className="block text-gray-700">Headquarters</label>
              <Autocomplete
                onLoad={(autocomplete) =>
                  (autocompleteRef.current = autocomplete)
                }
                onPlaceChanged={handlePlaceSelect}
              >
                <input
                  name="companyLocation"
                  value={formData.companyLocation}
                  onChange={handleChange}
                  placeholder="Search location"
                  className={`border border-black rounded-md w-full p-2 ${
                    errors?.companyLocation && "border-red-600"
                  }`}
                />
              </Autocomplete>
              {errors?.companyLocation && (
                <small className="text-red-600 font-bold text-sm">
                  {errors.companyLocation}
                </small>
              )}
            </div>
          )}

          <InputField
            label="Primary Contact"
            name="PrimaryContact"
            value={formData.PrimaryContact}
            onChange={handleChange}
            error={errors?.PrimaryContact}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
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

          <div className="font-[600] text-lg">Hiring Goals and Preferences</div>

          <MultiSelectComponent
            isMulti={true}
            label="Primary Hiring Goals"
            options={options}
            onChange={(selected) =>
              handleMultiSelectChange("primaryHiringGoals", selected)
            }
            value={formData.primaryHiringGoals}
          />

          {errors?.primaryHiringGoals && (
            <small className="text-red-600 font-bold text-sm">
              {errors.primaryHiringGoals}
            </small>
          )}

          <MultiSelectComponent
            isMulti={true}
            label="Preferred Job Locations"
            options={Preferred_Job_Locations}
            onChange={(selected) =>
              handleMultiSelectChange("preferredJobLocations", selected)
            }
            value={formData.preferredJobLocations}
          />

          {errors?.preferredJobLocations && (
            <small className="text-red-600 font-bold text-sm">
              {errors.preferredJobLocations}
            </small>
          )}

          <MultiSelectComponent
            isMulti={true}
            label="Roles/Positions of Interest"
            options={Positions_of_Interest}
            onChange={(selected) =>
              handleMultiSelectChange("rolesPositions", selected)
            }
            value={formData.rolesPositions}
          />

          {errors?.rolesPositions && (
            <small className="text-red-600 font-bold text-sm">
              {errors.rolesPositions}
            </small>
          )}

          <MultiSelectComponent
            isMulti={true}
            label="Job Types"
            options={jobtypesOptions}
            onChange={(selected) =>
              handleMultiSelectChange("jobTypes", selected)
            }
            value={formData.jobTypes}
          />

          {errors?.jobTypes && (
            <small className="text-red-600 font-bold text-sm">
              {errors.jobTypes}
            </small>
          )}

          <div className="font-[600] text-lg">Dashboard Customization</div>
          <MultiSelectComponent
            isMulti={false}
            label="Select Key Metrics and Widgets"
            options={Key_Metrics}
            onChange={(selected) =>
              handleMultiSelectChange("keyMetrics", selected)
            }
            value={formData.keyMetrics}
          />

          {errors?.keyMetrics && (
            <small className="text-red-600 font-bold text-sm">
              {errors.keyMetrics}
            </small>
          )}

          <div className="font-[600] text-lg">Job Posting Preferences</div>

          <MultiSelectComponent
            isMulti={false}
            label="Role-Specific Customization"
            options={Role_Specific}
            onChange={(selected) =>
              handleMultiSelectChange("roleCustomization", selected)
            }
            value={formData.roleCustomization}
          />

          {errors?.roleCustomization && (
            <small className="text-red-600 font-bold text-sm">
              {errors.roleCustomization}
            </small>
          )}

          <MultiSelectComponent
            isMulti={false}
            label="Salary Benchmarking Preferences"
            options={SalaryBenchmarkingOptions}
            onChange={(selected) =>
              handleMultiSelectChange("salaryBenchmarking", selected)
            }
            value={formData.salaryBenchmarking}
          />

          {errors?.salaryBenchmarking && (
            <small className="text-red-600 font-bold text-sm">
              {errors.salaryBenchmarking}
            </small>
          )}

          <div className="font-[600] text-lg">Candidate Pool Access</div>

          <MultiSelectComponent
            isMulti={false}
            label="Candidate Viewing Preferences"
            options={pool}
            onChange={(selected) =>
              handleMultiSelectChange("candidateViewingPreferences", selected)
            }
            value={formData.candidateViewingPreferences}
          />

          {errors?.candidateViewingPreferences && (
            <small className="text-red-600 font-bold text-sm">
              {errors.candidateViewingPreferences}
            </small>
          )}

          <div className="font-[600] text-lg">Offer and Negotiation Tools</div>

          <MultiSelectComponent
            isMulti={false}
            label="Offer Optimization"
            options={offer}
            onChange={(selected) =>
              handleMultiSelectChange("offerOptimization", selected)
            }
            value={formData.offerOptimization}
          />

          {errors?.offerOptimization && (
            <small className="text-red-600 font-bold text-sm">
              {errors.offerOptimization}
            </small>
          )}

          <div className="font-[600] text-lg">
            Reporting and Performance Tracking
          </div>

          <MultiSelectComponent
            isMulti={false}
            label="Market and Role Alerts"
            options={MarketAndRoleAlertsOptions}
            onChange={(selected) =>
              handleMultiSelectChange("marketRoleAlerts", selected)
            }
            value={formData.marketRoleAlerts}
          />

          {errors?.marketRoleAlerts && (
            <small className="text-red-600 font-bold text-sm">
              {errors.marketRoleAlerts}
            </small>
          )}

          <MultiSelectComponent
            isMulti={false}
            label="Custom Reports"
            options={CustomReportsOptions}
            onChange={(selected) =>
              handleMultiSelectChange("customReports", selected)
            }
            value={formData.customReports}
          />

          {errors?.primaryHiringGoals && (
            <small className="text-red-600 font-bold text-sm">
              {errors.customReports}
            </small>
          )}

          <div className="font-[600] text-lg">
            Communication and Candidate Engagement
          </div>

          <MultiSelectComponent
            isMulti={false}
            label="Automated Updates to Candidates"
            options={AutomatedUpdatesOptions}
            onChange={(selected) =>
              handleMultiSelectChange("automatedUpdates", selected)
            }
            value={formData.automatedUpdates}
          />

          {errors?.automatedUpdates && (
            <small className="text-red-600 font-bold text-sm">
              {errors.automatedUpdates}
            </small>
          )}

          <MultiSelectComponent
            isMulti={false}
            label="Candidate Feedback Insights"
            options={CandidateFeedbackInsightsOptions}
            onChange={(selected) =>
              handleMultiSelectChange("candidateFeedback", selected)
            }
            value={formData.candidateFeedback}
          />

          {errors?.candidateFeedback && (
            <small className="text-red-600 font-bold text-sm">
              {errors.candidateFeedback}
            </small>
          )}

          <div>
            <div className="font-[600] text-lg">
              Invite Other Team Members (Optional)
            </div>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="mb-4 border border-black p-2 rounded-md"
              >
                <InputField
                  label="Team Member Name"
                  name={`name-${index}`}
                  value={member.name}
                  onChange={(e: any) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                />
                <InputField
                  label="Email"
                  name={`email-${index}`}
                  value={member.email}
                  onChange={(e: any) =>
                    handleInputChange(index, "email", e.target.value)
                  }
                />
                {/* <div className="w-full flex flex-col space-y-1">
                  <label className="text-left">Role</label>
                  <Select
                    options={roleOptions}
                    value={member.role}
                    onChange={(value) =>
                      handleInputChange(index, "role", value as any)
                    }
                  />
                </div> */}

                <MultiSelectComponent
                  isMulti={false}
                  label="Role"
                  options={roleOptions}
                  onChange={(selected) =>
                    handleInputChange(index, "role", selected as any)
                  }
                  value={member.role}
                />
              </div>
            ))}
            <button
              onClick={handleAddMember}
              className="mt-2 text-sm rounded-xl p-2 bg-blue-400"
            >
              Add Another
            </button>
          </div>

          <div className="font-[600] text-lg">
            Referral Information (Optional)
          </div>

          <MultiSelectComponent
            isMulti={false}
            label="How did you hear about us?"
            options={referralHow}
            onChange={(selected) =>
              handleMultiSelectChange("referralHow", selected)
            }
            value={formData.referralHow}
          />
          {errors?.referralHow && (
            <small className="text-red-600 font-bold text-sm">
              {errors.referralHow}
            </small>
          )}

          <InputField
            label="Referral Code"
            name="referralCode"
            type="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            error={errors.referralCode}
          />

          <div className="font-[600] text-lg">Agreement and Submission</div>

          <div className="flex items-center">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 underline">
                Terms of Service
              </a>{" "}
              and the{" "}
              <a href="/privacy" className="text-blue-600 underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>

          <div className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login-company" className="text-[#019529] underline">
              Login
            </Link>
            {" | "}
            <Link to="/" className="text-[#019529] underline">
              Home
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#019529] text-white px-4 py-2 rounded-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanySignUp;
