import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "../../../../components/InputField/InputField";
import { forgotPasswordSchema, validateForm } from "../../../../Schema/Schemas";
import Button from "../../../../components/Button/Button";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { forgetPassword } from "../../../../API/apis";
import axios from "axios";
import Loader from "../../../../components/Loader/Loader";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
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
    const errors = await validateForm(forgotPasswordSchema, formData);

    console.log("errors", errors);
    if (errors) {
      setErrors(errors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      setLoading(true);
      const email: string = formData.email;
      const response = await axios.post(`${forgetPassword}/${email}`);
      toast.success("Password reset email sent successfully.");

      const url = new URL(response.data.link);

      const mail = url.searchParams.get("email");

      const token = url.searchParams.get("token");

      setLoading(false);
      navigate(`/reset-password?email=${mail}&token=${token}`);

      setFormData({
        email: "",
      });
    } catch (error: any) {
      setLoading(false);
      const errorMessage =
        error?.response?.data?.detail || "An error occurred during login.";
      toast.error(errorMessage);
      setFormData({
        email: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {loading && <Loader />}
      <div className="w-full max-w-lg space-y-6 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              content={isSubmitting ? "Submitting..." : "Submit"}
              className={`bg-[#019529] text-white px-6 py-2 rounded-md w-full`}
            />
          </div>
        </form>

        <div className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup-company" className="text-[#019529] underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
