import {
  jobtypesOptions,
  Key_Metrics,
  options,
  Positions_of_Interest,
  Preferred_Job_Locations,
} from "../../../pages/Employer/Auth/SignUp/options";
import { CompanyProfileType } from "../../../types";
// import { getMultiSelectValues } from "../../../utils/helper";
import MultiSelectComponent from "../../MultiSelect/MultiSelect";

const HiringGoals = ({
  formData,
  setFormData,
  errors,
  edit,
}: CompanyProfileType) => {
  const handleMultiSelectChange = (field: string, selectedOptions: any) => {
    console.log("selectedOptions:::", selectedOptions); 
    setFormData({ ...formData, [field]: selectedOptions });
  };
  console.log("hello2145241", formData.keyMetrics);
  return (
    <>
      <fieldset className="border border-black p-4 rounded-md">
        <legend>Hiring Goals and Preferences</legend>

        <div className="flex w-full space-x-2">
          <MultiSelectComponent
            isMulti={true}
            label="Primary Hiring Goals"
            options={options}
            onChange={(selected: any) => {
              handleMultiSelectChange("primaryHiringGoals", selected);
            }}
            value={formData.primaryHiringGoals}
            error={errors.primaryHiringGoals}
            isDisabled={edit}
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
            isDisabled={edit}
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
            isDisabled={edit}
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
            isDisabled={edit}
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
          isDisabled={edit}
        />
      </fieldset>
    </>
  );
};

export default HiringGoals;
