// import { ChangeEvent, FormEvent, useState } from "react";
// import InputField from "../../../../components/InputField/InputField";
// import {
//   companyRegistrationSchema,
//   validateForm,
// } from "../../../../Schema/Schemas";
// import Button from "../../../../components/Button/Button";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { companyRegister } from "../../../../API/apis";
// import { Link, useNavigate } from "react-router-dom";

// const CompanySignUp = () => {
//   const [formData, setFormData] = useState({
//     company_name: "",
//     company_email: "",
//     // contact_person: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState<any>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     const errors = await validateForm(companyRegistrationSchema, formData);
//     if (errors) {
//       setErrors(errors);
//       return;
//     }
//     setErrors({});
//     setIsSubmitting(true);
//     try {
//       const response = await axios.post(companyRegister, {
//         company_name: formData.company_name,
//         company_email: formData.company_email,
//         password: formData.password,
//       });

//       console.log("response",response)
//       // Handle successful response
//       if (response.status === 200) {
//         toast.success("Registration completed!");
//         navigate("/login-company"); // Redirect to login page
//         setFormData({
//           company_name: "",
//           company_email: "",
//           password: "",
//         });
//       } else {
//         toast.error("Something went wrong. Please try again.");
//       }
//     } catch (error:any) {
//       console.log("error",error);
//       setFormData({
//         company_email:"",
//         company_name:"",
//         password: "",
//       });
//       toast.error(error?.response?.data?.detail);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="w-[40rem] space-y-6 border-2 border-gray-400 p-5 rounded-lg">
//         <h1 className="text-4xl font-bold text-center">Register as Employer</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <InputField
//             label="Company Name"
//             name="company_name"
//             value={formData.company_name}
//             onChange={handleChange}
//             error={errors.company_name}
//           />
//           <InputField
//             label="Company Email"
//             name="company_email"
//             value={formData.company_email}
//             onChange={handleChange}
//             error={errors.company_email}
//           />
//           {/* <InputField
//             label="Contact Person"
//             name="contact_person"
//             value={formData.contact_person}
//             onChange={handleChange}
//             error={errors.contact_person}
//           /> */}
//           <InputField
//             label="Password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             error={errors.password}
//             type="password"
//           />
//           <div>
//             Already have an account?{" "}
//             <Link to="/login-company" className="cursor-pointer underline">
//               Login
//             </Link>
//           </div>
//           <div className="w-full flex justify-center">
//             <Button
//               content={isSubmitting ? "Submitting..." : "Sign Up"}
//               className={`btn-primary text-[#ffffff] w-[200px]`}
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CompanySignUp;

import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "../../../../components/InputField/InputField";
import {
  companyRegistrationStep1Schema,
  companyRegistrationStep2Schema,
  companyRegistrationStep3Schema,
  validateForm,
} from "../../../../Schema/Schemas";
import Button from "../../../../components/Button/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { userRegister } from "../../../../API/apis";
import { useNavigate } from "react-router-dom";
// import { auth, googleauthProvider } from "../../../../../firebase";
// import { signInWithPopup } from "firebase/auth";
import Loader from "../../../../components/Loader/Loader";

const CompanySignUp: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    company_name: "",
    role: "",
    preferences: false,
    notifications: false,
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const GoggleHandler = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleauthProvider);
  //     console.log("google user", result);
  //     }catch(error:any){
  //       console.log(error.message);
  //     }
  //   }

  const handleNext = async () => {
    let validation: any;
    if (step === 1) {
      validation = companyRegistrationStep1Schema;
    } else if (step === 2) {
      validation = companyRegistrationStep2Schema;
    } else if (step === 3) {
      validation = companyRegistrationStep3Schema;
    } else {
      validation = companyRegistrationStep1Schema;
    }

    const currentErrors: any = await validateForm(validation, formData); // Validate the current step data
    if (currentErrors) {
      setErrors(currentErrors);
      console.log("asdjkhjka", currentErrors);
      return;
    }
    setErrors({});
    console.log("sdjhgfjh");
    console.log("jkdhfjk");
    setStep(step + 1); // Move to the next step
  };

  const handlePrevious = () => {
    setStep(step - 1); // Move to the previous step
  };

  const handleSubmit = async (e: FormEvent) => {
    console.log("abc");
    e.preventDefault();
    setLoading(true);
    setIsSubmitting(true);
    try {
      const data: any = {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        report_prefrence: formData.preferences,
        notification_prefrence: formData.notifications,
      };
      const response = await axios.post(userRegister, data);
      if (response.status === 200) {
        toast.success("Registration completed!");
        setLoading(false);
        navigate("/login-company");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(
        error?.response?.data?.detail || "Error occurred during registration."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Progress Bar Component
  const ProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-5">
      <div
        className={`bg-[#019529] h-2.5 rounded-full`}
        style={{ width: `${(step / 3) * 100}%` }}
      ></div>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      {loading && <Loader />}
      <div className="w-full max-w-lg h-fit space-y-6 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>

        {/* Progress Bar */}
        <ProgressBar />

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              {/* Step 1: Personal Information */}
              <h2 className="text-xl font-bold text-center">
                Personal Information
              </h2>
              <InputField
                label="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                error={errors.full_name}
              />
              <InputField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <InputField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                type="password"
              />
            </>
          )}

          {step === 2 && (
            <>
              {/* Step 2: Company Information */}
              <h2 className="text-xl font-bold text-center">
                Company Information
              </h2>
              <InputField
                label="Company Name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                error={errors.company_name}
              />
              <InputField
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                error={errors.role}
              />
            </>
          )}

          {step === 3 && (
            <>
              {/* Step 3: Preferences */}
              {/* <h2 className="text-xl font-bold text-center">Preferences</h2>
              <InputField
                label="Preferences"
                name="preferences"
                value={formData.preferences}
                onChange={handleChange}
                error={errors.preferences}
              /> */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="preferences"
                  checked={formData.preferences}
                  onChange={(e) =>
                    setFormData({ ...formData, preferences: e.target.checked })
                  }
                />
                <label className="text-gray-700">Preferences</label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notifications: e.target.checked,
                    })
                  }
                />
                <label className="text-gray-700">Receive Notifications</label>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button
                content="Previous"
                onClick={handlePrevious}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              />
            )}
            {step < 3 && (
              <Button
                content="Next"
                onClick={handleNext}
                className="bg-[#019529] text-white px-4 py-2 rounded-md"
              />
            )}{" "}
            {step == 3 && (
              <Button
                content={
                  isSubmitting ? "Creating Account..." : "Create Account"
                }
                type="submit"
                className="bg-[#019529] text-white px-4 py-2 rounded-md"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySignUp;
