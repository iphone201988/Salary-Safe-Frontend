import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "../../../../../components/InputField/InputField";
import {
  employeeLoginSchema,
  validateForm,
} from "../../../../../Schema/Schemas";
import Button from "../../../../../components/Button/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { candidateLogin /* userSocialLogin */ } from "../../../../../API/apis";
import { Link, useNavigate } from "react-router-dom";
// import { auth, googleauthProvider } from "../../../../../../firebase";
// import { signInWithPopup } from "firebase/auth";
import Loader from "../../../../../components/Loader/Loader";
import { login } from "../../../../../Redux/reducer/authSlice";
import { useDispatch } from "react-redux";
import { GrFormView, GrFormViewHide } from "react-icons/gr";

const EmployeeLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [veiwPassword, setVeiwPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const GoggleHandler = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleauthProvider);
  //     console.log("google user", result);
  //     const data = {
  //       email: result.user?.email,
  //       full_name: result.user?.displayName,
  //       photo: result.user?.photoURL,
  //       provider: result.user?.providerData[0].providerId,
  //       provider_id: result.user?.uid,
  //     };
  //     try {
  //       const response = await axios.post(userSocialLogin, data);
  //       console.log("social user response", response);

  //       dispatch(login({token: response?.data?.access_token ,role:"candidate"}));
  //       toast.success("Logged in successfully!");
  //       navigate("/candidate/dashboard");
  //     } catch (error: any) {
  //       console.log(error);
  //       const errorMessage =
  //         error?.response?.data?.detail || "An error occurred during login.";
  //       toast.error(errorMessage);
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = await validateForm(employeeLoginSchema, formData);
    if (errors) {
      const firstErrorMessage:any = Object.values(errors)[0];
      toast.error(firstErrorMessage);
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
      const response = await axios.post(candidateLogin, data);
      dispatch(
        login({ token: response?.data?.access_token, role: "candidate" })
      );
      toast.success("Logged in successfully!");
      setFormData({
        email: "",
        phone: "",
        password: "",
      });
      setLoading(false);
      navigate("/candidate/dashboard");
    } catch (error: any) {
      setLoading(false);
      const errorMessage =
        error?.response?.data?.detail || "An error occurred during login.";
      toast.error(errorMessage);
      setFormData({
        email: "",
        phone: "",
        password: "",
      });
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };
console.log("loading",loading)
  return (
    <div className="flex justify-center items-center min-h-screen">
      {loading &&  <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-20">
          <Loader />
        </div>}
      <div className={`w-full max-w-lg space-y-6 p-8 bg-white shadow-md rounded-lg ${loading?"backdrop-blur-sm":""}`}>
        <h1 className="text-3xl font-bold text-center">Login as Candidate</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          {/* <div
            className="flex items-center justify-around w-[80%] mx-auto my-2"
            id="separator"
          >
            <span className="h-[1px] bg-[#3D3D3D] w-[100px]" id="line1"></span>
            <span className="text-[#3D3D3D]">OR</span>
            <span className="h-[1px] bg-[#3D3D3D] w-[100px]" id="line2"></span>
          </div>
          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          /> */}

          {/* Password */}
          <div className="relative">
          <InputField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            type={veiwPassword ?"text":"password"}
            />
           <div className="absolute right-1 top-10 cursor-pointer" onClick={()=>setVeiwPassword(!veiwPassword)}>{veiwPassword?<GrFormViewHide />:<GrFormView />
           }</div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-[#019529] underline">
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              content={isSubmitting ? "Submitting..." : "Login"}
              className={`bg-[#019529] text-white px-6 py-2 rounded-md w-full`}
            />
          </div>
        </form>

        {/* Register Link */}
        <div className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup-employee" className="text-[#019529] underline">
            Register
          </Link>
          {" | "}
          <Link to="/" className="text-[#019529] underline">
            Home
          </Link>
        </div>

        {/* Social Login (Optional) */}
        {/* <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={GoggleHandler}
            className="bg-[#4285F4] text-white px-4 py-2 rounded-md"
          >
            Login with Google
          </button>
          <button
            onClick={LinkdinHandler} className="bg-[#0077B5] text-white px-4 py-2 rounded-md"
          >
            Login with LinkedIn
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default EmployeeLogin;
