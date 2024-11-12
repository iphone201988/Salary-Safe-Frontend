import axios from "axios";
import React, { useEffect, useState } from "react";
import { companyDetails } from "../../API/apis";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import CandidateProfile from "./DashboardSettings/CandidateProfile";
import { FaUserEdit } from "react-icons/fa";
import ProfileSetup from "./DashboardSettings/ProfileSetup";
import {
  benefitsOptions,
  educationLevelOptions,
  experienceOptions,
  industriesOfInterestOptional,
  jobAlertsFrequencyOptions,
  jobTypePreferencesOptions,
  notificationPreferencesOptions,
  professionalDevelopmentAreasOptions,
  salaryTypeOptions,
  skillsOptions,
  viewSalaryPermissionOptions,
} from "../../pages/Candidate/Auth/Employee/SignUp/options";
import { getMultiSelectValues } from "../../utils/helper";
import SalaryExpection from "./DashboardSettings/SalaryExpectation";
import PrivacyControl from "./DashboardSettings/PrivacyControl";
import JobSearch from "./DashboardSettings/JobSearch";
import SalaryInsight from "./DashboardSettings/SalaryInsight";
import AdditionalDetails from "./DashboardSettings/AdditionalDetails";
import EmployerInvitation from "./DashboardSettings/EmployerInvitation";
import NotificationPreference from "./DashboardSettings/NotificationPreference";

interface Data {
  email: string;
  phone: string;
  full_name: string;
  notification_preference: boolean;
  qualifications?: string;
  experience?: string;
  location?: string;
  salaryExpectation?: string; // New confidential field
  profileImage?: string; // URL or path to the profile image
}

