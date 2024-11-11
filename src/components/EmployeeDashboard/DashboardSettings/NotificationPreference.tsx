import {
  jobAlertsFrequencyOptions,
  notificationPreferencesOptions,
} from "../../../pages/Candidate/Auth/Employee/SignUp/options";
// import { CandidateProfileType } from "../../../types";
// import InputField from "../../InputField/InputField";
import MultiSelectComponent from "../../MultiSelect/MultiSelect";

const NotificationPreference = ({
  formData,
  setFormData,
  // handleChange,
  errors,
  edit,
}: any) => {
  const handleMultiSelectChange = (field: string, selectedOptions: any) => {
    setFormData({ ...formData, [field]: selectedOptions });
  };
  return (
    <fieldset className="border border-black p-4 rounded-md">
      <legend>Salary Expectations</legend>
      <div className="flex flex-col">
        <div className="flex w-full space-x-2">
          

          <div className="w-full">
            <MultiSelectComponent
              isMulti={true}
              label="Receive notifications via"
              value={formData.notificationPreferences}
              options={notificationPreferencesOptions}
              onChange={(selected) =>
                handleMultiSelectChange("preferred_salary_type", selected)
              }
              error={errors.notificationPreferences}
              isDisabled={edit}
            />
          </div>
          <div className="w-full">
            <MultiSelectComponent
              isMulti={true}
              label="Job alerts frequency"
              value={formData.job_alerts_frequency}
              options={jobAlertsFrequencyOptions}
              onChange={(selected) =>
                handleMultiSelectChange("job_alerts_frequency", selected)
              }
              error={errors.job_alerts_frequency}
              isDisabled={edit}
            />
          </div>
        </div>


      </div>
    </fieldset>
  );
};

export default NotificationPreference;
