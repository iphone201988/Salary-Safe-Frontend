// import axios from "axios";
import React, { useRef, useState } from "react";
// import { companyDetails } from "../../API/apis";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { SignUpFormData, SignUpFormErrors } from "../../types";
import CompanyProfile from "./DashboardSettings/CompanyProfile";
import HiringGoals from "./DashboardSettings/HiringGoals";
import OtherFields from "./DashboardSettings/OtherFields";
import Avatar from "../../assets/avatar.jpg";
import {
  // AutomatedUpdatesOptions,
  // CandidateFeedbackInsightsOptions,
  // CustomReportsOptions,
  jobtypesOptions,
  Key_Metrics,
  // MarketAndRoleAlertsOptions,
  options,
  pool,
  Positions_of_Interest,
  Preferred_Job_Locations,
  // Role_Specific,
  SalaryBenchmarkingOptions,
} from "../../pages/Employer/Auth/SignUp/options";
import { getMultiSelectValues } from "../../utils/helper";
import { FaUserEdit } from "react-icons/fa";
import { RiFileEditLine } from "react-icons/ri";
import useApiCall from "../../API/function";
import { /* candidateUpdate, */ clientUpdate } from "../../API/apis";
import { setemployeerDetails } from "../../Redux/reducer/userData";
import { useDispatch } from "react-redux";

