import { useNavigate } from "react-router-dom";
import {
  benefitsOptions,
  salaryTypeOptions,
  viewSalaryPermissionOptions,
} from "../../Candidate/Auth/Employee/SignUp/options";
import Button from "../../Register/Button/Button";
import Input from "../../Register/Input/Input";
import MultiSelectComponent from "../MultiSelect/Multi";

const ABoutSalary = () => {
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
        onClick={()=>navigate("/profile/job-search")}
      />

      <div className="w-full lg:w-[350px] flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center h-full mb-6 lg:mb-0 rounded-lg">
          <img
            src={"/logo.png"}
            alt="Company Logo"
            className="w-full h-20 object-cover rounded-md mb-4"
          />
        </div>
        <div className="mb-2 mt-0 text-xl font-bold leading-tight text-black text-center lg:text-left">
          Salary Expectations
        </div>

        <div className="flex gap-4">
          <div>
            <div className="w-full">
              <Input
                label="General Salary Range:"
                placeholder="enter salary range here"
              />
              <MultiSelectComponent
                isMulti={false}
                label="Preferred Salary Type:"
                options={salaryTypeOptions}
              />
            </div>

            <div className="w-full flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="open_to_performance_based_compensation"
                name="open_to_performance_based_compensation"
                //   checked={formData.open_to_performance_based_compensation}
                //   onChange={handleChange}
              />
              <label htmlFor="open_to_performance_based_compensation">
                Open to performance-based compensation?
              </label>
            </div>
            <div className="w-full flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="willing_to_negociate"
                name="willing_to_negociate"
                //   checked={formData.willing_to_negociate}
                //   onChange={handleChange}
              />
              <label htmlFor="willing_to_negociate">
                Willing to Negotiate?
              </label>
            </div>
          </div>

          <div className="w-[320px]">
            <Input
              label="Minimum Acceptable Salary (Optional):"
              placeholder="enter minium salary here"
              type="number"
            />

            <MultiSelectComponent
              isMulti={true}
              label="Preferred Benefits:"
              options={benefitsOptions}
            />
            <MultiSelectComponent
              isMulti={false}
              label="Who can view your salary expectations?"
              options={viewSalaryPermissionOptions}
            />
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="hide_profile_from_current_employer"
                name="hide_profile_from_current_employer"
                //   checked={formData.hide_profile_from_current_employer}
                //   onChange={handleChange}
              />
              <label htmlFor="hide_profile_from_current_employer">
                Hide my profile from current employer(s)
              </label>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <Button
            text="Back"
            type="button"
            color="green"
            textColor="white"
            size="md"
            className="mt-4 text-center bg-[#ef4444]"
            onClick={() => navigate("/profile/add-skill")}
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

export default ABoutSalary;
