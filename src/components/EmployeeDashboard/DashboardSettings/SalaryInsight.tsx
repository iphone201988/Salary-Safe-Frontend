// import { CandidateProfileType } from "../../../types";
import InputField from "../../InputField/InputField";

const SalaryInsight = ({
  formData,
  setFormData,
  handleChange,
  errors,
  edit,
}: any) => {
  const handleCheckboxChange = (field: any) => {
    setFormData({ ...formData, [field]: !formData[field] });
  };

  return (
    <fieldset className="border border-black p-4 rounded-md">
      <legend>Job Search Preferences</legend>
      <div className="flex flex-col">
        <div className="flex w-full space-x-2">
          <div className="w-full">
            <InputField
              label="Role-Specific Salary Adjustments"
              name="role_specific_salary_adjustments"
              placeholder="Role-Specific"
              value={formData.role_specific_salary_adjustments}
              onChange={handleChange}
              error={errors.role_specific_salary_adjustments}
              view={edit}
            />
          </div>

          <div className="w-full mt-8">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.interested_in_salary_benchmarks}
                onChange={() =>
                  handleCheckboxChange("interested_in_salary_benchmarks")
                }
                disabled={edit}
                className="h-4 w-4"
              />
              <span>Interested in salary benchmarks and market insights?</span>
            </label>
            {errors.interested_in_salary_benchmarks && (
              <p className="text-red-500 text-xs">
                {errors.interested_in_salary_benchmarks}
              </p>
            )}
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default SalaryInsight;
