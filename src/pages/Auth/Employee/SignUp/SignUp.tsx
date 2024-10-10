import React, { useState, ChangeEvent, FormEvent } from "react";
import InputField from "../../../../components/InputField/InputField";
import {
  employeeRegistrationSchema,
  validateForm,
} from "../../../../Schema/Schemas";
import Button from "../../../../components/Button/Button";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
  qualifications: string;
  salary_expectation: number;
};

interface Errors {
  email?: string;
  password?: string;
  qualifications?: string;
  salary_expectation?: string;
}

const EmployeeSignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    qualifications: "",
    salary_expectation: 0,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = await validateForm(employeeRegistrationSchema, formData);
    if (errors) {
      setErrors(errors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      setTimeout(() => {
        toast.success("Registration completed!");
        setFormData({
          password: "",
          email: "",
          qualifications: "",
          salary_expectation: 0,
        });
      }, 1000);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-[40rem] space-y-6 border-2 border-gray-400 p-5 rounded-lg">
        <h2 className="text-4xl font-bold text-center">
          Register as an Employee
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
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
          <InputField
            label="Qualifications"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            error={errors.qualifications}
          />
          <InputField
            label="Salary Expectations"
            name="salary_expectation"
            value={formData.salary_expectation}
            onChange={handleChange}
            error={errors.salary_expectation}
            type="number"
          />
          <div>
            Already have an account?{" "}
            <Link to="/login-employee" className="cursor-pointer underline">
              Login
            </Link>
          </div>
          <div className="w-full flex justify-center">
            <Button
              content={isSubmitting ? "Submitting..." : "Send Request"}
              className={`btn-primary text-[#ffffff] w-[200px]`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeSignUp;