const DashboardSettings: React.FC = () => {
  const { employeerDetails } = useSelector((state: RootState) => state.user);
  const [edit, setEdit] = useState<boolean>(true);
  const avatarRef = useRef<any>(null);
  const [formData, setFormData] = useState<SignUpFormData>({
    companyName: employeerDetails?.company_name
      ? employeerDetails.company_name
      : "",
    companyLocation: employeerDetails?.headquarters_location
      ? employeerDetails.headquarters_location
      : "",
    companySize: employeerDetails?.company_size
      ? employeerDetails.company_size
      : "",
    email: employeerDetails?.email ? employeerDetails.email : "",
    phone: employeerDetails?.contact_phone_number
      ? employeerDetails.contact_phone_number
      : "",
    password: "",
    industry: employeerDetails?.industry ? employeerDetails.industry : "",
    PrimaryContact: employeerDetails?.primary_contact_person
      ? employeerDetails.primary_contact_person
      : "",
    primaryHiringGoals: employeerDetails?.primary_hiring_goals
      ? getMultiSelectValues(options, employeerDetails.primary_hiring_goals)
      : [],
    preferredJobLocations: employeerDetails?.preferred_job_locations
      ? getMultiSelectValues(
          Preferred_Job_Locations,
          employeerDetails.preferred_job_locations
        )
      : [],
    rolesPositions: employeerDetails?.roles_of_interest
      ? getMultiSelectValues(
          Positions_of_Interest,
          employeerDetails.roles_of_interest
        )
      : [],
    jobTypes: employeerDetails?.job_types
      ? getMultiSelectValues(jobtypesOptions, employeerDetails.job_types)
      : [],
    keyMetrics: employeerDetails?.dashboard_metrics
      ? getMultiSelectValues(Key_Metrics, employeerDetails.dashboard_metrics)
      : "",
    roleCustomization: employeerDetails?.role_specific_customization
      ? true
      : false,
    salaryBenchmarking: employeerDetails?.salary_benchmarking_preference
      ? getMultiSelectValues(
          SalaryBenchmarkingOptions,
          employeerDetails.salary_benchmarking_preference
        )
      : "",
    candidateViewingPreferences: employeerDetails?.candidate_viewing_preferences
      ? getMultiSelectValues(
          pool,
          employeerDetails.candidate_viewing_preferences
        )
      : "",
    offerOptimization: "",
    marketRoleAlerts: employeerDetails?.enable_real_time_market_alerts
      ? true
      : false,
    customReports: employeerDetails?.enable_custom_reporting ? true : false,
    automatedUpdates:
      employeerDetails?.automated_updates &&
      employeerDetails?.automated_updates != "undefined"
        ? true
        : false,
    candidateFeedback:
      employeerDetails?.candidate_feedback_analysis &&
      employeerDetails?.candidate_feedback_analysis != "undefined"
        ? true
        : false,
    referralHow: "",
    referralCode: "",
    avatar: employeerDetails?.avatar ? employeerDetails?.avatar : null,
  });

  const dispatch = useDispatch();

  const { apiCall } = useApiCall();

  const [errors, _setErrors] = useState<SignUpFormErrors>({});
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("formData::::", formData);
    try {
      const formDataInstance = new FormData();
      // Add each field individually
      formDataInstance.append("company_name", formData.companyName);
      formDataInstance.append(
        "headquarters_location",
        formData.companyLocation
      );
      formDataInstance.append("company_size", formData.companySize);
      formDataInstance.append("email", formData.email);
      formDataInstance.append("contact_phone_number", formData.phone);
      formDataInstance.append("industry", formData.industry);
      formDataInstance.append(
        "primary_contact_person",
        formData.PrimaryContact
      );
      formDataInstance.append(
        "primary_hiring_goals",
        JSON.stringify(
          formData.primaryHiringGoals.map((goals: any) => goals.value)
        )
      );
      formDataInstance.append(
        "preferred_job_locations",
        JSON.stringify(
          formData.preferredJobLocations.map(
            (locations: any) => locations.value
          )
        )
      );
      formDataInstance.append(
        "roles_of_interest",
        JSON.stringify(
          formData.rolesPositions.map((positions: any) => positions.value)
        )
      );
      formDataInstance.append(
        "job_types",
        JSON.stringify(formData.jobTypes.map((jobType: any) => jobType.value))
      );

      // Handle other fields
      formDataInstance.append("dashboard_metrics", formData.keyMetrics.value);
      formDataInstance.append(
        "role_specific_customization",
        formData.roleCustomization
      );
      formDataInstance.append(
        "salary_benchmarking_preference",
        formData.salaryBenchmarking.value
      );
      formDataInstance.append(
        "candidate_viewing_preferences",
        formData.candidateViewingPreferences.value
      );
      formDataInstance.append("offer_optimization", formData.offerOptimization);
      formDataInstance.append(
        "enable_real_time_market_alerts",
        formData.marketRoleAlerts
      );
      formDataInstance.append(
        "enable_custom_reporting",
        formData.customReports
      );
      formDataInstance.append("automated_updates", formData.automatedUpdates);
      formDataInstance.append(
        "candidate_feedback_analysis",
        formData.candidateFeedback
      );
      formDataInstance.append("referral_source", formData.referralHow);
      formDataInstance.append("referral_code", formData.referralCode);

      // Handle file uploads
      if (profileImage) formDataInstance.append("avatar", formData.avatar);

      const response = await apiCall(
        "patch",
        `${clientUpdate}`,
        formDataInstance
      );

      if (response) {
        dispatch(setemployeerDetails(response));
      }

      console.log("response:::::", response);
      window.location.reload();
    } catch (error) {}
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
                ? import.meta.env.VITE_BACKEND_URL + "/" + formData.avatar
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
          Employeer Profile
        </h3>
        <FaUserEdit
          onClick={() => setEdit(!edit)}
          className="absolute top-0 right-0 cursor-pointer"
        />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <CompanyProfile
          formData={formData}
          errors={errors}
          setFormData={setFormData}
          handleChange={handleChange}
          edit={edit}
        />

        <HiringGoals
          formData={formData}
          errors={errors}
          setFormData={setFormData}
          edit={edit}
        />

        <OtherFields
          formData={formData}
          errors={errors}
          setFormData={setFormData}
          edit={edit}
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="notifications"
            // checked={formData.notifications}
            onChange={handleChange}
            disabled={edit}
          />
          <label className="text-gray-600">Receive Notifications</label>
        </div>
        {!edit && (
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="bg-[#019529] text-white text-center px-4 py-2 rounded-md hover:bg-[#017a22] w-full"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default DashboardSettings;
