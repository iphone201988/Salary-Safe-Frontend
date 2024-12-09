import { useNavigate } from "react-router-dom";
import {
  hiringGoalsOptions,
  JobTypeOptions,
  preferedJobLocationOption,
  rolesPostionOptions,
} from "../../Candidate/Auth/Employee/SignUp/options";
import Button from "../../Register/Button/Button";
// import Input from "../../Register/Input/Input";
import MultiSelectComponent from "../MultiSelect/Multi";

const GoalsPreference = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[550px] relative border border-gray-400 px-4 py-8 rounded-[20px] flex flex-col lg:flex-row justify-center items-center bg-[#ffffff]">
      <Button
        text="Skip"
        type="button"
        color="green"
        textColor="white"
        size="md"
        className="mt-4 text-center bg-black absolute right-3 top-0"
        onClick={() => navigate("/profile/dashboard-customization")}
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
        Hiring Goals and Preferences
        </div>

        <div className="flex gap-4">
          <div>
            <div className="w-[300px]">
              {/* <Input
                label="Job Titles/Positions of Interest:"
                placeholder="enter job title here"
              /> */}
              <MultiSelectComponent
                isMulti={false}
                label="Primary Hiring Goals"
                options={hiringGoalsOptions}
              />

              <MultiSelectComponent
                isMulti={false}
                label="Preferred Job Locations"
                options={preferedJobLocationOption}
              />

              <MultiSelectComponent
                isMulti={true}
                label="Roles/Positions of Interest"
                options={rolesPostionOptions}
              />
              <MultiSelectComponent
                isMulti={false}
                label="Job Type"
                options={JobTypeOptions}
              />
            </div>
          </div>
        </div>
        <Button
          text="submit"
          type="button"
          color="green"
          textColor="white"
          size="md"
          className="mt-4 text-center bg-[green]"
        />
      </div>
    </div>
  );
};

export default GoalsPreference;
