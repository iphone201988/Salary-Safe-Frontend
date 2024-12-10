import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "./Button/Button";
import Input from "./Input/Input";
import { validationSchema } from "../../validation";
import { candidateRegister } from "../../API/apis";
import axios from "axios";
import { toast } from "react-toastify";

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
    current_job_title: "",
    linkedin_profile_url: "",
    terms_accepted: false,
  });

  // console.log("FormData", formData);

  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prevTouched: any) => ({
      ...prevTouched,
      [name]: true,
    }));
    validateField(name, formData[name]);
  };

  const validateField = (name: string, value: string) => {
    try {
      validationSchema.validateSyncAt(name, { [name]: value });
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    } catch (error: any) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [name]: error.message,
      }));
    }
  };

  const validateForm = () => {
    const formErrors: any = {};
    Object.keys(formData).forEach((field) => {
      try {
        validationSchema.validateSyncAt(field, formData);
      } catch (error: any) {
        formErrors[field] = error.message;
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/profile/additional-detail");
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formDataToSend.append(key, item));
      } else {
        formDataToSend.append(key, value);
      }
    });
    if (validateForm()) {
      if (formData.terms_accepted) {
        try {
          const response = await axios.post(candidateRegister, formDataToSend, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.status === 200) {
            toast.success("Registration successful!");
            navigate("/login-employee");
            navigate("/profile/additional-detail");
          }
        } catch (err) {
          toast.error("Registration failed. Please try again.");
        }
      }
    }
  };

  return (
    <div className="w-[750px] px-4 py-8 rounded-[20px] flex flex-col lg:flex-row justify-center items-center bg-[#ffffff]">
      <div className="w-full lg:w-[300px] flex flex-col justify-center items-center h-full mb-6 lg:mb-0 lg:mr-4 p-4 rounded-lg">
        <img
          src={"/logo.png"}
          alt="Company Logo"
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-semibold text-black mb-2">Salary Safe</h2>
        <p className="text-black text-[9px] mb-4 text-center sm:text-xs md:text-sm lg:text-[13px]">
          Salary-Safe is an innovative platform designed to bring transparency
          and fairness to salary negotiations by aligning the expectations of
          candidates, employers, and the market.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-4 py-2 rounded-full text-sm sm:text-base"
        >
          Learn More
        </button>
      </div>

      <div className="hidden lg:block h-[400px] rounded-full border-l-2 border-gray-400"></div>

      <div className="w-full lg:w-[350px] flex flex-col justify-center items-center ml-4">
        <h4 className="mb-2 mt-0 text-xl font-medium leading-tight text-black text-center lg:text-left">
          Candidate Register Profile
        </h4>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-center items-center"
        >
          <Input
            label="Full Name"
            placeholder="enter full name here"
            value={formData.full_name}
            name="full_name"
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.full_name}
          />

          <Input
            label="Email"
            placeholder="enter email here"
            value={formData.email}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.email}
          />

          <Input
            label="Phone"
            placeholder="+91 12356789"
            value={formData.phone_number}
            name="phone_number"
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.phone_number}
          />

          <Input
            label="Password"
            placeholder="******"
            type="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.password}
          />

          <Input
            label="Current Job title"
            placeholder="Mern Developer"
            value={formData.current_job_title}
            name="current_job_title"
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.current_job_title}
          />

          <Input
            label="LinkedIn Profile URL"
            placeholder="http://linkdin.in/techwinlabs/"
            value={formData.linkedin_profile_url}
            name="linkedin_profile_url"
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.linkedin_profile_url}
          />

          <h2 className="text-[#000000] mt-2 text-sm font-bold">
            Agreement and Submission
          </h2>
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              id="terms_accepted"
              name="terms_accepted"
              checked={formData.terms_accepted}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="terms_accepted">
              I agree to the{" "}
              <Link to="/terms" className="text-blue-500 text-[8px] underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-blue-500 text-[8px] underline"
              >
                Privacy Policy
              </Link>
              .
            </label>
            {errors.termsAccepted && (
              <div className="text-red-500 text-xs">{errors.termsAccepted}</div>
            )}
          </div>

          <Button
            type="submit"
            text="Register"
            color="#050708"
            textColor="white"
            size="md"
            className="mt-4 text-center bg-[#050708]"
          />
        </form>
      </div>
    </div>
  );
};
