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
import { industrys } from "../../../../utils/helper";
import MultiSelectComponent from "../../../../components/MultiSelect/MultiSelect";
import {
  options,
  Positions_of_Interest,
  Key_Metrics,
  Role_Specific,
  SalaryBenchmarkingOptions,
  MarketAndRoleAlertsOptions,
  CustomReportsOptions,
  AutomatedUpdatesOptions,
  CandidateFeedbackInsightsOptions,
  Preferred_Job_Locations,
  jobtypesOptions,
  pool,
  offer,
  roleOptions,
  referralHow,
} from "./options";
import { SignUpFormData, SignUpFormErrors, TeamMember } from "../../../../types";


const libraries: any = ["places"];

const CompanySignUp: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBFBwlTTtqbm5uwk0tIWEOEwR9CXSeCJuA",
    libraries,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement | null>(null);

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

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

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
    if (formRef) {
      formRef.current
        ?.querySelectorAll("input, button")
        .forEach((element: any) => {
          element.disabled = true;
        });
    }

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
      if (formRef) {
        formRef.current
          ?.querySelectorAll("input, button")
          .forEach((element: any) => {
            element.disabled = false;
          });
      }
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
        enable_real_time_market_alerts: true,
        enable_custom_reporting: true,
        preferred_report_frequency: "string",
        enable_automated_updates: data.automatedUpdates,
        enable_candidate_feedback_analysis: data.candidateFeedback,
        invite_team_member: data.teamMembers,
        referral_source: data.referralHow,
        referral_code: data.referralCode,
        terms_accepted: isChecked,
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

    if (formRef) {
      formRef.current
        ?.querySelectorAll("input, button")
        .forEach((element: any) => {
          element.disabled = false;
        });
    }
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.formatted_address) {
      setFormData({ ...formData, companyLocation: place.formatted_address });
    }
  };

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
      <div className="w-full max-w-lg p-8 m-10 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Employer Sign-Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
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
            error={errors.primaryHiringGoals}
          />

          <MultiSelectComponent
            isMulti={true}
            label="Preferred Job Locations"
            options={Preferred_Job_Locations}
            onChange={(selected) =>
              handleMultiSelectChange("preferredJobLocations", selected)
            }
            value={formData.preferredJobLocations}
            error={errors.preferredJobLocations}
          />

          <MultiSelectComponent
            isMulti={true}
            label="Roles/Positions of Interest"
            options={Positions_of_Interest}
            onChange={(selected) =>
              handleMultiSelectChange("rolesPositions", selected)
            }
            value={formData.rolesPositions}
            error={errors.rolesPositions}
          />

          <MultiSelectComponent
            isMulti={true}
            label="Job Types"
            options={jobtypesOptions}
            onChange={(selected) =>
              handleMultiSelectChange("jobTypes", selected)
            }
            value={formData.jobTypes}
            error={errors.jobTypes}
          />

          <div className="font-[600] text-lg">Dashboard Customization</div>
          <MultiSelectComponent
            isMulti={false}
            label="Select Key Metrics and Widgets"
            options={Key_Metrics}
            onChange={(selected) =>
              handleMultiSelectChange("keyMetrics", selected)
            }
            value={formData.keyMetrics}
            error={errors.keyMetrics}
          />

          <div className="font-[600] text-lg">Job Posting Preferences</div>

          <MultiSelectComponent
            isMulti={false}
            label="Role-Specific Customization"
            options={Role_Specific}
            onChange={(selected) =>
              handleMultiSelectChange("roleCustomization", selected)
            }
            value={formData.roleCustomization}
            error={errors.roleCustomization}
          />

          <MultiSelectComponent
            isMulti={false}
            label="Salary Benchmarking Preferences"
            options={SalaryBenchmarkingOptions}
            onChange={(selected) =>
              handleMultiSelectChange("salaryBenchmarking", selected)
            }
            value={formData.salaryBenchmarking}
            error={errors.salaryBenchmarking}
          />

          <div className="font-[600] text-lg">Candidate Pool Access</div>

          <MultiSelectComponent
            isMulti={false}
            label="Candidate Viewing Preferences"
            options={pool}
            onChange={(selected) =>
              handleMultiSelectChange("candidateViewingPreferences", selected)
            }
            value={formData.candidateViewingPreferences}
            error={errors.candidateViewingPreferences}
          />

          <div className="font-[600] text-lg">Offer and Negotiation Tools</div>

          <MultiSelectComponent
            isMulti={false}
            label="Offer Optimization"
            options={offer}
            onChange={(selected) =>
              handleMultiSelectChange("offerOptimization", selected)
            }
            value={formData.offerOptimization}
            error={errors.offerOptimization}
          />

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
            error={errors.marketRoleAlerts}
          />

          <MultiSelectComponent
            isMulti={false}
            label="Custom Reports"
            options={CustomReportsOptions}
            onChange={(selected) =>
              handleMultiSelectChange("customReports", selected)
            }
            value={formData.customReports}
            error={errors.customReports}
          />

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
            error={errors.automatedUpdates}
          />

          <MultiSelectComponent
            isMulti={false}
            label="Candidate Feedback Insights"
            options={CandidateFeedbackInsightsOptions}
            onChange={(selected) =>
              handleMultiSelectChange("candidateFeedback", selected)
            }
            value={formData.candidateFeedback}
            error={errors.candidateFeedback}
          />

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
            error={errors?.referralHow}
          />
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
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
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
            type="button"
            onClick={handleSubmit}
            className={`w-full text-white px-4 py-2 rounded-md ${
              isChecked ? "bg-[#019529]" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isChecked || loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-4 h-4 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanySignUp;
