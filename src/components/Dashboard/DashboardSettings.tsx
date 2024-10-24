import axios from "axios";
import React, { useEffect, useState } from "react";
import { companyDetails } from "../../API/apis";

interface Data {
  email: string;
  company_name: string;
  full_name: string;
  notification_prefrence: boolean;
}

const DashboardSettings: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    notifications: false,
    company_name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFetch = async (): Promise<void> => {
    try {
      const response = await axios.get<Data>(companyDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching data:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    if (data) {
      setFormData({
        fullName: data.full_name,
        email: data.email,
        notifications: data.notification_prefrence,
        company_name: data.company_name,
      });
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch<Data>(companyDetails, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
    <div className="bg-white p-6 rounded-lg shadow-md mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <h3 className="text-4xl font-bold my-4 text-center">Company Profile</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600">Company Name</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-600">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="notifications"
            checked={formData.notifications}
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
