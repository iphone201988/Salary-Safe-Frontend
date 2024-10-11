import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "../../../../components/InputField/InputField";
import {
    companyLoginSchema,
  validateForm,
} from "../../../../Schema/Schemas";
import Button from "../../../../components/Button/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { companyLogin } from "../../../../API/apis";
import { Link, useNavigate } from "react-router-dom";

const CompanyLogin = () => {
  const [formData, setFormData] = useState({
    company_email: "",
    company_name: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = await validateForm(companyLoginSchema, formData);
    if (errors) {
      setErrors(errors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      const response = await axios.post(companyLogin, {
        company_name: formData.company_name,
        company_email: formData.company_email,
        password: formData.password,
      });

      if (response.status === 200) {
        // Store the access token
        localStorage.setItem("access_token", response?.data?.access_token);
        localStorage.setItem("token_type", response?.data?.token_type);
        localStorage.setItem("role", "company");
        localStorage.setItem("id", response?.data?.id);

        // Show success message
        toast.success("Logged in successfully!");
        
        // Reset form and navigate to dashboard
        setFormData({
          company_email: "",
          company_name: "",
          password: "",
        });
        navigate("/");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error:any) {
      console.error("error",error);
      console.log("error",error);
      const errorMessage = error?.response?.data?.detail || "An error occurred during login.";
      toast.error(errorMessage);
      setFormData({
        company_email:"",
        company_name: "",
        password: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[40rem] space-y-6 border-2 border-gray-400 p-5 rounded-lg">
        <h1 className="text-4xl font-bold text-center">Login as Employer</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
            label="Company Name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            error={errors.company_name}
          />
          <InputField
            label="Email"
            name="company_email"
            value={formData.company_email}
            onChange={handleChange}
            error={errors.company_email}
          />
          <InputField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            type="password"
          />
          <div>
            Don't have an account?{" "}
            <Link to="/signup-company" className="cursor-pointer underline">
              Register
            </Link>
          </div>
          <div className="w-full flex justify-center">
            <Button
              content={isSubmitting ? "Submitting..." : "Login"}
              className={`btn-primary text-[#ffffff] w-[200px]`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyLogin;
