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
import { userRegister } from "../../../../API/apis";
import Loader from "../../../../components/Loader/Loader";
import { industrys } from "../../../../utils/helper";
import Select from "react-select";

interface SignUpFormData {
  companyName: string;
  companyLocation: string;
  companySize: string;
  email: string;
  phone: string;
  password: string;
  industry: string;
  PrimaryContact: string;
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const currentErrors: any = await validateForm(
      employeerRegistrationSchema,
      formData
    );
    if (currentErrors) {
      setErrors(currentErrors);
      setLoading(false);
      return;
    }
    setErrors({});
    try {
      let data = {
        email: formData.email,
        // phone: formData.phone,
        password: formData.password,
        role: "client",
        company_name: formData.companyName,
        company_location: formData.companyLocation,
        company_size: formData.companySize,
        industry: formData.industry,
      };
      const response = await axios.post(userRegister, data);
      if (response.status === 200) {
        console.log("response", response);
        toast.success("Registration successful!");
        navigate("/login-company");
      } else {
        setLoading(false);
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error("Registration failed. Please try again.", error);
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

  const preference = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

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

  const preference2 = [
    { value: "1", label: "Enable Competitive Salary Benchmarking" },
    { value: "2", label: "Receive Salary Adjustment Suggestions" },
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
            name="email"
            type="email"
            value={formData.PrimaryContact}
            onChange={handleChange}
            error={errors.PrimaryContact}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          {/* <div className="flex items-center justify-around w-[80%] mx-auto my-2">
            <span className="h-[1px] bg-[#3D3D3D] w-[100px]"></span>
            <span className="text-[#3D3D3D]">OR</span>
            <span className="h-[1px] bg-[#3D3D3D] w-[100px]"></span>
          </div> */}
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

          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Primary Hiring Goals</label>
            <Select options={options} isMulti />
          </div>

          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Preferred Job Locations</label>
            <Select options={options} isMulti />
          </div>

          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Roles/Positions of Interest</label>
            <Select options={options} isMulti />
          </div>

          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Job Types</label>
            <Select options={options} isMulti />
          </div>

          <div className="font-[600] text-lg">Dashboard Customization</div>

          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Select Key Metrics and Widgets</label>
            <Select options={options} />
          </div>

          <div className="font-[600] text-lg">Job Posting Preferences</div>

          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Role-Specific Customization</label>
            <Select options={preference} />
          </div>

          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Salary Benchmarking Preferences</label>
            <Select options={preference2} />
          </div>

          <div className="font-[600] text-lg">Candidate Pool Access</div>

          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Candidate Viewing Preferences</label>
            <Select options={pool} />
          </div>

          <div className="font-[600] text-lg">Offer and Negotiation Tools</div>

          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Offer Optimization</label>
            <Select options={offer} />
          </div>

          <div className="font-[600] text-lg">
            Reporting and Performance Tracking
          </div>

          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Market and Role Alerts</label>
            <Select options={[]} />
          </div>

          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Custom Reports</label>
            <Select options={[]} />
          </div>

          <div className="font-[600] text-lg">
            Communication and Candidate Engagement
          </div>

          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Automated Updates to Candidates</label>
            <Select options={[]} />
          </div>

          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">Candidate Feedback Insights</label>
            <Select options={[]} />
          </div>

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
                <div className="w-full flex flex-col space-y-1">
                  <label className="text-left">Role</label>
                  <Select
                    options={[]}
                    value={member.role}
                    onChange={(value) =>
                      handleInputChange(index, "role", value as any)
                    }
                  />
                </div>
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

          <div className="w-full flex flex-col space-y-1">
            <label className="text-left">How did you hear about us?</label>
            <Select options={[]} />
          </div>

          <InputField label="Referral Code" value={""} onChange={""} name="" />

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
