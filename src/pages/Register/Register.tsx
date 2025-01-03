import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "./Button/Button";
import Input from "./Input/Input";
import { validationSchema } from "../../validation";
import { candidateRegister } from "../../API/apis";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/reducer/authSlice";
import { setemployeDetails } from "../../Redux/reducer/userData";
import { useSelector } from "react-redux";
import LocationSearch from "../../components/LocationSearch";
import { generateToken } from "../../../firebase";


interface Location {
  id: string;
  city: string;
  country: string;
  location_multiplier: number;
}

export const Register = () => {
  const navigate = useNavigate();
  const { employeDetails } = useSelector((state: any) => state.user);

  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  // const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);
  const [fcmToken, setFcmToken] = useState<string|undefined>();

  const dispatch = useDispatch();
    useEffect(() => {
      const fetchToken = async () => {
        const token = await generateToken(); // Await the result of the async function
        if(token) setFcmToken(token); // Set the resolved value to state
      };
  
      fetchToken();
    }, []);
    console.log("fcmtoken",fcmToken);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      dispatch(
        setemployeDetails({
          ...employeDetails,
          [name]: e.target.checked,
        })
      );
    } else {
      dispatch(
        setemployeDetails({
          ...employeDetails,
          [name]: value,
        })
      );
    }

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prevTouched: any) => ({
      ...prevTouched,
      [name]: true,
    }));
    validateField(name, employeDetails[name]);
  };

  const validateField = (name: string, value: string) => {
    try {
      validationSchema.validateSyncAt(name, { [name]: value });
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    } catch (error: any) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [name]: error.message,
      }));
    }
  };

  const validateForm = () => {
    const formErrors: any = {};
    Object.keys(employeDetails).forEach((field) => {
      try {
        validationSchema.validateSyncAt(field, employeDetails);
      } catch (error: any) {
        formErrors[field] = error.message;
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      full_name: employeDetails?.full_name,
      email: employeDetails?.email,
      phone_number: employeDetails?.phone_number,
      password: employeDetails.password,
      current_job_title: employeDetails.current_job_title,
      linkedin_profile_url: employeDetails.linkedin_profile_url,
      terms_accepted: employeDetails.terms_accepted,
      fcm_device_token: fcmToken||""

    };

    if (validateForm()) {
      if (employeDetails.terms_accepted) {
        try {
          const response = await axios.post(candidateRegister, data, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.status === 200) {
            toast.success("Registration successful!");
            dispatch(
              login({ token: response?.data?.access_token, role: "candidate" })
            );
            navigate("/profile/add-skill");
          }
        } catch (err) {
          toast.error("Registration failed. Please try again.");
        } finally {
          dispatch(
            setemployeDetails({
              ...employeDetails,
              password: "",
            })
          );
        }
      }
    }
  };

  useEffect(() => {
    if (selectedLocations) {
      dispatch(
        setemployeDetails({
          ...employeDetails,
          location_multiplier:selectedLocations[0]?.location_multiplier,
          location: `${selectedLocations[0]?.city === undefined ? "":selectedLocations[0]?.city} ${selectedLocations[0] ? ",":" "} ${selectedLocations[0]?.country === undefined ? "":selectedLocations[0]?.country}`,
        })
      );
    }
  }, [selectedLocations]);

  return (
    <div className="w-[750px] px-4 py-8 rounded-[20px] flex flex-col lg:flex-row justify-center items-center bg-[#ffffff]">
      <div className="w-full lg:w-[300px] flex flex-col justify-center items-center h-full mb-6 lg:mb-0 lg:mr-4 p-4 rounded-lg">
        <img
          src={"/logo.png"}
          alt="Company Logo"
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-semibold text-black mb-2">Salary Safe</h2>
        <p className="text-black text-[9px] mb-4 text-center sm:text-xs md:text-sm lg:text-[13px]">
          Salary-Safe is an innovative platform designed to bring transparency
          and fairness to salary negotiations by aligning the expectations of
          candidates, employers, and the market.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-4 py-2 rounded-full text-sm sm:text-base"
        >
          Learn More
        </button>
      </div>

      <div className="hidden lg:block h-[400px] rounded-full border-l-2 border-gray-400"></div>

      <div className="w-full lg:w-[350px] flex flex-col justify-center items-center ml-4">
        <h4 className="mb-2 mt-0 text-xl font-medium leading-tight text-black text-center lg:text-left">
          Candidate Register Profile
        </h4>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-center items-center"
        >
          <Input
            label="Full Name"
            placeholder="Enter full name here"
            value={employeDetails?.full_name}
            name="full_name"
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.full_name}
          />

          <Input
            label="Email"
            placeholder="Enter email here"
            value={employeDetails?.email}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.email}
          />

          <Input
            label="Phone"
            placeholder="+91 12356789"
            value={employeDetails?.phone_number}
            name="phone_number"
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.phone_number}
          />
          <div className="w-[300px] p-1 relative">
            <div className="relative w-fit">
            <div className="text-[12px] mt-1 font-semibold mr-2">Location</div>
            <div className="absolute text-red-600 text-[13px] right-0 top-0 ml-6">*</div>
            </div>
            <LocationSearch
              placeholder="Search locations..."
              apiEndpoint="https://salarysafe.ai/api/v1/utils/locations/search"
              onSelectionChange={(locations) => setSelectedLocations(locations)}
              selectMode="single"
            />
          </div>

          {/* <Input
            label=""
            placeholder="Mohali,india"
            value={employeDetails?.location}
            name="location"
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.location}
            required={false}
          /> */}

          <Input
            label="Password"
            placeholder="******"
            type="password"
            value={employeDetails?.password}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.password}
          />

          <Input
            label="Current Job title"
            placeholder="Mern Developer"
            value={employeDetails?.current_job_title}
            name="current_job_title"
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors?.current_job_title}
          />

          <Input
            label="LinkedIn Profile URL"
            placeholder="http://linkdin.in/techwinlabs/"
            value={employeDetails?.linkedin_profile_url}
            name="linkedin_profile_url"
            onChange={handleChange}
            onBlur={handleBlur}
            required={false}
            errorMessage={errors.linkedin_profile_url}
          />

          <h2 className="text-[#000000] mt-2 text-sm font-bold">
            Agreement and Submission
          </h2>
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              id="terms_accepted"
              name="terms_accepted"
              checked={employeDetails?.terms_accepted}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="terms_accepted">
              I agree to the{" "}
              <Link to="/terms" className="text-blue-500 text-[8px] underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-blue-500 text-[8px] underline"
              >
                Privacy Policy
              </Link>
              .
            </label>
            {errors.termsAccepted && (
              <div className="text-red-500 text-xs">{errors.termsAccepted}</div>
            )}
          </div>

          <Button
            type="submit"
            text="Register"
            color="#050708"
            textColor="white"
            size="md"
            className="mt-4 text-center bg-[#050708]"
            disabled={!employeDetails?.terms_accepted}
          />
        </form>
      </div>
    </div>
  );
};
