import { ChangeEvent, useEffect, useState } from "react";
import InputField from "../../../../components/InputField/InputField";
import Button from "../../../../components/Button/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { resetPasswordSchema, validateForm } from "../../../../Schema/Schemas";
import { resetPassword } from "../../../../API/apis";
import Loader from "../../../../components/Loader/Loader";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    confirmPassword: "",
    new_password: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [token, setToken] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (): Promise<void> => {
    // e.preventDefault();
    console.log("entering here...");

    const errors: any = await validateForm(resetPasswordSchema, formData);

    // console.log(errors.message + " error");

    if (errors) {
      setErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      setLoading(true);
      const { new_password } = formData;
      await axios.post(resetPassword, {
        new_password: new_password,
        token,
      });
      toast.success("Password reset successfully.");
      localStorage.removeItem("type");
      setLoading(false);
      navigate("/login-company");
    } catch (error: any) {
      setLoading(false);
      const errorMessage =
        error?.response?.data?.detail || "Failed to reset password.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenParam = queryParams.get("token");
    if (tokenParam) setToken(tokenParam);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {loading && <Loader />}
      <div className="w-full max-w-lg space-y-6 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center">Reset Password</h1>
        <div /* onSubmit={handleSubmit} */ className="space-y-4">
          <InputField
            label="New Password"
            name="new_password"
            type="password"
            value={formData.new_password}
            onChange={handleChange}
            error={errors.new_password}
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
              // type="submit"
              onClick={handleSubmit}
              content={isSubmitting ? "Resetting..." : "Reset Password"}
              className={`bg-[#019529] text-white px-6 py-2 rounded-md w-full`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
