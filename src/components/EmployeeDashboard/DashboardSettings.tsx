import axios from "axios";
import React, { useEffect, useState } from "react";
import { companyDetails } from "../../API/apis";

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
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    notifications: false,
    phone: "",
    qualifications: "",
    experience: "",
    location: "",
    salaryExpectation: "", // New confidential field
    profileImage: null as File | null, // New field for profile image
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        profileImage: e.target.files[0], // Store the uploaded file
      });
    }
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
        notifications: data.notification_preference,
        phone: data.phone,
        qualifications: data.qualifications || "",
        experience: data.experience || "",
        location: data.location || "",
        salaryExpectation: data.salaryExpectation || "", // Initialize confidential field
        profileImage: null, // Reset profile image field
      });
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData:any = new FormData();
    
    // Append each field to FormData, using fallback for potential null values
    formData.append('fullName', formData.fullName || "");  // Ensures no null
    formData.append('email', formData.email || "");        // Ensures no null
    formData.append('phone', formData.phone || "");        // Ensures no null
    formData.append('qualifications', formData.qualifications || ""); // Ensures no null
    formData.append('experience', formData.experience || ""); // Ensures no null
    formData.append('location', formData.location || "");      // Ensures no null
    formData.append('salaryExpectation', formData.salaryExpectation || ""); // Ensures no null
  
    // If you're adding an image
    if (formData.profileImage) {
      formData.append('profileImage', formData.profileImage);
    }
  
    try {
      const response = await axios.patch(companyDetails, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'multipart/form-data', // Ensure correct header for FormData
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
      <h3 className="text-4xl font-bold my-4 text-center">Candidate Profile</h3>
      
      {/* Display the current profile image */}
      {data?.profileImage && (
        <div className="mb-4 flex justify-center">
          <img
            src={data.profileImage} // Ensure this is a valid URL or path
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600">Full Name</label>
          <input
            type="text"
            name="fullName"
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
            disabled
          />
        </div>
        <div>
          <label className="block text-gray-600">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-600">Qualifications</label>
          <input
            type="text"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-600">Experience</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-600">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-600">Salary Expectation (Confidential)</label>
          <input
            type="text"
            name="salaryExpectation"
            value={formData.salaryExpectation}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter expected salary"
          />
        </div>
        
        {/* Profile Image Upload */}
        <div>
          <label className="block text-gray-600">Upload Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
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
