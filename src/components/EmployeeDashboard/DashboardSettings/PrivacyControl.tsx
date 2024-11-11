import {
  viewSalaryPermissionOptions,
} from "../../../pages/Candidate/Auth/Employee/SignUp/options";
// import { CandidateProfileType } from "../../../types";
import MultiSelectComponent from "../../MultiSelect/MultiSelect";

const PrivacyControl = ({
  formData,
  setFormData,
  errors,
  edit,
}: any) => {
  const handleMultiSelectChange = (field: string, selectedOptions: any) => {
    setFormData({ ...formData, [field]: selectedOptions });
  };


   const handleCheckboxChange = (field: string) => {
    setFormData({ ...formData, [field]: !formData[field] });
  };

  return (
    <fieldset className="border border-black p-4 rounded-md">
      <legend>Privacy Control</legend>
      <div className="flex flex-col">
        <div className="flex w-full space-x-2">
          
          <div className="w-full">
            <MultiSelectComponent
              isMulti={false}
              label="Who can view your salary expectations?"
              value={formData.view_salary_expectations}
              options={viewSalaryPermissionOptions}
              onChange={(selected) =>
                handleMultiSelectChange("view_salary_expectations", selected)
              }
              error={errors.view_salary_expectations}
              isDisabled={edit}
            />
          </div>

          <div className="w-full mt-8">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.hide_profile_from_current_employer}
                  onChange={() =>
                    handleCheckboxChange(
                      "hide_profile_from_current_employer"
                    )
                  }
                  disabled={edit}
                  className="h-4 w-4"
                />
                <span>Hide profile from current employer</span>
              </label>
              {errors.open_to_performance_based_compensation && (
                <p className="text-red-500 text-xs">
                  {errors.open_to_performance_based_compensation}
                </p>
              )}
            </div>
        </div>

       

      </div>
    </fieldset>
  );
};

export default PrivacyControl;
