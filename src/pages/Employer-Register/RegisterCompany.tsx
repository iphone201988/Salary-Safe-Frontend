import { Link, useNavigate } from "react-router-dom";
import Input from "../Register/Input/Input";
import Button from "../Register/Button/Button";
import { IndustryceOptions, sizeOptions } from "../../utils/helper";
import MultiSelectComponent from "../Profile-Setup/MultiSelect/Multi";

export const RegisterCompany = () => {
  const navigate = useNavigate();
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
          />

          <MultiSelectComponent
            isMulti={false}
            label="Industry:"
            options={IndustryceOptions}
            width="w-[295px]"
          />
          <MultiSelectComponent
            isMulti={false}
            label="Company Size:"
            options={sizeOptions}
            width="w-[295px]"
          />

          <Input label="Headquarters" placeholder="search place" />
          <Input label="Primary Contact" placeholder="enter primary contact" />
          <Input label="Email" placeholder="enter email here" />
          <Input label="Phone" placeholder="+91 12356789" />
          <Input label="Password" placeholder="******" type="password" />
        </div>

        <h2 className="text-[#000000] mt-2 text-sm font-bold">
          Agreement and Submission
        </h2>
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            id="terms_accepted"
            name="terms_accepted"
            // checked={formData.terms_accepted}
            // onChange={handleChange}
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
          onClick={() => navigate("/profile/hiring-goal")}
          text="Register"
          type="button"
          color="#050708"
          textColor="white"
          size="md"
          className="mt-4 text-center bg-[#050708]"
        />
      </div>
    </div>
  );
};
