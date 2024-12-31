import axios from "axios";
import React, { useRef, useState } from "react";
// import { companyDetails } from "../../API/apis";
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
import { useDispatch } from "react-redux";
import { setemployeDetails } from "../../Redux/reducer/userData";
import { toast } from "react-toastify";
import { RiFileEditLine } from "react-icons/ri";
import Avatar from "../../assets/avatar.jpg";

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
  const dispatch = useDispatch();
  const [data, _setData] = useState<Data | null>(null);
  const [errors, _setErrors] = useState<any>({});
  const [edit, setEdit] = useState<boolean>(true);
  const [profileImage, setProfileImage] = useState(null);

  const avatarRef = useRef<any>(null);

  const { token } = useSelector((state: RootState) => state.auth);
  const { employeDetails } = useSelector((state: RootState) => state.user);

  console.log("data:::::::", employeDetails?.job_alerts_frequency);
  const [formData, setFormData] = useState<any>({
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
    notificationPreferences: employeDetails?.notification_preferences
      ? getMultiSelectValues(
          notificationPreferencesOptions,
          employeDetails.notification_preferences
        )
      : [],
    job_alerts_frequency: employeDetails?.job_alerts_frequency
      ? getMultiSelectValues(
          jobAlertsFrequencyOptions,
          employeDetails?.job_alerts_frequency
        )
      : [],
    profileImage: null as File | null,
    interested_in_salary_benchmarks:
      employeDetails?.interested_in_salary_benchmarks,
    avatar: employeDetails?.avatar,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const isValidBinaryFile = (file: any): void | any => {
    const validBinaryMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    return file && validBinaryMimeTypes.includes(file?.type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const multipartFormData: any = new FormData();
    if (formData.full_name) {
      multipartFormData.append("full_name", formData.full_name);
    }
    if (formData.email) {
      multipartFormData.append("email", formData.email);
    }
    if (formData.phone_number) {
      multipartFormData.append("phone_number", formData.phone_number);
    }
    if (employeDetails?.location) {
      multipartFormData.append("location", employeDetails.location);
    }
    if (formData.current_job_title) {
      multipartFormData.append("current_job_title", formData.current_job_title);
    }
    if (formData.linkedin_profile_url) {
      multipartFormData.append(
        "current_company",
        formData.linkedin_profile_url
      );
    }
    if (formData.job_titles_of_interest) {
      multipartFormData.append(
        "job_titles_of_interest",
        formData.job_titles_of_interest
      );
    }
    if (formData.total_years_of_experience?.value) {
      multipartFormData.append(
        "total_years_of_experience",
        formData.total_years_of_experience.value
      );
    }
    if (formData.education_level?.value) {
      multipartFormData.append(
        "education_level",
        formData.education_level.value
      );
    }
    if (employeDetails?.key_skills) {
      multipartFormData.append(
        "key_skills",
        JSON.stringify(employeDetails.key_skills)
      );
    }
    if (formData.general_salary_range) {
      multipartFormData.append(
        "general_salary_range",
        formData.general_salary_range
      );
    }
    if (formData.preferred_salary_type?.value) {
      multipartFormData.append(
        "preferred_salary_type",
        formData.preferred_salary_type.value
      );
    }
    if (formData.open_to_performance_based_compensation) {
      multipartFormData.append(
        "open_to_performance_based_compensation",
        formData.open_to_performance_based_compensation
      );
    }
    if (formData.willing_to_negociate) {
      multipartFormData.append(
        "willing_to_negotiate",
        formData.willing_to_negociate
      );
    }
    if (formData.minimum_acceptable_salary) {
      multipartFormData.append(
        "minimum_acceptable_salary",
        formData.minimum_acceptable_salary
      );
    }
    if (formData.preferred_benefits) {
      multipartFormData.append(
        "preferred_benefits",
        JSON.stringify(
          formData.preferred_benefits.map((data: any) => data.value)
        )
      );
    }
    if (formData.view_salary_expectations?.value) {
      multipartFormData.append(
        "view_salary_expectations",
        formData.view_salary_expectations.value
      );
    }
    if (formData.hide_profile_from_current_employer) {
      multipartFormData.append(
        "hide_profile_from_current_employer",
        formData.hide_profile_from_current_employer
      );
    }
    if (employeDetails?.industries_of_interest) {
      multipartFormData.append(
        "industries_of_interest",
        JSON.stringify(employeDetails.industries_of_interest)
      );
    }
    if (formData.job_alerts_frequency.length > 0) {
      multipartFormData.append(
        "job_alerts_frequency",
        JSON.stringify(
          formData.job_alerts_frequency.map((data: any) => data.value)
        )
      );
    }
    if (formData.job_type_preferences) {
      multipartFormData.append(
        "job_type_preferences",
        JSON.stringify(
          formData.job_type_preferences.map((data: any) => data.value)
        )
      );
    }
    if (formData.actively_looking_for_new_job) {
      multipartFormData.append(
        "actively_looking_for_new_job",
        formData.actively_looking_for_new_job
      );
    }
    if (formData.career_goals) {
      multipartFormData.append("career_goals", formData.career_goals);
    }
    if (formData.professional_development_areas) {
      multipartFormData.append(
        "professional_development_areas",
        JSON.stringify(
          formData.professional_development_areas.map((data: any) => data.value)
        )
      );
    }
    if (formData.role_specific_salary_adjustments) {
      multipartFormData.append(
        "role_specific_salary_adjustments",
        formData.role_specific_salary_adjustments
      );
    }
    if (formData.invite_employer.length > 0) {
      multipartFormData.append(
        "invite_employer",
        JSON.stringify(formData.invite_employer)
      );
    }
    if (formData.notificationPreferences.length > 0) {
      multipartFormData.append(
        "notification_preferences",
        JSON.stringify(
          formData.notificationPreferences.map((data: any) => data.value)
        )
      );
    }
    if (formData.interested_in_salary_benchmarks) {
      multipartFormData.append(
        "interested_in_salary_benchmarks",
        formData.interested_in_salary_benchmarks
      );
    }
    if (formData.resume_upload) {
      const resumeFile = formData.resume_upload;
      if (isValidBinaryFile(resumeFile)) {
        multipartFormData.append("resume_upload", resumeFile);
      }
    }

    if (formData.cover_letter_upload) {
      const coverLetterFile = formData.cover_letter_upload;
      if (isValidBinaryFile(coverLetterFile)) {
        multipartFormData.append("cover_letter_upload", coverLetterFile);
      }
    }

    if (profileImage) multipartFormData.append("avatar", formData.avatar);

    if (formData.avatar) {
      const Avatar = formData.avatar;
      if (isValidBinaryFile(Avatar)) {
        multipartFormData.append(" avatar", formData.avatar);
      }
    }
    try {
      const response = await axios.patch(
        "https://salarysafe.ai/api/v1/candidates/me",
        multipartFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "application/json",
            // Ensure correct header for FormData
            "Content-Type": "multipart/form-data", // Ensure correct header for FormData
          },
        }
      );
      if (response) {
        dispatch(setemployeDetails(response.data));
        // window.location.reload();
        setEdit(!edit);
        toast.success("Profile updated successfully!");
        window.location.reload();
      }
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
        <div className="relative flex justify-center">
          {!edit && <RiFileEditLine className="absolute bottom-0 ml-[45px]" />}
          <img
            src={
              profileImage
                ? profileImage
                : formData.avatar
                ? import.meta.env.VITE_STATIC_FILES_URL + formData.avatar
                : Avatar
            }
            alt="user-profile"
            className="w-20 h-20 border-2 border-black rounded-full object-cover"
            onClick={() => {
              if (!edit && avatarRef.current) avatarRef.current.click();
            }}
            onError={(e) => {
              e.currentTarget.src = Avatar;
            }}
          />
        </div>

        <input
          type="file"
          ref={avatarRef}
          name="avatar"
          id="avatar"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              const url: any = URL.createObjectURL(file);
              setProfileImage(url);
              setFormData({ ...formData, avatar: file });
            }
          }}
          accept="image/png, image/jpeg"
        />
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
