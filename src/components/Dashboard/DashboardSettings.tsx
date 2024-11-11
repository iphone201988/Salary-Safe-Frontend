// import axios from "axios";
import React, { useState } from "react";
// import { companyDetails } from "../../API/apis";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { SignUpFormData, SignUpFormErrors } from "../../types";
import CompanyProfile from "./DashboardSettings/CompanyProfile";
import HiringGoals from "./DashboardSettings/HiringGoals";
import OtherFields from "./DashboardSettings/OtherFields";
import { AutomatedUpdatesOptions, CandidateFeedbackInsightsOptions, CustomReportsOptions, jobtypesOptions, Key_Metrics, MarketAndRoleAlertsOptions, options, pool, Positions_of_Interest, Preferred_Job_Locations, Role_Specific } from "../../pages/Employer/Auth/SignUp/options";
import { getMultiSelectValues } from "../../utils/helper";
// interface Data {
//   email: string;
//   phone: string;
//   company_name: string;
//   notification_prefrence: boolean;
//   size: string;
//   industry: string;
//   location: string;
// }

const DashboardSettings: React.FC = () => {
  // const [data, setData] = useState<Data | null>(null);
  // const dispatch = useDispatch(); // Get the dispatch function
  // const user: any = useSelector((state: RootState) => state.user); // Access user data from Redux store
  const { employeerDetails } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState<SignUpFormData>({
    companyName: employeerDetails?.company_name?employeerDetails.company_name:"",
    companyLocation: employeerDetails?.headquarters_location?employeerDetails.headquarters_location:"",
    companySize: employeerDetails?.company_size?employeerDetails.company_size:"",
    email: employeerDetails?.email?employeerDetails.email:"",
    phone: employeerDetails?.contact_phone_number?employeerDetails.contact_phone_number:"",
    password: "",
    industry: employeerDetails?.industry?employeerDetails.industry:"",
    PrimaryContact: employeerDetails?.primary_contact_person?employeerDetails.primary_contact_person:"",
    primaryHiringGoals: employeerDetails?.primary_hiring_goals?getMultiSelectValues(options,employeerDetails.primary_hiring_goals):[],
    preferredJobLocations: employeerDetails?.preferred_job_locations?getMultiSelectValues(Preferred_Job_Locations,employeerDetails.preferred_job_locations):[],
    rolesPositions: employeerDetails?.roles_of_interest?getMultiSelectValues(Positions_of_Interest,employeerDetails.roles_of_interest):[],
    jobTypes: employeerDetails?.job_types?getMultiSelectValues(jobtypesOptions,employeerDetails.job_types):[],
    keyMetrics:employeerDetails?.dashboard_metrics?getMultiSelectValues(Key_Metrics,employeerDetails.dashboard_metrics):"",
    roleCustomization: employeerDetails?.role_specific_customization
  ? employeerDetails.role_specific_customization === true
    ? Role_Specific[0]
    : Role_Specific[1]
  : "",
    salaryBenchmarking: "",
    candidateViewingPreferences: employeerDetails?.candidate_viewing_preferences?getMultiSelectValues(pool,employeerDetails.candidate_viewing_preferences):"",
    offerOptimization: "",
    marketRoleAlerts: employeerDetails?.enable_real_time_market_alerts
    ? employeerDetails.enable_real_time_market_alerts === true
      ? MarketAndRoleAlertsOptions[0]:""
    : "",
    customReports: employeerDetails?.enable_custom_reporting
    ? employeerDetails.enable_custom_reporting === true
      ? CustomReportsOptions[0]:""
    : "",
    automatedUpdates: employeerDetails?.automated_updates
    ? employeerDetails.automated_updates === true
      ? AutomatedUpdatesOptions[0]:""
    : "",
    candidateFeedback: employeerDetails?.candidate_feedback_analysis
    ? employeerDetails.candidate_feedback_analysis === true
      ? CandidateFeedbackInsightsOptions[0]:""
    : "",
    referralHow: "",
    referralCode: "",
  });

  

  const [errors, _setErrors] = useState<SignUpFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // const handleFetch = async (): Promise<void> => {
  //   const token = useSelector((state: RootState) => state.auth.token);
  //   try {
  //     const response = await axios.get<Data>(companyDetails, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     console.log("response::::::", response.data);
  //     setData(response.data);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.error("Error fetching data:", error.message);
  //     } else {
  //       console.error("Unexpected error:", error);
  //     }
  //   }
  // };

  console.log("employeerDetails", employeerDetails);

  // useEffect(() => {
  //   handleFetch();
  // }, []);

  // Update formData if data is fetched successfully
  // useEffect(() => {
  //   if (data) {
  //     setFormData({
  //       email: data.email,
  //       notifications: data.notification_prefrence,
  //       company_name: data.company_name,
  //       size: data.size,
  //       industry: data.industry,
  //       location: data.location,
  //       phone: data.phone, // Add phone field if needed
  //     });
  //   }
  // }, [data]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.patch<Data>(companyDetails, formData, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //       },
  //     });
  //     // setData(response.data);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.error("Error updating data:", error.message);
  //     } else {
  //       console.error("Unexpected error:", error);
  //     }
  //   }
  // };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-4xl font-bold my-4 text-center">Company Profile</h3>
      <form className="space-y-4">
        <CompanyProfile
          formData={formData}
          errors={errors}
          setFormData={setFormData}
          handleChange={handleChange}
        />

        <HiringGoals
          formData={formData}
          errors={errors}
          setFormData={setFormData}
        />

        <OtherFields
          formData={formData}
          errors={errors}
          setFormData={setFormData}
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="notifications"
            // checked={formData.notifications}
            onChange={handleChange}
          />
          <label className="text-gray-600">Receive Notifications</label>
        </div>
        <button
          type="submit"
          className="bg-[#019529] text-white px-4 py-2 rounded-md hover:bg-[#017a22] w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default DashboardSettings;
