import {
  industriesOfInterestOptional,
  professionalDevelopmentAreasOptions,
} from "../../../pages/Candidate/Auth/Employee/SignUp/options";
// import { CandidateProfileType } from "../../../types";
import InputField from "../../InputField/InputField";
import MultiSelectComponent from "../../MultiSelect/MultiSelect";

const JobSearch = ({
  formData,
  setFormData,
  handleChange,
  errors,
  edit,
}: any) => {
  const handleMultiSelectChange = (field: string, selectedOptions: any) => {
    setFormData({ ...formData, [field]: selectedOptions });
  };

  const handleCheckboxChange = (field: string) => {
    setFormData({ ...formData, [field]: !formData[field] });
  };

  console.log(
    "interested_in_salary_benchmarks",
    formData?.interested_in_salary_benchmarks
  );

  return (
    <fieldset className="border border-black p-4 rounded-md">
      <legend>Job Search Preferences</legend>
      <div className="flex flex-col">
        <div className="flex w-full space-x-2">
          <div className="w-full">
            <MultiSelectComponent
              isMulti={false}
              label="Industries of Interest"
              value={formData.industries_of_interest}
              options={industriesOfInterestOptional}
              onChange={(selected) =>
                handleMultiSelectChange("industries_of_interest", selected)
              }
              error={errors.industries_of_interest}
              isDisabled={edit}
            />
          </div>
          <div className="w-full">
            <MultiSelectComponent
              isMulti={false}
              label="Job type preferences"
              value={formData.job_type_preferences}
              options={industriesOfInterestOptional}
              onChange={(selected) =>
                handleMultiSelectChange("industries_of_interest", selected)
              }
              error={errors.industries_of_interest}
              isDisabled={edit}
            />
          </div>

          <div className="w-full mt-8">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.actively_looking_for_new_job}
                onChange={() =>
                  handleCheckboxChange("actively_looking_for_new_job")
                }
                disabled={edit}
                className="h-4 w-4"
              />
              <span>Are you actively looking for a new job?</span>
            </label>
            {errors.actively_looking_for_new_job && (
              <p className="text-red-500 text-xs">
                {errors.actively_looking_for_new_job}
              </p>
            )}
          </div>
        </div>

        <div className="flex w-full space-x-2">
          <div className="w-full">
            <InputField
              label="Career Goals"
              name="career_goals"
              placeholder="Career Goals"
              value={formData.career_goals}
              onChange={handleChange}
              error={errors.career_goals}
              view={edit}
            />
          </div>

          <div className="w-full">
            <MultiSelectComponent
              isMulti={false}
              label="Professional development areas"
              value={formData.professional_development_areas}
              options={professionalDevelopmentAreasOptions}
              onChange={(selected) =>
                handleMultiSelectChange(
                  "professional_development_areas",
                  selected
                )
              }
              error={errors.professional_development_areas}
              isDisabled={edit}
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default JobSearch;