const DashboardSettings: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [errors, _setErrors] = useState<any>({});
  const [edit, setEdit] = useState<boolean>(true);
  const { employeDetails } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({
    full_name: employeDetails?.full_name || "",
    email: employeDetails?.email || "",
    phone_number: employeDetails?.phone_number || "",
    location: employeDetails?.location || "",
    current_job_title: employeDetails?.current_job_title || "",
    linkedin_profile_url: employeDetails?.linkedin_profile_url || "",
    job_titles_of_interest: employeDetails?.job_titles_of_interest || "",
    total_years_of_experience: employeDetails?.total_years_of_experience
      ? getMultiSelectValues(
          experienceOptions,
          employeDetails.total_years_of_experience
        )
      : 0,
    education_level: employeDetails?.education_level
      ? getMultiSelectValues(
          educationLevelOptions,
          employeDetails.education_level
        )
      : 0,
    key_skills: employeDetails?.key_skills
      ? getMultiSelectValues(skillsOptions, employeDetails.key_skills)
      : [],
    general_salary_range: employeDetails?.general_salary_range || "",
    preferred_salary_type: employeDetails?.preferred_salary_type
      ? getMultiSelectValues(
          salaryTypeOptions,
          employeDetails.preferred_salary_type
        )
      : [],
    open_to_performance_based_compensation:
      employeDetails?.open_to_performance_based_compensation || false,
    willing_to_negociate: employeDetails?.willing_to_negociate || false,
    minimum_acceptable_salary: employeDetails?.minimum_acceptable_salary || 0,
    preferred_benefits: employeDetails?.preferred_benefits
      ? getMultiSelectValues(benefitsOptions, employeDetails.preferred_benefits)
      : [],
    view_salary_expectations: employeDetails?.view_salary_expectations
      ? getMultiSelectValues(
          viewSalaryPermissionOptions,
          employeDetails.view_salary_expectations
        )
      : [],
    hide_profile_from_current_employer:
      employeDetails?.hide_profile_from_current_employer || false,
    industries_of_interest: employeDetails?.industries_of_interest
      ? getMultiSelectValues(
          industriesOfInterestOptional,
          employeDetails.industries_of_interest
        )
      : [],
    job_type_preferences: employeDetails?.job_type_preferences
      ? getMultiSelectValues(
          jobTypePreferencesOptions,
          employeDetails.job_type_preferences
        )
      : [],
    actively_looking_for_new_job:
      employeDetails?.actively_looking_for_new_job || false,
    career_goals: employeDetails?.career_goals || "",
    professional_development_areas:
      employeDetails?.professional_development_areas
        ? getMultiSelectValues(
            professionalDevelopmentAreasOptions,
            employeDetails.professional_development_areas
          )
        : [],
    role_specific_salary_adjustments:
      employeDetails?.role_specific_salary_adjustments || "",
    resume_upload: employeDetails?.resume_upload || null,
    cover_letter_upload: employeDetails?.cover_letter_upload || null,
    invite_employer: employeDetails?.invite_employer || [],
    notificationPreferences: employeDetails?.notificationPreferences
      ? getMultiSelectValues(
          notificationPreferencesOptions,
          employeDetails.notificationPreferences
        )
      : [],
    job_alerts_frequency: employeDetails?.job_alerts_frequency
      ? getMultiSelectValues(
          jobAlertsFrequencyOptions,
          employeDetails.job_alerts_frequency
        )
      : [],
    profileImage: null as File | null,
    interested_in_salary_benchmarks:
      employeDetails?.interested_in_salary_benchmarks,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFormData({
  //       ...formData,
  //       profileImage: e.target.files[0], // Store the uploaded file
  //     });
  //   }
  // };

  // const handleFetch = async (): Promise<void> => {
  //   try {
  //     const response = await axios.get<Data>(getcandidatesProfile, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //       },
  //     });
  //     setData(response.data);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.error("Error fetching data:", error.message);
  //     } else {
  //       console.error("Unexpected error:", error);
  //     }
  //   }
  // };

  useEffect(() => {
    // handleFetch();
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     setFormData({
  //       fullName: data.full_name,
  //       email: data.email,
  //       notifications: data.notification_preference,
  //       phone: data.phone,
  //       qualifications: data.qualifications || "",
  //       experience: data.experience || "",
  //       location: data.location || "",
  //       salaryExpectation: data.salaryExpectation || "", // Initialize confidential field
  //       profileImage: null, // Reset profile image field
  //     });
  //   }
  // }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: any = new FormData();

    // Append each field to FormData, using fallback for potential null values
    formData.append("fullName", formData.fullName || ""); // Ensures no null
    formData.append("email", formData.email || ""); // Ensures no null
    formData.append("phone", formData.phone || ""); // Ensures no null
    formData.append("qualifications", formData.qualifications || ""); // Ensures no null
    formData.append("experience", formData.experience || ""); // Ensures no null
    formData.append("location", formData.location || ""); // Ensures no null
    formData.append("salaryExpectation", formData.salaryExpectation || ""); // Ensures no null

    // If you're adding an image
    if (formData.profileImage) {
      formData.append("profileImage", formData.profileImage);
    }

    try {
      const response = await axios.patch(companyDetails, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data", // Ensure correct header for FormData
        },
      });
      setData(response.data);
      console.log("Data updated:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error updating data:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="relative">
        <h3 className="text-4xl font-bold my-4 text-center">
          Candidate Profile
        </h3>
        <FaUserEdit
          onClick={() => setEdit(!edit)}
          className="absolute top-0 right-0 cursor-pointer"
        />
      </div>

      {/* Display the current profile image */}
      {data?.profileImage && (
        <div className="mb-4 flex justify-center">
          <img
            src={data.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <CandidateProfile
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
          edit={edit}
        />
        <ProfileSetup
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
          edit={edit}
        />
        <SalaryExpection
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
          edit={edit}
        />
        <PrivacyControl
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
          edit={edit}
        />
        <JobSearch
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
          edit={edit}
        />

        <SalaryInsight
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
          edit={edit}
        />
        <AdditionalDetails
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
          edit={edit}
        />
        <EmployerInvitation
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
          edit={edit}
        />
        <NotificationPreference
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
          edit={edit}
        />

        {!edit && (
          <button
            type="submit"
            className="bg-[#019529] text-white px-4 py-2 rounded-md hover:bg-[#017a22] w-full"
          >
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
};

export default DashboardSettings;
