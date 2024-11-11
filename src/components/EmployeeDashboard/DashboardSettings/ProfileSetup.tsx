import {
  educationLevelOptions,
  experienceOptions,
  skillsOptions,
} from "../../../pages/Candidate/Auth/Employee/SignUp/options";
// import { CandidateProfileType } from "../../../types";
import InputField from "../../InputField/InputField";
import MultiSelectComponent from "../../MultiSelect/MultiSelect";

const ProfileSetup = ({
  formData,
  setFormData,
  handleChange,
  errors,
  edit,
}: any) => {
  const handleMultiSelectChange = (field: string, selectedOptions: any) => {
    setFormData({ ...formData, [field]: selectedOptions });
  };
  return (
    <fieldset className="border border-black p-4 rounded-md">
      <legend>Profile Setup</legend>
      <div className="flex flex-col">
        <div className="flex w-full space-x-2">
          <div className="w-full">
            <InputField
              label="Job Titles/Positions of Interest"
              name="job_titles_of_interest"
              placeholder="Manager"
              value={formData.job_titles_of_interest}
              onChange={handleChange}
              error={errors.job_titles_of_interest}
              view={edit}
            />
          </div>

          <div className="w-full">
            <MultiSelectComponent
              isMulti={false}
              label="Total Years of Experience:"
              value={formData.total_years_of_experience}
              options={experienceOptions}
              onChange={(selected) =>
                handleMultiSelectChange("total_years_of_experience", selected)
              }
              error={errors.total_years_of_experience}
              isDisabled={edit}
            />
          </div>
        </div>

        <div className="flex w-full space-x-2">
          <div className="w-full">
            <MultiSelectComponent
              isMulti={false}
              label="Education Level:"
              value={formData.education_level}
              options={educationLevelOptions}
              onChange={(selected) =>
                handleMultiSelectChange("education_level", selected)
              }
              error={errors.education_level}
              isDisabled={edit}
            />
          </div>

          <div className="w-full">
            <MultiSelectComponent
              isMulti={false}
              label="Skills:"
              value={formData.key_skills}
              options={skillsOptions}
              onChange={(selected) =>
                handleMultiSelectChange("key_skills", selected)
              }
              error={errors.key_skills}
              isDisabled={edit}
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default ProfileSetup;
