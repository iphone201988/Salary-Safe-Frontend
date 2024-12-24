import { useNavigate } from "react-router-dom";
import Button from "../../Register/Button/Button";
import Input from "../../Register/Input/Input";
import MultiSelectComponent from "../MultiSelect/Multi";
import {
  jobTypePreferencesOptions,
  professionalDevelopmentAreasOptions,
} from "../../Candidate/Auth/Employee/SignUp/options";
import { useSelector, useDispatch } from "react-redux";
import { setemployeDetails } from "../../../Redux/reducer/userData";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { validateForm } from "../../../Schema/Schemas";

const JobSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employeDetails } = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.auth.token);
  // const [options, setOptions] = useState<any>([]);
  const [industry, setIndustry] = useState<any>([]);
  const [options, setOptions] = useState<Location[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<any>([]);
  const [errors, setErrors] = useState<any>({});

  const jobSearchValidationSchema = Yup.object({
    industries_of_interest: Yup.string().required(
      "Job Titles of Interest is required"
    ),
    role_specific_salary_adjustments: Yup.string().required(
      "Role Specific Salary Adjustments is required"
    ),
    career_goals: Yup.string().required("Career goal is required"),
    professional_development_areas: Yup.array()
      .min(1, "At least one professional development area is required")
      .required("Professional Development Areas are required"),
    job_type_preferences: Yup.array()
      .min(1, "At least one job type preference is required")
      .required("Job Type Preferences are required"),
  });

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
    const formattedErrors = await validateForm(jobSearchValidationSchema, {
      industries_of_interest: employeDetails?.industries_of_interest,
      role_specific_salary_adjustments:
        employeDetails?.role_specific_salary_adjustments,
      career_goals: employeDetails?.career_goals,
      professional_development_areas:
        employeDetails?.professional_development_areas,
      job_type_preferences: employeDetails?.job_type_preferences,
    });
    console.log(formattedErrors);
    if (formattedErrors) {
      setErrors(formattedErrors);
      return;
    }

    const formData = new FormData();

    // employeDetails?.industries_of_interest?.forEach(
    //   (data: any, index: number) => {
    //     formData.append(`industries_of_interest[${index}]`, data?.value || "");
    //   }
    // );

    formData.append(
      `industries_of_interest`,
      JSON.stringify(
        employeDetails?.industries_of_interest?.map((data: any) => {
          return data?.value;
        })
      )
    );

    // employeDetails?.job_type_preferences?.forEach(
    //   (data: any, index: number) => {
    //     formData.append(`job_type_preferences[${index}]`, data?.value || "");
    //   }
    // );

    formData.append(
      `job_type_preferences`,
      JSON.stringify(
        employeDetails?.job_type_preferences?.map((data: any) => {
          return data?.value;
        })
      )
    );

    // employeDetails?.professional_development_areas?.forEach(
    //   (data: any, index: number) => {
    //     formData.append(
    //       `professional_development_areas[${index}]`,
    //       data?.value || ""
    //     );
    //   }
    // );

    formData.append(
      `professional_development_areas`,
      JSON.stringify(
        employeDetails?.professional_development_areas?.map((data: any) => {
          return data?.value;
        })
      )
    );

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
      console.log("error::::", error);
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

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setIndustry(query);
    try {
      const response = await axios.get(
        "https://salarysafe.ai/api/v1/utils/industries/search",
        {
          params: { query: query },
          headers: {
            "X-API-KEY":
              "47f38e90f9994df85c962cc384e728b137bcd722db2a96c79b94a6723606bf9d",
          },
        }
      );
      setOptions(response.data);
    } catch (error) {
      console.error("Error searching for skills:", error);
    }
  };

  console.log("options::::::", options);

  const handleRemoveLocation = (industry: any) => {
    setSelectedIndustry(
      selectedIndustry.filter((item: any) => item !== industry)
    );
  };

  useEffect(() => {
    if (industry === "") {
      setOptions([]);
    }
  }, [industry]);

  useEffect(() => {
    console.log("selectedIndustry before dispatch:", selectedIndustry);
    if (selectedIndustry.length) {
      dispatch(
        setemployeDetails({
          ...employeDetails,
          industries_of_interest: selectedIndustry,
        })
      );
    }
  }, [selectedIndustry]);

  return (
    <div className="w-[750px] relative border border-gray-400 px-4 py-8 rounded-[20px] flex flex-col lg:flex-row justify-center items-center bg-[#ffffff]">
      
      {/* <Button
        text="Skip"
        type="button"
        color="green"
        textColor="white"
        size="md"
        className="mt-4 text-center bg-black absolute right-3 top-0"
        onClick={() => navigate("/profile/additional-detail")}
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
          Job Search Preferences
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            {/* <MultiSelectComponent
              isMulti={true}
              label="Industries of Interest:"
              options={industriesOfInterestOptional}
              value={employeDetails?.industries_of_interest}
              onChange={(selected) =>
                handleMultiSelectChange("industries_of_interest", selected)
              }
            /> */}
            <div className="location-search bg-white ">
              <div className="text-[12px] mt-1 font-semibold">
                Industry of interest :
              </div>
              <div className="selected-locations flex flex-wrap gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Search Industry"
                  value={industry}
                  onChange={handleSearch}
                  className="border w-full rounded-[8px] outline-none border-gray-600 text-[14px] px-2 py-1"
                />
                {errors.industries_of_interest && (
                  <span className=" text-red-600 text-sm font-bold">
                    {errors.industries_of_interest}
                  </span>
                )}
                {selectedIndustry.map((location: any) => (
                  <div
                    key={location.id}
                    className="flex items-center text-black px-2 py-1 rounded"
                  >
                    {location}
                    <button
                      onClick={() => handleRemoveLocation(location)}
                      className="ml-2 text-red-500"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <div
                className={`w-full ${
                  options.length === 0 ? "hidden" : "h-[60px]"
                } overflow-y-auto`}
              >
                {options.map((data: any) => (
                  <li
                    onClick={() =>
                      setSelectedIndustry([...selectedIndustry, data.industry])
                    }
                    key={data.id}
                    className="p-2 cursor-pointer list-none hover:bg-gray-200"
                  >
                    {data.industry}
                  </li>
                ))}
              </div>
            </div>
            <MultiSelectComponent
              isMulti={true}
              label="Job Type Preferences:"
              options={jobTypePreferencesOptions}
              value={employeDetails?.job_type_preferences}
              onChange={(selected) =>
                handleMultiSelectChange("job_type_preferences", selected)
              }
              error={errors?.job_type_preferences}
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
              placeholder="Enter career goal here"
              type="text"
              value={employeDetails?.career_goals}
              onChange={handleChange}
              errorMessage={errors?.career_goals}
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
              error={errors?.professional_development_areas}
            />
            <Input
              label="Role-Specific Salary Adjustments"
              name="role_specific_salary_adjustments"
              placeholder="Enter Role-Specific Salary Adjustments"
              value={employeDetails?.role_specific_salary_adjustments}
              onChange={handleChange}
              errorMessage={errors?.role_specific_salary_adjustments}
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
