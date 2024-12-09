import { useNavigate } from "react-router-dom";
import Button from "../../Register/Button/Button";
import Input from "../../Register/Input/Input";
import MultiSelectComponent from "../MultiSelect/Multi";
import {
  industriesOfInterestOptional,
  jobTypePreferencesOptions,
  professionalDevelopmentAreasOptions,
} from "../../Candidate/Auth/Employee/SignUp/options";

const JobSearch = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[750px] relative border border-gray-400 px-4 py-8 rounded-[20px] flex flex-col lg:flex-row justify-center items-center bg-[#ffffff]">
      <Button
        text="Skip"
        type="button"
        color="green"
        textColor="white"
        size="md"
        className="mt-4 text-center bg-black absolute right-3 top-0"
        onClick={() => navigate("/profile/additional-detail")}
      />

      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center h-full mb-6 lg:mb-0 rounded-lg">
          <img
            src={"/logo.png"}
            alt="Company Logo"
            className="w-full h-20 object-cover rounded-md mb-4"
          />
        </div>
        <div className="mb-2 mt-0 text-xl font-bold leading-tight text-black text-center lg:text-left">
          Job Search Preferences
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <MultiSelectComponent
              isMulti={true}
              label="Industries of Interest:"
              options={industriesOfInterestOptional}
            />
            <MultiSelectComponent
              isMulti={true}
              label="Job Type Preferences:"
              options={jobTypePreferencesOptions}
            />
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="actively_looking_for_new_job"
                name="actively_looking_for_new_job"
              />
              <label htmlFor="actively_looking_for_new_job">
                Are you actively looking for a new job?
              </label>
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="salaryInsightsInterest"
                name="salaryInsightsInterest"
              />
              <label htmlFor="salaryInsightsInterest">
                Interested in salary benchmarks and market insights?
              </label>
            </div>
          </div>

          <div className="w-[320px]">
            <Input
              label="Career Goals:"
              name="career_goals"
              placeholder="enter career goal here"
              type="number"
            />

            <MultiSelectComponent
              isMulti={true}
              label="Professional Development Areas:"
              options={professionalDevelopmentAreasOptions}
            />
            <Input
              label="Role-Specific Salary Adjustments"
              name="role_specific_salary_adjustments"
              placeholder="Enter Role-Specific Salary Adjustments"
            />
          </div>
        </div>
        <div className=" w-[350px] flex justify-between">
          <Button
            text="Back"
            type="button"
            color="green"
            textColor="white"
            size="md"
            className="mt-4 text-center bg-[#ef4444]"
            onClick={() => navigate("/profile/about-salary")}
          />
          <Button
            text="Submit"
            type="button"
            color="green"
            textColor="black"
            size="md"
            className="mt-4 text-center bg-[#fcd34d]"
          />
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
