import { useNavigate } from "react-router-dom";
import {
  benefitsOptions,
  salaryTypeOptions,
  viewSalaryPermissionOptions,
} from "../../Candidate/Auth/Employee/SignUp/options";
import Button from "../../Register/Button/Button";
import Input from "../../Register/Input/Input";
import MultiSelectComponent from "../MultiSelect/Multi";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setemployeDetails } from "../../../Redux/reducer/userData";
import * as Yup from "yup";
import { useState } from "react";

const ABoutSalary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<any>({});

  const token = useSelector((state: any) => state.auth.token);
  const { employeDetails } = useSelector((state: any) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      setemployeDetails({
        ...employeDetails,
        [name]: type === "checkbox" ? checked : value,
      })
    );
  };

  const salaryValidationSchema = Yup.object({
    general_salary_range: Yup.string().required("Salary Range is required"),
    minimum_acceptable_salary: Yup.number().required(
      "Minimum acceptable salary is required"
    ),
    preferred_benefits: Yup.array()
      .min(1, "At least one preferred benefit is required")
      .required("Preferred benefits are required"),
    view_salary_expectations: Yup.string().required(
      "Salary expectation is required"
    ),
    preferred_salary_type: Yup.string()
      .required("Please select your preferred salary type.")
      .oneOf(
        ["Hourly", "Monthly"],
        "Invalid salary type. Choose from 'Hourly', 'Monthly'."
      ),
  });

  const handleMultiSelectChange = (field: string, selectedOptions: any) => {
    dispatch(
      setemployeDetails({ ...employeDetails, [field]: selectedOptions })
    );
  };

  const handleSubmit = async () => {
    try {
      await salaryValidationSchema.validate(
        {
          general_salary_range: employeDetails?.general_salary_range,
          minimum_acceptable_salary: employeDetails?.minimum_acceptable_salary,
          preferred_benefits:
            employeDetails?.preferred_benefits?.map(
              (data: any) => data?.value
            ) || [],
          view_salary_expectations:
            employeDetails?.view_salary_expectations?.value || "",
          preferred_salary_type:
            employeDetails?.preferred_salary_type?.value || "",
        },
        { abortEarly: false }
      );

      // Create formData to send to the backend
      const formData = new FormData();
      formData.append(
        "general_salary_range",
        employeDetails?.general_salary_range || ""
      );
      formData.append(
        "minimum_acceptable_salary",
        employeDetails?.minimum_acceptable_salary || ""
      );
      formData.append(
        "preferred_benefits",
        JSON.stringify(
          employeDetails?.preferred_benefits?.map((data: any) => data?.value) ||
            []
        )
      );
      formData.append(
        "view_salary_expectations",
        employeDetails?.view_salary_expectations?.value || ""
      );
      formData.append(
        "open_to_performance_based_compensation",
        employeDetails?.open_to_performance_based_compensation || false
      );
      formData.append(
        "willing_to_negociate",
        employeDetails?.willing_to_negociate || false
      );
      formData.append(
        "hide_profile_from_current_employer",
        employeDetails?.hide_profile_from_current_employer || false
      );
      formData.append(
        "preferred_salary_type",
        employeDetails?.preferred_salary_type?.value || ""
      );

      // Submit the form data using axios
      await axios.patch(
        "https://salarysafe.ai/api/v1/candidates/me",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/profile/job-search");
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: any = {};
        error.inner.forEach((err: any) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
        console.log("error", error);
      } else {
        console.error("Error submitting form:", error);
      }
    }
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
        onClick={() => navigate("/profile/job-search")}
      /> */}

      <div className="w-full lg:w-[350px] flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center h-full mb-6 lg:mb-0 rounded-lg">
          <img
            src={"/logo.png"}
            alt="Company Logo"
            className="w-full h-20 object-cover rounded-md mb-4"
          />
        </div>
        <div className="mb-2 mt-0 text-xl font-bold leading-tight text-black text-center lg:text-left">
          Salary Expectations
        </div>

        <div className="flex gap-4">
          <div>
            <div className="w-full">
              <Input
                label="General Salary Range:"
                placeholder="Enter salary range here"
                name="general_salary_range"
                value={employeDetails?.general_salary_range}
                onChange={handleChange}
                errorMessage={errors?.general_salary_range}
              />
              <MultiSelectComponent
                isMulti={false}
                label="Preferred Salary Type:"
                options={salaryTypeOptions}
                value={employeDetails?.preferred_salary_type}
                onChange={(selected) =>
                  handleMultiSelectChange("preferred_salary_type", selected)
                }
                error={errors?.preferred_salary_type}
              />
            </div>

            <div className="w-full flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="open_to_performance_based_compensation"
                name="open_to_performance_based_compensation"
                checked={employeDetails?.open_to_performance_based_compensation}
                onChange={handleChange}
              />
              <label htmlFor="open_to_performance_based_compensation">
                Open to performance-based compensation?
              </label>
            </div>
            <div className="w-full flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="willing_to_negociate"
                name="willing_to_negociate"
                checked={employeDetails?.willing_to_negociate}
                onChange={handleChange}
              />
              <label htmlFor="willing_to_negociate">
                Willing to Negotiate?
              </label>
            </div>
          </div>

          <div className="w-[320px]">
            <Input
              label="Minimum Acceptable Salary:"
              placeholder="Enter minium salary here"
              type="number"
              name="minimum_acceptable_salary"
              value={employeDetails?.minimum_acceptable_salary}
              onChange={handleChange}
              errorMessage={errors?.minimum_acceptable_salary}
            />

            <MultiSelectComponent
              isMulti={true}
              label="Preferred Benefits:"
              options={benefitsOptions}
              value={employeDetails?.preferred_benefits}
              onChange={(selected) =>
                handleMultiSelectChange("preferred_benefits", selected)
              }
              error={errors?.preferred_benefits}
            />
            <MultiSelectComponent
              isMulti={false}
              label="Who can view your salary expectations?"
              options={viewSalaryPermissionOptions}
              value={employeDetails?.view_salary_expectations}
              onChange={(selected) =>
                handleMultiSelectChange("view_salary_expectations", selected)
              }
              error={errors?.view_salary_expectations}
            />
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="hide_profile_from_current_employer"
                name="hide_profile_from_current_employer"
                checked={employeDetails?.hide_profile_from_current_employer}
                onChange={handleChange}
              />
              <label htmlFor="hide_profile_from_current_employer">
                Hide my profile from current employer(s)
              </label>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <Button
            text="Back"
            type="button"
            color="green"
            size="md"
            className="mt-4 text-center bg-[#ef4444]"
            onClick={() => navigate("/profile/add-skill")}
          />

          <Button
            text="Submit"
            type="button"
            color="green"
            size="md"
            onClick={handleSubmit}
            className="mt-4 text-center bg-[#fcd34d]"
          />
        </div>
      </div>
    </div>
  );
};

export default ABoutSalary;
