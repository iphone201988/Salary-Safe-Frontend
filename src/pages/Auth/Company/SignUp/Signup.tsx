import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "../../../../components/InputField/InputField";
import {
  companyRegistrationSchema,
  validateForm,
} from "../../../../Schema/Schemas";
import Button from "../../../../components/Button/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { companyRegister } from "../../../../API/apis";
import { Link } from "react-router-dom";

const CompanySignUp = () => {
  const [formData, setFormData] = useState({
    company_name: "",
    company_email: "",
    // contact_person: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = await validateForm(companyRegistrationSchema, formData);
    if (errors) {
      setErrors(errors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      // const response = await axios.post(companyRegister, {
      //   company_name: formData.company_email,
      //   password: formData.password,
      // });
      // console.log("response::::", response);

      setTimeout(() => {
        toast.success("Registration completed!");
        setFormData({
          company_name: "",
          company_email: "",
          // contact_person: "",
          password: "",
        });
      }, 1000);
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[40rem] space-y-6 border-2 border-gray-400 p-5 rounded-lg">
        <h1 className="text-4xl font-bold text-center">Register as Employer</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Company Name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            error={errors.company_name}
          />
          <InputField
            label="Company Email"
            name="company_email"
            value={formData.company_email}
            onChange={handleChange}
            error={errors.company_email}
          />
          {/* <InputField
            label="Contact Person"
            name="contact_person"
            value={formData.contact_person}
            onChange={handleChange}
            error={errors.contact_person}
          /> */}
          <InputField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            type="password"
          />
          <div>
            Already have an account?{" "}
            <Link to="/login-company" className="cursor-pointer underline">
              Login
            </Link>
          </div>
          <div className="w-full flex justify-center">
            <Button
              content={isSubmitting ? "Submitting..." : "Sign Up"}
              className={`btn-primary text-[#ffffff] w-[200px]`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySignUp;
