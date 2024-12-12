// export default CompanyLogin;
import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "../../../../components/InputField/InputField";
import { companyLoginSchema, validateForm } from "../../../../Schema/Schemas";
import Button from "../../../../components/Button/Button";
import { toast } from "react-toastify";
import axios from "axios";
import {
  employeerLogin ,
} from "../../../../API/apis";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../../components/Loader/Loader";
import { useDispatch } from "react-redux";
// import { setUserData } from "../../../../Redux/reducer/userData";
import { login } from "../../../../Redux/reducer/authSlice";

const CompanyLogin = () => {
  const [formData, setFormData] = useState({
    // company_email: "",
    // company_name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const LinkdinHandler = async () => {
  //   try {
  //     const clientId = "77j01h5xe1ouuu";
  //   const redirectUri = "https://localhost:5173/auth/linkedin/callback";
  //   const scope = "email profile openid"; // Adjust scopes as necessary
  //   // const state = "random_string"; // Use a random string for security
  //   const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
  //     redirectUri
  //   )}&scope=${encodeURIComponent(scope)}`;

  //   window.location.href = url;
  //     }catch(error:any){
  //       console.log(error);
  //     }
  //   }
  // const GoggleHandler = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleauthProvider);
  //     console.log("google user", result);
  //     const data ={
  //       email: result.user?.email,
  //       full_name: result.user?.displayName,
  //       photo: result.user?.photoURL,
  //       provider: result.user?.providerData[0].providerId,
  //       provider_id: result.user?.uid,
  //     }
  //     try {
  //       const response  = await axios.post(userSocialLogin,data)
  //       console.log("social user response", response);
  //       localStorage.setItem("access_token", response.data.access_token);
  //       localStorage.setItem("token_type", response.data.token_type);
  //       toast.success("Logged in successfully!");
  //       navigate("/dashboard");
  //     } catch (error:any) {
  //       console.log(error);
  //       const errorMessage = error?.response?.data?.detail || "An error occurred during login.";
  //       toast.error(errorMessage);
  //     }
  //     }catch(error:any){
  //       console.log(error);
  //     }
  //   }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = await validateForm(companyLoginSchema, formData);
    if (errors) {
      console.log("errors", errors, formData);
      setErrors(errors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      setLoading(true);
      const data: any = {
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(employeerLogin, data);

      if (response.status === 200) {
        dispatch(
          login({ token: response?.data?.access_token, role: "employeer" })
        );

        toast.success("Logged in successfully!");
        setFormData({
          email: "",
          password: "",
        });
        setLoading(false);
        navigate("/employeer/dashboard");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error: any) {
      setLoading(false);
      const errorMessage =
        error?.response?.data?.detail || "An error occurred during login.";
      toast.error(errorMessage);
      setFormData({
        email: "",
        password: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {loading && <Loader />}
      <div className="w-full max-w-lg space-y-6 p-8 bg-white shadow-md rounded-[20px]">
        <h1 className="text-3xl font-bold text-center">Login as Employer</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Name */}
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          {/* Password */}
          <InputField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            type="password"
          />

          {/* Forgot Password */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-[#6B7280] underline">
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              content={isSubmitting ? "Submitting..." : "Login"}
              className={`bg-[black] text-white px-6 py-2 rounded-md w-full`}
            />
          </div>
        </form>

        {/* Register Link */}
        <div className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup-company" className="text-[#6B7280] underline">
            Register
          </Link>
          {" | "}
          <Link to="/" className="text-[#6B7280] underline">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;
