import React, { useState, ChangeEvent, FormEvent } from "react";
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import InputField from "../../../../components/InputField/InputField";
import {
  employeeRegistrationSchema,
  validateForm,
} from "../../../../Schema/Schemas";

interface SignUpFormData {
  companyName: string;
  companyLocation: string;
  companySize: string;
  email: string;
  phone: string;
  password: string;
}

interface SignUpFormErrors {
  companyName?: string;
  companyLocation?: string;
  companySize?: string;
  email?: string;
  phone?: string;
  password?: string;
}

const CandidateSignUp: React.FC = () => {
  const [signUpMethod, setSignUpMethod] = useState<
    "email" | "phone" | "social" | null
  >(null);

  const [formData, setFormData] = useState<SignUpFormData>({
    companyName: "",
    companyLocation: "",
    companySize: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState<SignUpFormErrors>({});
  const navigate = useNavigate();

  const handleMethodSelect = (method: "email" | "phone" | "social") => {
    setSignUpMethod(method);
    // setFormData({ password: "" });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const currentErrors: any = await validateForm(
      employeeRegistrationSchema,
      formData
    );

    if (currentErrors) {
      setErrors(currentErrors);
      return;
    }

    try {
      const response = await axios.post("/api/register", formData);
      if (response.status === 200) {
        toast.success("Registration successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    // handle Google login success
    toast.success("Logged in with Google successfully!");
    navigate("/dashboard");
  };

  const handleGoogleFailure = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            error={errors.companyName}
          />
          <InputField
            label="Company Location"
            name="companyLocation"
            value={formData.companyLocation}
            onChange={handleChange}
            error={errors.companyLocation}
          />

          <label className="block text-gray-700">Company Size</label>
          <select
            name="companySize"
            id="companySize"
            className={`border border-black rounded-md w-full p-2 ${
              errors?.companySize && "border-red-600"
            }`}
            onChange={(e: any) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            value={formData.companySize}
          >
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

          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <div
            className="flex items-center justify-around w-[80%] mx-auto my-2"
            id="separator"
          >
            <span className="h-[1px] bg-[#3D3D3D] w-[100px]" id="line1"></span>
            <span className="text-[#3D3D3D]">OR</span>
            <span className="h-[1px] bg-[#3D3D3D] w-[100px]" id="line2"></span>
          </div>
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
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login-employee" className="text-[#019529] underline">
              Login
            </Link>
          </div>

          {signUpMethod === "social" && (
            <div className="flex justify-center">
              {/* Google Login */}
              {/* <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                  <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
                </GoogleOAuthProvider> */}
              {/* LinkedIn Login (mock example) */}
              <button
                onClick={() =>
                  toast.success("Logged in with LinkedIn successfully!")
                }
                className="bg-blue-700 text-white px-4 py-2 rounded-md ml-4"
              >
                LinkedIn
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#019529] text-white px-4 py-2 rounded-md"
          >
            Sign Up
          </button>

          {/* Submit Button */}
          {(signUpMethod === "email" || signUpMethod === "phone") && (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Sign Up
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CandidateSignUp;
