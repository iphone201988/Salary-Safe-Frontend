import {
    benefitsOptions,
  salaryTypeOptions,
} from "../../../pages/Candidate/Auth/Employee/SignUp/options";
// import { CandidateProfileType } from "../../../types";
import InputField from "../../InputField/InputField";
import MultiSelectComponent from "../../MultiSelect/MultiSelect";

const SalaryExpection = ({
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
  return (
    <fieldset className="border border-black p-4 rounded-md">
      <legend>Salary Expectations</legend>
      <div className="flex flex-col">
        <div className="flex w-full space-x-2">
          <div className="w-full">
            <InputField
              label="General Salary Range"
              name="general_salary_range"
              // placeholder="Manager"
              value={formData.general_salary_range}
              onChange={handleChange}
              error={errors.general_salary_range}
              view={edit}
            />
          </div>

          <div className="w-full">
            <MultiSelectComponent
              isMulti={false}
              label="Preferred Salary Type"
              value={formData.preferred_salary_type}
              options={salaryTypeOptions}
              onChange={(selected) =>
                handleMultiSelectChange("preferred_salary_type", selected)
              }
              error={errors.preferred_salary_type}
              isDisabled={edit}
            />
          </div>
        </div>

        <div className="flex mt-2 w-full space-x-2">
          <div className="flex w-full space-x-2">
            <div className="w-full">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.open_to_performance_based_compensation}
                  onChange={() =>
                    handleCheckboxChange(
                      "open_to_performance_based_compensation"
                    )
                  }
                  disabled={edit}
                  className="h-4 w-4"
                />
                <span>Open to Performance-Based Compensation</span>
              </label>
              {errors.open_to_performance_based_compensation && (
                <p className="text-red-500 text-xs">
                  {errors.open_to_performance_based_compensation}
                </p>
              )}
            </div>

            <div className="w-full">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.willing_to_negociate}
                  onChange={() => handleCheckboxChange("willing_to_negociate")}
                  disabled={edit}
                  className="h-4 w-4"
                />
                <span>Willing to Negotiate</span>
              </label>
              {errors.willing_to_negociate && (
                <p className="text-red-500 text-xs">
                  {errors.willing_to_negociate}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-full space-x-2 mt-3">
        <div className="w-full">
            <InputField
              label="Minimum Acceptable Salary"
              name="minimum_acceptable_salary"
              // placeholder="Manager"
              value={formData.minimum_acceptable_salary}
              onChange={handleChange}
              error={errors.minimum_acceptable_salary}
              view={edit}
            />
          </div>

          <div className="w-full">
            <MultiSelectComponent
              isMulti={false}
              label="Preferred Benefits"
              value={formData.preferred_benefits}
              options={benefitsOptions}
              onChange={(selected) =>
                handleMultiSelectChange("preferred_benefits", selected)
              }
              error={errors.preferred_benefits}
              isDisabled={edit}
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default SalaryExpection;
