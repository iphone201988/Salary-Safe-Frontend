import { Link, useNavigate } from "react-router-dom";
import Input from "../Register/Input/Input";
import Button from "../Register/Button/Button";
import { IndustryceOptions, sizeOptions } from "../../utils/helper";
import MultiSelectComponent from "../Profile-Setup/MultiSelect/Multi";
import { setemployeerDetails } from "../../Redux/reducer/userData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { employeerRegister } from "../../API/apis";
import axios from "axios";
import { toast } from "react-toastify";
import { login } from "../../Redux/reducer/authSlice";

export const RegisterCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employeerDetails } = useSelector((state: any) => state.user);

  // const token = useSelector((state: any) => state.auth.token);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      setemployeerDetails({
        ...employeerDetails,
        [name]: type === "checkbox" ? checked : value,
      })
    );
  };

  const handleMultiSelectChange = (field: string, selectedOptions: any) => {
    dispatch(
      setemployeerDetails({ ...employeerDetails, [field]: selectedOptions })
    );
  };
  const handleSubmit = async () => {

    const data = {
      company_name: employeerDetails?.company_name || "",
      industry: employeerDetails?.industry?.value || "",
      company_size: employeerDetails?.company_size?.value || "",
      headquarters_location: employeerDetails?.headquarters_location || "",
      primary_contact_person: employeerDetails?.primary_contact_person || "",
      email: employeerDetails?.email || "",
      contact_phone_number: employeerDetails?.contact_phone_number || "",
      password: employeerDetails?.password || "",
      terms_accepted: employeerDetails?.terms_accepted || false,
    };

    // if (validateForm()) {
      if (employeerDetails.terms_accepted) {
        try {
          const response = await axios.post(employeerRegister, data, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.status === 200) {
            toast.success("Registration successful!");
            dispatch(
              login({ token: response?.data?.access_token, role: "employeer" })
            );
            navigate("/profile/company-additional-detail");
            // navigate("/login-company");
          }
        } catch (err) {
          toast.error("Registration failed. Please try again.");
        } finally {
          dispatch(
            setemployeerDetails({
              ...employeerDetails,
              password: "",
            })
          );
        }
      }
    // }
  };
  return (
    <div className="w-[750px] px-4 py-4 rounded-[20px] flex flex-col lg:flex-row justify-center items-center bg-[#ffffff]">
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

      <div className="hidden lg:block h-[650px] rounded-full border-l-2 border-gray-400"></div>

      <div className="w-full lg:w-[350px] flex flex-col justify-center items-center ml-4">
        <h4 className="mb-2 mt-0 text-xl font-medium leading-tight text-black text-center lg:text-left">
          Employer Register Profile
        </h4>

        <div className="w-full">
          <Input
            label="Company Name"
            placeholder="enter company name here"
            errorMessage="Full Name is required"
            name="company_name"
            value={employeerDetails?.company_name}
            onChange={handleChange}
          />

          <MultiSelectComponent
            isMulti={false}
            label="Industry:"
            options={IndustryceOptions}
            width="w-[295px]"
            value={employeerDetails?.industry}
            onChange={(selected) =>
              handleMultiSelectChange("industry", selected)
            }
          />
          <MultiSelectComponent
            isMulti={false}
            label="Company Size:"
            options={sizeOptions}
            width="w-[295px]"
            value={employeerDetails?.company_size}
            onChange={(selected) =>
              handleMultiSelectChange("company_size", selected)
            }
          />

          <Input label="Headquarters" placeholder="search place" 
          name="headquarters_location"
          value={employeerDetails?.headquarters_location}
          onChange={handleChange} 
          />
          <Input label="Primary Contact Person" placeholder="enter primary contact"
          name="primary_contact_person"
          value={employeerDetails?.primary_contact_person}
          onChange={handleChange}
           />
          <Input label="Email" placeholder="enter email here"
          name="email"
          value={employeerDetails?.email}
          onChange={handleChange}
           />
          <Input label="Phone" placeholder="+91 12356789"name="contact_phone_number"
          value={employeerDetails?.contact_phone_number}
          onChange={handleChange}
           />
          <Input label="Password" placeholder="******" type="password" 
          name="password"
          value={employeerDetails?.password}
          onChange={handleChange}
          />
        </div>

        <h2 className="text-[#000000] mt-2 text-sm font-bold">
          Agreement and Submission
        </h2>
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            id="terms_accepted"
            name="terms_accepted"
            checked={employeerDetails?.terms_accepted}
            onChange={handleChange}
          />
          <label htmlFor="terms_accepted">
            I agree to the{" "}
            <Link to="/terms" className="text-blue-500 text-[8px] underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-500 text-[8px] underline">
              Privacy Policy
            </Link>
            .
          </label>
        </div>

        <Button
          // onClick={() => navigate("/profile/hiring-goal")}
          onClick={handleSubmit}
          text="Register"
          type="button"
          color="#050708"
          textColor="white"
          size="md"
          className="mt-4 text-center bg-[#050708]"
          disabled={!employeerDetails?.terms_accepted}
        />
      </div>
    </div>
  );
};
