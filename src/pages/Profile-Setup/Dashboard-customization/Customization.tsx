import { useNavigate } from "react-router-dom";
import Button from "../../Register/Button/Button";
import MultiSelectComponent from "../MultiSelect/Multi";
import {
  AutomatedUpdatesOptions,
  CandidateFeedbackInsightsOptions,
  CustomReportsOptions,
  Key_Metrics,
  MarketAndRoleAlertsOptions,
  offer,
  pool,
  Role_Specific,
  SalaryBenchmarkingOptions,
} from "../../Employer/Auth/SignUp/options";

const Customization = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[750px] relative border border-gray-400 px-4 py-8 rounded-[20px] flex flex-col lg:flex-row justify-center items-center bg-[#ffffff]">
      <Button
        text="Skip"
        type="button"
        color="green"
        textColor="white"
        size="md"
        className="mt-4 text-center bg-black absolute right-3 top-0"
        onClick={() => navigate("/profile/company-additional-detail")}
      />

      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center h-full mb-6 lg:mb-0 rounded-lg">
          <img
            src={"/logo.png"}
            alt="Company Logo"
            className="w-full h-20 object-cover rounded-md mb-4"
          />
        </div>
        <div className="mb-2 mt-0 text-xl font-bold leading-tight text-black text-center lg:text-left">
          Dashboard Customization
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <MultiSelectComponent
              isMulti={false}
              label="Select Key Metrics and Widgets:"
              options={Key_Metrics}
              width="w-[300px]"
            />

            <MultiSelectComponent
              isMulti={false}
              label="Role-Specific Customization:"
              options={Role_Specific}
              width="w-[300px]"
            />
            <MultiSelectComponent
              isMulti={false}
              label="Salary Benchmarking Preferences:"
              options={SalaryBenchmarkingOptions}
              width="w-[300px]"
            />

            <MultiSelectComponent
              isMulti={false}
              label="Candidate Feedback Insights:"
              options={CandidateFeedbackInsightsOptions}
              width="w-[300px]"
            />

            <MultiSelectComponent
              isMulti={false}
              label="Candidate Viewing Preferences:"
              options={pool}
              width="w-[300px]"
            />
          </div>

          <div className="w-[320px]">
            <MultiSelectComponent
              isMulti={false}
              label="Offer Optimization:"
              options={offer}
              width="w-[300px]"
            />

            <MultiSelectComponent
              isMulti={false}
              label="Market and Role Alerts:"
              options={MarketAndRoleAlertsOptions}
              width="w-[300px]"
            />
            <MultiSelectComponent
              isMulti={false}
              label="Custom Reports:"
              options={CustomReportsOptions}
              width="w-[300px]"
            />

            <MultiSelectComponent
              isMulti={false}
              label="Automated Updates to Candidates:"
              options={AutomatedUpdatesOptions}
              width="w-[300px]"
            />
          </div>
        </div>
        <div className=" w-[350px] flex justify-between">
          <Button
            text="Back"
            type="button"
            color="green"
            textColor="white"
            size="md"
            className="mt-4 text-center bg-[#ef4444]"
            onClick={() => navigate("/profile/hiring-goal")}
          />
          <Button
            text="Submit"
            type="button"
            color="green"
            textColor="black"
            size="md"
            className="mt-4 text-center bg-[#fcd34d]"
          />
        </div>
      </div>
    </div>
  );
};

export default Customization;
