import {
  AutomatedUpdatesOptions,
  CandidateFeedbackInsightsOptions,
  CustomReportsOptions,
  MarketAndRoleAlertsOptions,
  pool,
  Role_Specific,
  SalaryBenchmarkingOptions,
} from "../../../pages/Employer/Auth/SignUp/options";
import { CompanyProfileType } from "../../../types";
import MultiSelectComponent from "../../MultiSelect/MultiSelect";

const OtherFields = ({ formData, errors, setFormData , edit }: CompanyProfileType) => {
  const handleMultiSelectChange = (field: string, selectedOptions: any) => {
    setFormData({ ...formData, [field]: selectedOptions });
  };
  return (
    <>
      <fieldset className="border border-black p-4 rounded-md">
        <legend>Job Posting Preferences</legend>

        <div className="flex w-full space-x-2">
          <MultiSelectComponent
            isMulti={false}
            label="Role-Specific Customization"
            options={Role_Specific}
            onChange={(selected) =>
              handleMultiSelectChange("roleCustomization", selected)
            }
            value={formData.roleCustomization}
            error={errors.roleCustomization}
            isDisabled={edit}
          />

          <MultiSelectComponent
            isMulti={false}
            label="Salary Benchmarking Preferences"
            options={SalaryBenchmarkingOptions}
            onChange={(selected) =>
              handleMultiSelectChange("salaryBenchmarking", selected)
            }
            value={formData.salaryBenchmarking}
            error={errors.salaryBenchmarking}
            isDisabled={edit}
          />
        </div>
      </fieldset>

      <fieldset className="border border-black p-4 rounded-md">
        <legend>Candidate Pool Access</legend>

        <div className="flex w-full space-x-2">
          <MultiSelectComponent
            isMulti={false}
            label="Candidate Viewing Preferences"
            options={pool}
            onChange={(selected) =>
              handleMultiSelectChange("candidateViewingPreferences", selected)
            }
            value={formData.candidateViewingPreferences}
            error={errors.candidateViewingPreferences}
            isDisabled={edit}
          />
        </div>
      </fieldset>

      <fieldset className="border border-black p-4 rounded-md">
        <legend>Reporting and Performance Tracking </legend>

        <div className="flex w-full space-x-2">
          <MultiSelectComponent
            isMulti={false}
            label="Market and Role Alerts"
            options={MarketAndRoleAlertsOptions}
            onChange={(selected) =>
              handleMultiSelectChange("marketRoleAlerts", selected)
            }
            value={formData.marketRoleAlerts}
            error={errors.marketRoleAlerts}
            isDisabled={edit}
          />

          <MultiSelectComponent
            isMulti={false}
            label="Custom Reports"
            options={CustomReportsOptions}
            onChange={(selected) =>
              handleMultiSelectChange("customReports", selected)
            }
            value={formData.customReports}
            error={errors.customReports}
            isDisabled={edit}
          />
        </div>
      </fieldset>

      <fieldset className="border border-black p-4 rounded-md">
        <legend>Communication and Candidate Engagement </legend>

        <div className="flex w-full space-x-2">
          <MultiSelectComponent
            isMulti={false}
            label="Automated Updates to Candidates"
            options={AutomatedUpdatesOptions}
            onChange={(selected) =>
              handleMultiSelectChange("automatedUpdates", selected)
            }
            value={formData.automatedUpdates}
            error={errors.automatedUpdates}
            isDisabled={edit}
          />

          <MultiSelectComponent
            isMulti={false}
            label="Candidate Feedback Insights"
            options={CandidateFeedbackInsightsOptions}
            onChange={(selected) =>
              handleMultiSelectChange("candidateFeedback", selected)
            }
            value={formData.candidateFeedback}
            error={errors.candidateFeedback}
            isDisabled={edit}
          />
        </div>
      </fieldset>
    </>
  );
};

export default OtherFields;
