import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import InputField from "../../../../components/InputField/InputField";
import {
  employeerRegistrationSchema,
  validateForm,
} from "../../../../Schema/Schemas";
import {  useLoadScript, Autocomplete } from "@react-google-maps/api";
import {  userRegister } from "../../../../API/apis";
import Loader from "../../../../components/Loader/Loader";
import { industrys } from "../../../../utils/helper";


interface SignUpFormData {
  companyName: string;
  companyLocation: string;
  companySize: string;
  email: string;
  phone: string;
  password: string;
  industry: string;
}

interface SignUpFormErrors {
  companyName?: string;
  companyLocation?: string;
  companySize?: string;
  email?: string;
  phone?: string;
  password?: string;
  industry?: string;
}

const libraries: any = ["places"];
const CompanySignUp: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBFBwlTTtqbm5uwk0tIWEOEwR9CXSeCJuA", // Replace with your API key
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
  });

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
      let data ={
        email: formData.email,
        // phone: formData.phone,
        password: formData.password,
        role: "client",
        company_name: formData.companyName,
        company_location: formData.companyLocation,
        company_size: formData.companySize,
        industry: formData.industry,
      }
      const response = await axios.post(userRegister, data);
      if (response.status === 200) {
        console.log("response",response)
        toast.success("Registration successful!");
        navigate("/login-company");
      } else {
        setLoading(false)
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error:any) {
      setLoading(false)
      toast.error("Registration failed. Please try again.",error);
    }
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.formatted_address) {
      setFormData({ ...formData, companyLocation: place.formatted_address });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {loading && <Loader/>}
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
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <div className="flex items-center justify-around w-[80%] mx-auto my-2">
            <span className="h-[1px] bg-[#3D3D3D] w-[100px]"></span>
            <span className="text-[#3D3D3D]">OR</span>
            <span className="h-[1px] bg-[#3D3D3D] w-[100px]"></span>
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
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          {isLoaded && (
            <div>
              <label className="block text-gray-700">Company Location</label>
              <Autocomplete
                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                onPlaceChanged={handlePlaceSelect}
              >
                <input
                  name="companyLocation"
                  value={formData.companyLocation}
                  onChange={handleChange}
                  placeholder="Search location"
                  className={`border border-black rounded-md w-full p-2 ${errors?.companyLocation && "border-red-600"}`}
                />
              </Autocomplete>
              {errors?.companyLocation && (
                <small className="text-red-600 font-bold text-sm">
                  {errors.companyLocation}
                </small>
              )}
            </div>
          )}
          {/* Company Size Select */}
          <label className="block text-gray-700">Company Size</label>
          <select
            name="companySize"
            className={`border border-black rounded-md w-full p-2 ${errors?.companySize && "border-red-600"}`}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
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
          {/* Industry Select */}
          <label className="block text-gray-700">Industry</label>
          <select
            name="industry"
            className={`border border-black rounded-md w-full p-2 ${errors?.industry && "border-red-600"}`}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
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


// import { ChangeEvent, FormEvent, useState } from "react";
// import InputField from "../../../../components/InputField/InputField";
// import {
//   companyRegistrationStep1Schema,
//   companyRegistrationStep2Schema,
//   companyRegistrationStep3Schema,
//   validateForm,
// } from "../../../../Schema/Schemas";
// import Button from "../../../../components/Button/Button";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { userRegister } from "../../../../API/apis";
// import { useNavigate } from "react-router-dom";
// // import { auth, googleauthProvider } from "../../../../../firebase";
// // import { signInWithPopup } from "firebase/auth";
// import Loader from "../../../../components/Loader/Loader";

// const CompanySignUp: React.FC = () => {
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     password: "",
//     company_name: "",
//     role: "",
//     preferences: false,
//     notifications: false,
//   });

//   const [errors, setErrors] = useState<any>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   // const GoggleHandler = async () => {
//   //   try {
//   //     const result = await signInWithPopup(auth, googleauthProvider);
//   //     console.log("google user", result);
//   //     }catch(error:any){
//   //       console.log(error.message);
//   //     }
//   //   }

//   const handleNext = async () => {
//     let validation: any;
//     if (step === 1) {
//       validation = companyRegistrationStep1Schema;
//     } else if (step === 2) {
//       validation = companyRegistrationStep2Schema;
//     } else if (step === 3) {
//       validation = companyRegistrationStep3Schema;
//     } else {
//       validation = companyRegistrationStep1Schema;
//     }

//     const currentErrors: any = await validateForm(validation, formData); // Validate the current step data
//     if (currentErrors) {
//       setErrors(currentErrors);
//       console.log("asdjkhjka", currentErrors);
//       return;
//     }
//     setErrors({});
//     console.log("sdjhgfjh");
//     console.log("jkdhfjk");
//     setStep(step + 1); // Move to the next step
//   };

//   const handlePrevious = () => {
//     setStep(step - 1); // Move to the previous step
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     console.log("abc");
//     e.preventDefault();
//     setLoading(true);
//     setIsSubmitting(true);
//     try {
//       const data: any = {
//         full_name: formData.full_name,
//         email: formData.email,
//         password: formData.password,
//         role: formData.role,
//         report_prefrence: formData.preferences,
//         notification_prefrence: formData.notifications,
//       };
//       const response = await axios.post(userRegister, data);
//       if (response.status === 200) {
//         toast.success("Registration completed!");
//         setLoading(false);
//         navigate("/login-company");
//       } else {
//         toast.error("Something went wrong. Please try again.");
//       }
//     } catch (error: any) {
//       setLoading(false);
//       toast.error(
//         error?.response?.data?.detail || "Error occurred during registration."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Progress Bar Component
//   const ProgressBar = () => (
//     <div className="w-full bg-gray-200 rounded-full h-2.5 mb-5">
//       <div
//         className={`bg-[#019529] h-2.5 rounded-full`}
//         style={{ width: `${(step / 3) * 100}%` }}
//       ></div>
//     </div>
//   );

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       {loading && <Loader />}
//       <div className="w-full max-w-lg h-fit space-y-6 p-8 bg-white shadow-md rounded-lg">
//         <h1 className="text-3xl font-bold text-center">Sign Up</h1>

//         {/* Progress Bar */}
//         <ProgressBar />

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {step === 1 && (
//             <>
//               {/* Step 1: Personal Information */}
//               <h2 className="text-xl font-bold text-center">
//                 Personal Information
//               </h2>
//               <InputField
//                 label="Full Name"
//                 name="full_name"
//                 value={formData.full_name}
//                 onChange={handleChange}
//                 error={errors.full_name}
//               />
//               <InputField
//                 label="Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 error={errors.email}
//               />
//               <InputField
//                 label="Password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 error={errors.password}
//                 type="password"
//               />
//             </>
//           )}

//           {step === 2 && (
//             <>
//               {/* Step 2: Company Information */}
//               <h2 className="text-xl font-bold text-center">
//                 Company Information
//               </h2>
//               <InputField
//                 label="Company Name"
//                 name="company_name"
//                 value={formData.company_name}
//                 onChange={handleChange}
//                 error={errors.company_name}
//               />
//               <InputField
//                 label="Role"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 error={errors.role}
//               />
//             </>
//           )}

//           {step === 3 && (
//             <>
//               {/* Step 3: Preferences */}
//               {/* <h2 className="text-xl font-bold text-center">Preferences</h2>
//               <InputField
//                 label="Preferences"
//                 name="preferences"
//                 value={formData.preferences}
//                 onChange={handleChange}
//                 error={errors.preferences}
//               /> */}
//               <div className="flex items-center space-x-3">
//                 <input
//                   type="checkbox"
//                   name="preferences"
//                   checked={formData.preferences}
//                   onChange={(e) =>
//                     setFormData({ ...formData, preferences: e.target.checked })
//                   }
//                 />
//                 <label className="text-gray-700">Preferences</label>
//               </div>

//               <div className="flex items-center space-x-3">
//                 <input
//                   type="checkbox"
//                   name="notifications"
//                   checked={formData.notifications}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       notifications: e.target.checked,
//                     })
//                   }
//                 />
//                 <label className="text-gray-700">Receive Notifications</label>
//               </div>
//             </>
//           )}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between mt-6">
//             {step > 1 && (
//               <Button
//                 content="Previous"
//                 onClick={handlePrevious}
//                 className="bg-gray-500 text-white px-4 py-2 rounded-md"
//               />
//             )}
//             {step < 3 && (
//               <Button
//                 content="Next"
//                 onClick={handleNext}
//                 className="bg-[#019529] text-white px-4 py-2 rounded-md"
//               />
//             )}{" "}
//             {step == 3 && (
//               <Button
//                 content={
//                   isSubmitting ? "Creating Account..." : "Create Account"
//                 }
//                 type="submit"
//                 className="bg-[#019529] text-white px-4 py-2 rounded-md"
//               />
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CompanySignUp;
