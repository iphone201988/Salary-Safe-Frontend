// import React, { useState, ChangeEvent, FormEvent } from "react";
// import InputField from "../../../../components/InputField/InputField";
// import {
//   employeeRegistrationSchema,
//   validateForm,
// } from "../../../../Schema/Schemas";
// import Button from "../../../../components/Button/Button";
// import { toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { candidateRegister } from "../../../../API/apis";
// type FormData = {
//   email: string;
//   password: string;
//   qualifications: string;
//   salary_expectation: number;
// };

// interface Errors {
//   email?: string;
//   password?: string;
//   qualifications?: string;
//   salary_expectation?: string;
// }

// const EmployeeSignUp: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     email: "",
//     password: "",
//     qualifications: "",
//     salary_expectation: 0,
//   });

//   const [errors, setErrors] = useState<Errors>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;

//     // Convert salary_expectation back to a number when handling change
//     if (name === "salary_expectation") {
//       setFormData({ ...formData, [name]: Number(value) });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     const errors = await validateForm(employeeRegistrationSchema, formData);
//     if (errors) {
//       setErrors(errors);
//       return;
//     }
//     setErrors({});
//     setIsSubmitting(true);
//     try {
//       const response = await axios.post(candidateRegister, {username:formData.email,
//         password: formData.password,
//         qualifications: formData.qualifications,
//         salary_expectation: formData.salary_expectation});
//       console.log("response",response)
//       if (response.status === 200) {
//         toast.success("Registration completed!");
//         setFormData({
//           email: "",
//           password: "",
//           qualifications: "",
//           salary_expectation: 0,
//         });
//         navigate("/login-employee"); // Redirect to login page
//       } else {
//         toast.error("Registration failed. Please try again.");
//       }
//     } catch (error:any) {
//       console.log("error",error);
//       setFormData({
//         ...formData,
//         password: "",
//       });
//       toast.error(error?.response?.data?.detail);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen ">
//       <div className="w-[40rem] space-y-6 border-2 border-gray-400 p-5 rounded-lg">
//         <h2 className="text-4xl font-bold text-center">
//           Register as an Employee
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4 w-full">
//           <InputField
//             label="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             error={errors.email}
//           />
//           <InputField
//             label="Password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             error={errors.password}
//             type="password"
//           />
//           <InputField
//             label="Qualifications"
//             name="qualifications"
//             value={formData.qualifications}
//             onChange={handleChange}
//             error={errors.qualifications}
//           />
//           <InputField
//             label="Salary Expectations"
//             name="salary_expectation"
//             value={formData.salary_expectation.toString()}
//             onChange={handleChange}
//             error={errors.salary_expectation}
//             type="number"
//           />
//           <div>
//             Already have an account?{" "}
//             <Link to="/login-employee" className="cursor-pointer underline">
//               Login
//             </Link>
//           </div>
//           <div className="w-full flex justify-center">
//             <Button
//               content={isSubmitting ? "Submitting..." : "Send Request"}
//               className={`btn-primary text-[#ffffff] w-[200px]`}
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EmployeeSignUp;

import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

interface SignUpFormData {
  email?: string;
  phone?: string;
  password: string;
}

const CandidateSignUp: React.FC = () => {
  const [signUpMethod, setSignUpMethod] = useState<'email' | 'phone' | 'social' | null>(null);
  const [formData, setFormData] = useState<SignUpFormData>({ password: '' });
  const navigate = useNavigate();

  const handleMethodSelect = (method: 'email' | 'phone' | 'social') => {
    setSignUpMethod(method);
    setFormData({ password: '' });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', formData);
      if (response.status === 200) {
        toast.success("Registration successful!");
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    // handle Google login success
    toast.success("Logged in with Google successfully!");
    navigate('/dashboard');
  };

  const handleGoogleFailure = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {/* Registration Options */}
        {/* <div className="flex justify-around mb-6">
          <button onClick={() => handleMethodSelect('email')} className={`py-2 px-4 ${signUpMethod === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Email</button>
          <button onClick={() => handleMethodSelect('phone')} className={`py-2 px-4 ${signUpMethod === 'phone' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Phone</button>
          <button onClick={() => handleMethodSelect('social')} className={`py-2 px-4 ${signUpMethod === 'social' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>Social Media</button>
        </div> */}

          <form onSubmit={handleSubmit} className="space-y-4">
    
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
            <div>
                <div>
                {/* country code */}
                
                </div>
              <div>
                <label className="block text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
          

            {signUpMethod === 'social' && (
              <div className="flex justify-center">
                {/* Google Login */}
                {/* <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                  <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
                </GoogleOAuthProvider> */}
                {/* LinkedIn Login (mock example) */}
                <button onClick={() => toast.success("Logged in with LinkedIn successfully!")} className="bg-blue-700 text-white px-4 py-2 rounded-md ml-4">LinkedIn</button>
              </div>
            )}

            {/* Submit Button */}
            {(signUpMethod === 'email' || signUpMethod === 'phone') && (
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Sign Up
              </button>
            )}
          </form>
       
      </div>
    </div>
  );
};

export default CandidateSignUp;
