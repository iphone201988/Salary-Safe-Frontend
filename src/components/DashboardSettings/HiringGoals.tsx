import {
  jobtypesOptions,
  Key_Metrics,
  options,
  Positions_of_Interest,
  Preferred_Job_Locations,
} from "../../../pages/Employer/Auth/SignUp/options";
import { CompanyProfileType } from "../../../types";
import MultiSelectComponent from "../../MultiSelect/MultiSelect";

const HiringGoals = ({ formData, setFormData, errors }: CompanyProfileType) => {
  const handleMultiSelectChange = (field: string, selectedOptions: any) => {
    setFormData({ ...formData, [field]: selectedOptions });
  };
  return (
    <>
      <fieldset className="border border-black p-4 rounded-md">
        <legend>Hiring Goals and Preferences</legend>

        <div className="flex w-full space-x-2">
          <MultiSelectComponent
            isMulti={true}
            label="Primary Hiring Goals"
            options={options}
            onChange={(selected) =>
              handleMultiSelectChange("primaryHiringGoals", selected)
            }
            value={formData.primaryHiringGoals}
            error={errors.primaryHiringGoals}
          />

          <MultiSelectComponent
            isMulti={true}
            label="Preferred Job Locations"
            options={Preferred_Job_Locations}
            onChange={(selected) =>
              handleMultiSelectChange("preferredJobLocations", selected)
            }
            value={formData.preferredJobLocations}
            error={errors.preferredJobLocations}
          />
        </div>

        <div className="flex w-full space-x-2">
          <MultiSelectComponent
            isMulti={true}
            label="Roles/Positions of Interest"
            options={Positions_of_Interest}
            onChange={(selected) =>
              handleMultiSelectChange("rolesPositions", selected)
            }
            value={formData.rolesPositions}
            error={errors.rolesPositions}
          />

          <MultiSelectComponent
            isMulti={true}
            label="Job Types"
            options={jobtypesOptions}
            onChange={(selected) =>
              handleMultiSelectChange("jobTypes", selected)
            }
            value={formData.jobTypes}
            error={errors.jobTypes}
          />
        </div>
      </fieldset>

      <fieldset className="border border-black p-4 rounded-md">
        <legend>Dashboard Customization</legend>
        <MultiSelectComponent
          isMulti={false}
          label="Select Key Metrics and Widgets"
          options={Key_Metrics}
          onChange={(selected) =>
            handleMultiSelectChange("keyMetrics", selected)
          }
          value={formData.keyMetrics}
          error={errors.keyMetrics}
        />
      </fieldset>
    </>
  );
};

export default HiringGoals;
