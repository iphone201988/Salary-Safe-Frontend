import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { companyDetails } from "../../API/apis";
import InputField from "../InputField/InputField";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { industrys } from "../../utils/helper";
import { useSelector /* , useDispatch */ } from "react-redux";
// import { setUserData } from "../../Redux/reducer/userData"; // Import your action
import { RootState } from "../../Redux/store";

interface Data {
  email: string;
  phone: string;
  company_name: string;
  notification_prefrence: boolean;
  size: string;
  industry: string;
  location: string;
}

const libraries: any = ["places"];
const DashboardSettings: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  // const dispatch = useDispatch(); // Get the dispatch function
  const user: any = useSelector((state: RootState) => state.user); // Access user data from Redux store

  const [formData, setFormData] = useState({
    email: user.email || "", // Initialize with Redux state
    phone: user.phone || "", // Initialize with Redux state
    notifications: user.notifications || false, // Initialize with Redux state
    company_name: user.company_name || "", // Initialize with Redux state
    size: user.size || "", // Initialize with Redux state
    industry: user.industry || "", // Initialize with Redux state
    location: user.location || "", // Initialize with Redux state
  });
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBFBwlTTtqbm5uwk0tIWEOEwR9CXSeCJuA", // Replace with your API key
    libraries,
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

  // Update formData if data is fetched successfully
  useEffect(() => {
    if (data) {
      setFormData({
        email: data.email,
        notifications: data.notification_prefrence,
        company_name: data.company_name,
        size: data.size,
        industry: data.industry,
        location: data.location,
        phone: data.phone, // Add phone field if needed
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error updating data:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.formatted_address) {
      setFormData({ ...formData, location: place.formatted_address });
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
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <InputField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {isLoaded && (
          <div>
            <label className="block text-gray-700">Company Location</label>
            <Autocomplete
              onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              }
              onPlaceChanged={handlePlaceSelect}
            >
              <input
                name="companyLocation"
                value={formData.location}
                onChange={handleChange}
                placeholder="Search location"
                className={`border border-black rounded-md w-full p-2 `}
              />
            </Autocomplete>
          </div>
        )}
        {/* Company Size Select */}
        <label className="block text-gray-700">Company Size</label>
        <select
          name="size"
          className={`border border-black rounded-md w-full p-2 `}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          value={formData.size}
        >
          <option value="">Select Size</option>
          <option value="0-10">0-10</option>
          <option value="10-50">10-50</option>
          <option value="50-100">50-100</option>
          <option value="100 or above">100 or above</option>
        </select>
        {/* Industry Select */}
        <label className="block text-gray-700">Industry</label>
        <select
          name="industry"
          className={`border border-black rounded-md w-full p-2 `}
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
