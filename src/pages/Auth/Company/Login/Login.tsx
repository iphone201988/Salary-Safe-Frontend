// import { ChangeEvent, FormEvent, useState } from "react";
// import InputField from "../../../../components/InputField/InputField";
// import {
//     companyLoginSchema,
//   validateForm,
// } from "../../../../Schema/Schemas";
// import Button from "../../../../components/Button/Button";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { companyLogin } from "../../../../API/apis";
// import { Link, useNavigate } from "react-router-dom";

// const CompanyLogin = () => {
//   const [formData, setFormData] = useState({
//     company_email: "",
//     company_name: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState<any>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     const errors = await validateForm(companyLoginSchema, formData);
//     if (errors) {
//       setErrors(errors);
//       return;
//     }
//     setErrors({});
//     setIsSubmitting(true);
//     try {
//       const response = await axios.post(companyLogin, {
//         company_name: formData.company_name,
//         company_email: formData.company_email,
//         password: formData.password,
//       });

//       if (response.status === 200) {
//         // Store the access token
//         localStorage.setItem("access_token", response?.data?.access_token);
//         localStorage.setItem("token_type", response?.data?.token_type);
//         localStorage.setItem("role", "company");
//         localStorage.setItem("id", response?.data?.id);

//         // Show success message
//         toast.success("Logged in successfully!");
        
//         // Reset form and navigate to dashboard
//         setFormData({
//           company_email: "",
//           company_name: "",
//           password: "",
//         });
//         navigate("/");
//       } else {
//         toast.error("Login failed. Please check your credentials.");
//       }
//     } catch (error:any) {
//       console.error("error",error);
//       console.log("error",error);
//       const errorMessage = error?.response?.data?.detail || "An error occurred during login.";
//       toast.error(errorMessage);
//       setFormData({
//         company_email:"",
//         company_name: "",
//         password: "",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="w-[40rem] space-y-6 border-2 border-gray-400 p-5 rounded-lg">
//         <h1 className="text-4xl font-bold text-center">Login as Employer</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//         <InputField
//             label="Company Name"
//             name="company_name"
//             value={formData.company_name}
//             onChange={handleChange}
//             error={errors.company_name}
//           />
//           <InputField
//             label="Email"
//             name="company_email"
//             value={formData.company_email}
//             onChange={handleChange}
//             error={errors.company_email}
//           />
//           <InputField
//             label="Password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             error={errors.password}
//             type="password"
//           />
//           <div>
//             Don't have an account?{" "}
//             <Link to="/signup-company" className="cursor-pointer underline">
//               Register
//             </Link>
//           </div>
//           <div className="w-full flex justify-center">
//             <Button
//               content={isSubmitting ? "Submitting..." : "Login"}
//               className={`btn-primary text-[#ffffff] w-[200px]`}
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CompanyLogin;
import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "../../../../components/InputField/InputField";
import {
  companyLoginSchema,
  validateForm,
} from "../../../../Schema/Schemas";
import Button from "../../../../components/Button/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { companyLogin, userLogin, userSocialLogin } from "../../../../API/apis";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleauthProvider } from "../../../../../firebase";
import { signInWithPopup } from "firebase/auth";
import Loader from "../../../../components/Loader/Loader";


const CompanyLogin = () => {
  const [formData, setFormData] = useState({
    company_email: "",
    company_name: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const LinkdinHandler = async () => {
    try {
      const clientId = "77j01h5xe1ouuu";
    const redirectUri = "https://localhost:5173/auth/linkedin/callback";
    const scope = "email profile openid"; // Adjust scopes as necessary
    // const state = "random_string"; // Use a random string for security
    const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}`;

    window.location.href = url;
      }catch(error:any){
        console.log(error);
      }
    }
  const GoggleHandler = async () => {
    try {
      const result = await signInWithPopup(auth, googleauthProvider);
      console.log("google user", result);
      const data ={
        email: result.user?.email,
        full_name: result.user?.displayName,
        photo: result.user?.photoURL,
        provider: result.user?.providerData[0].providerId,
        provider_id: result.user?.uid,
      }
      try {
        const response  = await axios.post(userSocialLogin,data)
        console.log("social user response", response);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("token_type", response.data.token_type);
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      } catch (error:any) {
        console.log(error);
        const errorMessage = error?.response?.data?.detail || "An error occurred during login.";
        toast.error(errorMessage);
      }

      }catch(error:any){
        console.log(error);
      }
    }
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
      setLoading(true);
      const data:any ={
        username: formData.company_email,
        password: formData.password,
        company_name: formData.company_name
  
      }
      const response = await axios.post(userLogin, data);

      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("token_type", response.data.token_type);
        toast.success("Logged in successfully!");
        setFormData({
          company_email: "",
          company_name: "",
          password: "",
        });
        setLoading(false);
        navigate("/dashboard");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.response?.data?.detail || "An error occurred during login.";
      toast.error(errorMessage);
      setFormData({
        company_email: "",
        company_name: "",
        password: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {loading && <Loader />}
      <div className="w-full max-w-lg space-y-6 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center">Login as Employer</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Name */}
          <InputField
            label="Company Name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            error={errors.company_name}
          />

          {/* Email */}
          <InputField
            label="Email"
            name="company_email"
            value={formData.company_email}
            onChange={handleChange}
            error={errors.company_email}
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
          <Link to="/signup-company" className="text-[#019529] underline">
            Register
          </Link>
        </div>

        {/* Social Login (Optional) */}
        <div className="flex justify-center mt-6 space-x-4">
          <button onClick={GoggleHandler} className="bg-[#4285F4] text-white px-4 py-2 rounded-md">Login with Google</button>
          <button onClick={LinkdinHandler} className="bg-[#0077B5] text-white px-4 py-2 rounded-md">Login with LinkedIn</button>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;
