import axios from "axios";
import React, { useState } from "react";
import { companyDetails } from "../../API/apis";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { SignUpFormData, SignUpFormErrors } from "../../types";
import CompanyProfile from "./DashboardSettings/CompanyProfile";
import HiringGoals from "./DashboardSettings/HiringGoals";
import OtherFields from "./DashboardSettings/OtherFields";

interface Data {
  email: string;
  phone: string;
  company_name: string;
  notification_prefrence: boolean;
  size: string;
  industry: string;
  location: string;
}

const DashboardSettings: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  // const dispatch = useDispatch(); // Get the dispatch function
  const user: any = useSelector((state: RootState) => state.user); // Access user data from Redux store

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

  const [errors, setErrors] = useState<SignUpFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFetch = async (): Promise<void> => {
    const token = useSelector((state: RootState) => state.auth.token);
    try {
      const response = await axios.get<Data>(companyDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response::::::", response.data);
      setData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching data:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const { employeerDetails } = useSelector((state: RootState) => state.user);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch<Data>(companyDetails, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setData(response.data);
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
      <h3 className="text-4xl font-bold my-4 text-center">Company Profile</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
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
