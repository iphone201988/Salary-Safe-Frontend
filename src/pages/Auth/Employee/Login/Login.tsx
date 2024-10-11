import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "../../../../components/InputField/InputField";
import {
  employeeLoginSchema,
  validateForm,
} from "../../../../Schema/Schemas";
import Button from "../../../../components/Button/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { candidateLogin } from "../../../../API/apis";
import { Link, useNavigate } from "react-router-dom";

const EmployeeLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
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
    const errors = await validateForm(employeeLoginSchema, formData);
    if (errors) {
      setErrors(errors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      const response = await axios.post(candidateLogin, {
        username: formData.email,
        password: formData.password,
      });
      
      if (response.status === 200) {
        localStorage.setItem("access_token",response?.data?.access_token)
        localStorage.setItem("token_type",response?.data?.token_type)
        localStorage.setItem("role","candidate");
        localStorage.setItem("id", response?.data?.id);

        toast.success("Logged in successfully!");
        setFormData({
          email: "",
          password: "",
        });
        navigate("/"); // Redirect to dashboard or another page after login
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error:any) {
      console.log("error",error);
      const errorMessage = error?.response?.data?.detail || "An error occurred during login.";
      toast.error(errorMessage);
      setFormData({
        email:"",
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
          <div>
            Don't have an account?{" "}
            <Link to="/signup-employee" className="cursor-pointer underline">
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

export default EmployeeLogin;
