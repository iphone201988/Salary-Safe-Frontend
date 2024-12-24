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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setemployeerDetails } from "../../../Redux/reducer/userData";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import { validateForm } from "../../../Schema/Schemas";

const Customization = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employeerDetails } = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.auth.token);
  const [errors, setErrors] = useState<any>({});

  const customizationsValidationSchema = Yup.object({
    dashboard_metrics: Yup.string().required("Dashboard metrics is required"),
    role_specific_customization: Yup.string().required(
      "Dashboard metrics is required"
    ),
    salary_benchmarking_preference: Yup.string().required(
      "Salary benchmark preference is required"
    ),
    candidate_feedback_analysis: Yup.string().required(
      "Candidate feedback analysis is required"
    ),
    candidate_viewing_preferences: Yup.string().required(
      "Candidate viewing preference is required"
    ),
    enable_real_time_market_alerts: Yup.string().required(
      "Market alerts is required"
    ),
    offer_optimization: Yup.string().required("Offer is required"),
    enable_custom_reporting: Yup.string().required(
      "Custom reporting is required"
    ),
    automated_updates: Yup.string().required("Automated updates are required"),
  });

  const handleMultiSelectChange = (field: string, selectedOptions: any) => {
    dispatch(
      setemployeerDetails({ ...employeerDetails, [field]: selectedOptions })
    );
  };
  const handleSubmit = async () => {
    const formattedErrors = await validateForm(customizationsValidationSchema, {
      dashboard_metrics: employeerDetails?.dashboard_metrics?.value,
      role_specific_customization:
        employeerDetails?.role_specific_customization?.value,
      salary_benchmarking_preference:
        employeerDetails?.salary_benchmarking_preference?.value,
      candidate_feedback_analysis:
        employeerDetails?.candidate_feedback_analysis?.value,
      candidate_viewing_preferences:
        employeerDetails?.candidate_viewing_preferences?.value,
      enable_real_time_market_alerts:
        employeerDetails?.enable_real_time_market_alerts?.value,
      offer_optimization: employeerDetails?.offer_optimization?.value,
      enable_custom_reporting: employeerDetails?.enable_custom_reporting?.value,
      automated_updates: employeerDetails?.automated_updates?.value,
    });
    if (formattedErrors) {
      setErrors(formattedErrors);
      return;
    }
    const formData = new FormData();
    formData.append(
      "dashboard_metrics",
      employeerDetails?.dashboard_metrics?.value || ""
    );
    formData.append(
      "role_specific_customization",
      employeerDetails?.role_specific_customization?.value || ""
    );
    formData.append(
      "salary_benchmarking_preference",
      employeerDetails?.salary_benchmarking_preference?.value || ""
    );
    formData.append(
      "candidate_feedback_analysis",
      employeerDetails?.candidate_feedback_analysis?.value || ""
    );
    formData.append(
      "candidate_viewing_preferences",
      employeerDetails?.candidate_viewing_preferences?.value || ""
    );
    formData.append(
      "enable_real_time_market_alerts",
      employeerDetails?.enable_real_time_market_alerts?.value || false
    );
    formData.append(
      "offer_optimization",
      employeerDetails?.offer_optimization?.value || ""
    );
    formData.append(
      "enable_custom_reporting",
      employeerDetails?.enable_custom_reporting?.value || ""
    );
    formData.append(
      "automated_updates",
      employeerDetails?.automated_updates?.value || ""
    );

    await axios
      .patch("https://salarysafe.ai/api/v1/clients/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/profile/company-additional-detail");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-[750px] relative border border-gray-400 px-4 py-8 rounded-[20px] flex flex-col lg:flex-row justify-center items-center bg-[#ffffff]">
      
      {/* <Button
        text="Skip"
        type="button"
        color="green"
        textColor="white"
        size="md"
        className="mt-4 text-center bg-black absolute right-3 top-0"
        onClick={() => navigate("/profile/company-additional-detail")}
      /> */}

      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center h-full mb-6 lg:mb-0 rounded-lg">
          <img
            src={"/logo.png"}
            alt="Company Logo"
            className="w-full h-20 object-cover rounded-md mb-4"
          />
        </div>
        <div className="mb-2 mt-0 text-xl font-bold leading-tight text-black text-center lg:text-left">
          Dashboard Customization And Job Posting Preferences
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <MultiSelectComponent
              isMulti={false}
              label="Select Key Metrics and Widgets:"
              options={Key_Metrics}
              width="w-[300px]"
              onChange={(selected) =>
                handleMultiSelectChange("dashboard_metrics", selected)
              }
              value={employeerDetails?.dashboard_metrics}
              error={errors?.dashboard_metrics}
            />

            <MultiSelectComponent
              isMulti={false}
              label="Role-Specific Customization:"
              options={Role_Specific}
              width="w-[300px]"
              onChange={(selected) =>
                handleMultiSelectChange("role_specific_customization", selected)
              }
              value={employeerDetails?.role_specific_customization}
              error={errors?.role_specific_customization}
            />
            <MultiSelectComponent
              isMulti={false}
              label="Salary Benchmarking Preferences:"
              options={SalaryBenchmarkingOptions}
              width="w-[300px]"
              onChange={(selected) =>
                handleMultiSelectChange(
                  "salary_benchmarking_preference",
                  selected
                )
              }
              value={employeerDetails?.salary_benchmarking_preference}
              error={errors?.salary_benchmarking_preference}
            />

            <MultiSelectComponent
              isMulti={false}
              label="Candidate Feedback Insights:"
              options={CandidateFeedbackInsightsOptions}
              width="w-[300px]"
              onChange={(selected) =>
                handleMultiSelectChange("candidate_feedback_analysis", selected)
              }
              value={employeerDetails?.candidate_feedback_analysis}
              error={errors?.candidate_feedback_analysis}
            />

            <MultiSelectComponent
              isMulti={false}
              label="Candidate Viewing Preferences:"
              options={pool}
              width="w-[300px]"
              onChange={(selected) =>
                handleMultiSelectChange(
                  "candidate_viewing_preferences",
                  selected
                )
              }
              value={employeerDetails?.candidate_viewing_preferences}
              error={errors?.candidate_viewing_preferences}
            />
          </div>

          <div className="w-[320px]">
            <MultiSelectComponent
              isMulti={false}
              label="Offer Optimization:"
              options={offer}
              width="w-[300px]"
              onChange={(selected) =>
                handleMultiSelectChange("offer_optimization", selected)
              }
              value={employeerDetails?.offer_optimization}
              error={errors?.offer_optimization}
            />

            <MultiSelectComponent
              isMulti={false}
              label="Market and Role Alerts:"
              options={MarketAndRoleAlertsOptions}
              width="w-[300px]"
              onChange={(selected) =>
                handleMultiSelectChange(
                  "enable_real_time_market_alerts",
                  selected
                )
              }
              value={employeerDetails?.enable_real_time_market_alerts}
              error={errors?.enable_real_time_market_alerts}
            />
            <MultiSelectComponent
              isMulti={false}
              label="Custom Reports:"
              options={CustomReportsOptions}
              width="w-[300px]"
              onChange={(selected) =>
                handleMultiSelectChange("enable_custom_reporting", selected)
              }
              value={employeerDetails?.enable_custom_reporting}
              error={errors?.enable_custom_reporting}
            />

            <MultiSelectComponent
              isMulti={false}
              label="Automated Updates to Candidates:"
              options={AutomatedUpdatesOptions}
              width="w-[300px]"
              onChange={(selected) =>
                handleMultiSelectChange("automated_updates", selected)
              }
              value={employeerDetails?.automated_updates}
              error={errors?.automated_updates}
            />
          </div>
        </div>
        <div className=" w-[350px] flex justify-between">
          <Button
            text="Back"
            type="button"
            color="green"
            size="md"
            className="mt-4 text-center bg-[#ef4444]"
            onClick={() => navigate("/profile/hiring-goal")}
          />
          <Button
            text="Submit"
            type="button"
            color="green"
            size="md"
            className="mt-4 text-center bg-[#fcd34d]"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Customization;
