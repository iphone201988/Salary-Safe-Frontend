import { useNavigate } from "react-router-dom";
import Button from "../../Register/Button/Button";
import Input from "../../Register/Input/Input";
import MultiSelectComponent from "../MultiSelect/Multi";
import {
  industriesOfInterestOptional,
  jobTypePreferencesOptions,
  professionalDevelopmentAreasOptions,
} from "../../Candidate/Auth/Employee/SignUp/options";
import { useSelector, useDispatch } from "react-redux";
import { setemployeDetails } from "../../../Redux/reducer/userData";
import axios from "axios";

const JobSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employeDetails } = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.auth.token);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      setemployeDetails({
        ...employeDetails,
        [name]: type === "checkbox" ? checked : value,
      })
    );
  };

  const handleMultiSelectChange = (field: string, selectedOptions: any) => {
    dispatch(
      setemployeDetails({ ...employeDetails, [field]: selectedOptions })
    );
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // employeDetails?.industries_of_interest?.forEach(
    //   (data: any, index: number) => {
    //     formData.append(`industries_of_interest[${index}]`, data?.value || "");
    //   }
    // );

  
    formData.append(`industries_of_interest`,JSON.stringify(
      employeDetails?.industries_of_interest?.map((data: any) => {
        return data?.value;
      })
    ));

    // employeDetails?.job_type_preferences?.forEach(
    //   (data: any, index: number) => {
    //     formData.append(`job_type_preferences[${index}]`, data?.value || "");
    //   }
    // );

    formData.append(`job_type_preferences`,JSON.stringify(
      employeDetails?.job_type_preferences?.map((data: any) => {
        return data?.value;
      })
    ));

    // employeDetails?.professional_development_areas?.forEach(
    //   (data: any, index: number) => {
    //     formData.append(
    //       `professional_development_areas[${index}]`,
    //       data?.value || ""
    //     );
    //   }
    // );

    formData.append(`professional_development_areas`,JSON.stringify(
      employeDetails?.professional_development_areas?.map((data: any) => {
        return data?.value;
      })
    ));

    formData.append(
      "actively_looking_for_new_job",
      employeDetails?.actively_looking_for_new_job || ""
    );
    formData.append("career_goals", employeDetails?.career_goals || "");
    formData.append(
      "role_specific_salary_adjustments",
      employeDetails?.role_specific_salary_adjustments || ""
    );
    formData.append(
      "salaryInsightsInterest",
      employeDetails?.salaryInsightsInterest || ""
    );
    try {
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
      navigate("/profile/additional-detail");
    } catch (error) {
      console.error("Error updating candidate details:", error);
    }
  };
  return (
    <div className="w-[750px] relative border border-gray-400 px-4 py-8 rounded-[20px] flex flex-col lg:flex-row justify-center items-center bg-[#ffffff]">
      <Button
        text="Skip"
        type="button"
        color="green"
        textColor="white"
        size="md"
        className="mt-4 text-center bg-black absolute right-3 top-0"
        onClick={() => navigate("/profile/additional-detail")}
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
          Job Search Preferences
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <MultiSelectComponent
              isMulti={true}
              label="Industries of Interest:"
              options={industriesOfInterestOptional}
              value={employeDetails?.industries_of_interest}
              onChange={(selected) =>
                handleMultiSelectChange("industries_of_interest", selected)
              }
            />
            <MultiSelectComponent
              isMulti={true}
              label="Job Type Preferences:"
              options={jobTypePreferencesOptions}
              value={employeDetails?.job_type_preferences}
              onChange={(selected) =>
                handleMultiSelectChange("job_type_preferences", selected)
              }
            />
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="actively_looking_for_new_job"
                name="actively_looking_for_new_job"
                checked={employeDetails?.actively_looking_for_new_job}
                onChange={handleChange}
              />
              <label htmlFor="actively_looking_for_new_job">
                Are you actively looking for a new job?
              </label>
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="interested_in_salary_benchmarks"
                name="interested_in_salary_benchmarks"
                checked={employeDetails?.interested_in_salary_benchmarks}
                onChange={handleChange}
              />
              <label htmlFor="salaryInsightsInterest">
                Interested in salary benchmarks and market insights?
              </label>
            </div>
          </div>

          <div className="w-[320px]">
            <Input
              label="Career Goals:"
              name="career_goals"
              placeholder="enter career goal here"
              type="text"
              value={employeDetails?.career_goals}
              onChange={handleChange}
            />

            <MultiSelectComponent
              isMulti={true}
              label="Professional Development Areas:"
              options={professionalDevelopmentAreasOptions}
              value={employeDetails?.professional_development_areas}
              onChange={(selected) =>
                handleMultiSelectChange(
                  "professional_development_areas",
                  selected
                )
              }
            />
            <Input
              label="Role-Specific Salary Adjustments"
              name="role_specific_salary_adjustments"
              placeholder="Enter Role-Specific Salary Adjustments"
              value={employeDetails?.role_specific_salary_adjustments}
              onChange={handleChange}
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
            onClick={() => navigate("/profile/about-salary")}
          />
          <Button
            onClick={handleSubmit}
            text="Submit"
            type="button"
            color="green"
            size="md"
            className="mt-4 text-center bg-[#fcd34d]"
          />
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
