import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "../../../../components/InputField/InputField";
import Button from "../../../../components/Button/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { resetPasswordSchema, validateForm } from "../../../../Schema/Schemas";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
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
    const errors = await validateForm(resetPasswordSchema, formData);

    if (errors) {
      setErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const { password } = formData;
      // await axios.post("/api/reset-password", { password });
      toast.success("Password reset successfully.");
      localStorage.removeItem("type");
      navigate("/login-company");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.detail || "Failed to reset password.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg space-y-6 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="New Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              content={isSubmitting ? "Resetting..." : "Reset Password"}
              className={`bg-[#019529] text-white px-6 py-2 rounded-md w-full`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
