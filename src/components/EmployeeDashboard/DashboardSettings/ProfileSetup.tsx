import { experienceOptions } from "../../../pages/Candidate/Auth/Employee/SignUp/options";
import { CandidateProfileType } from "../../../types";
import InputField from "../../InputField/InputField";
import MultiSelectComponent from "../../MultiSelect/MultiSelect";

const ProfileSetup = ({
  formData,
  setFormData,
  handleChange,
  errors,
  edit
}: CandidateProfileType) => {
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
          />
          </div>
        </div>
        <div className="flex w-full space-x-2">
          <div className="w-full">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="Enter Email"
              view ={edit}
            />
          </div>
          <div className="w-full">
            <InputField
              label="Location"
              name="location"
              placeholder="City, State/Region, Country"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
              view ={edit}

            />
          </div>
        </div>
        <div className="flex w-full space-x-2">
         
          <div className="w-full">
            <InputField
              label="Current Job Title"
              name="current_job_title"
              placeholder="baackend devolper"
              value={formData.current_job_title}
              onChange={handleChange}
              error={errors.current_job_title}
              view ={edit}
            />
          </div>
         
          <div className="w-full">
            <InputField
              label="LinkedIn Profile URL"
              name="linkedin_profile_url"
              placeholder="https://www.linkedin.com/in/techwin-labs-8b131b282/"
              value={formData.linkedin_profile_url}
              onChange={handleChange}
              error={errors.linkedin_profile_url}
              view ={edit}
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default ProfileSetup;
