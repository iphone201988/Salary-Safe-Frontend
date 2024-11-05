import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "../../../../components/InputField/InputField";
import Button from "../../../../components/Button/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

const OTPVerify = () => {
  const [formData, setFormData] = useState({
    otp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // const otp: string = formData.otp;
      // await axios.post("/api/verify-otp", { otp });
      toast.success("OTP verified successfully.");
      localStorage.setItem("type","2")
      // After successful OTP verification, navigate to reset password page
      navigate("/reset-password");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.detail || "Failed to verify OTP. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-lg space-y-6 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center">OTP Verification</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Enter OTP"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              content={isSubmitting ? "Verifying..." : "Verify OTP"}
              className={`bg-[#019529] text-white px-6 py-2 rounded-md w-full`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerify;
