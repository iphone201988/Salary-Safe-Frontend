// import { CandidateProfileType } from "../../../types";
import InputField from "../../InputField/InputField";

const CandidateProfile = ({
  formData,
  // setFormData,
  errors,
  handleChange,
  edit
}: any) => {
  return (
    <fieldset className="border border-black p-4 rounded-md">
      <legend>Personal Information</legend>
      <div className="flex flex-col">
        <div className="flex w-full space-x-2">
          <div className="w-full">
            <InputField
              label="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              error={errors.full_name}
              placeholder="Enter Full Name"
              view ={edit}

            />
          </div>
          <div className="w-full">
            <InputField
              label="Phone"
              name="phone_number"
              value={formData.phone_number}
              placeholder="+1 123 456 7890"
              onChange={handleChange}
              error={errors.phone_number}
              view ={edit}

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

export default CandidateProfile;
