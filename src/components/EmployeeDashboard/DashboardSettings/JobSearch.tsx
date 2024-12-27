import { useEffect, useState } from "react";
import {
  /* jobTypePreferencesOptions, */
  professionalDevelopmentAreasOptions,
} from "../../../pages/Candidate/Auth/Employee/SignUp/options";
import { setemployeDetails } from "../../../Redux/reducer/userData";
import InputField from "../../InputField/InputField";
import MultiSelectComponent from "../../MultiSelect/MultiSelect";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { jobTypeOptions } from "../../Select/options";

const JobSearch = ({
  formData,
  setFormData,
  handleChange,
  errors,
  edit,
}: any) => {
  const dispatch = useDispatch();
  const { employeDetails } = useSelector((state: any) => state.user);
  const [industry, setIndustry] = useState<any>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<any>(employeDetails?.industries_of_interest);


  const handleMultiSelectChange = (field: string, selectedOptions: any) => {
    setFormData({ ...formData, [field]: selectedOptions });
  };

  const handleCheckboxChange = (field: string) => {
    setFormData({ ...formData, [field]: !formData[field] });
  };

  console.log(
    "interested_in_salary_benchmarks",
    formData?.interested_in_salary_benchmarks
  );

  const handleRemoveLocation = (industry: any) => {
      setSelectedIndustry(
        selectedIndustry.filter((item: any) => item !== industry)
      );
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

  useEffect(() => {
      if (industry === "") {
        setOptions([]);
      }
    }, [industry]);
  
    useEffect(() => {
      console.log('selectedIndustry before dispatch:', selectedIndustry);
      if (selectedIndustry.length) {
        dispatch(
          setemployeDetails({
            ...employeDetails,
            industries_of_interest: selectedIndustry,
          })
        );
      }
    }, [selectedIndustry]);


    console.log("++++++++++++++++",edit);
    

  return (
    <fieldset className="border border-black p-4 rounded-md">
      <legend>Job Search Preferences</legend>
      <div className="flex flex-col">
        <div className="flex w-full space-x-2">
          <div className="w-full">
            {/* <MultiSelectComponent
              isMulti={false}
              label="Industries of Interest"
              value={formData.industries_of_interest}
              options={industriesOfInterestOptional}
              onChange={(selected) =>
                handleMultiSelectChange("industries_of_interest", selected)
              }
              error={errors.industries_of_interest}
              isDisabled={edit}
            /> */}
            <div className="location-search bg-white ">
              <div className="text-[16px] mt-1 font-[400]">
                Industry of interest :
              </div>
              <div className="selected-locations flex flex-wrap gap-2 mb-2">
                {
                  edit === false && (
                    <input
                      type="text"
                      placeholder="search industry"
                      value={industry}
                      onChange={handleSearch}
                      className="border w-full rounded-[8px] outline-none border-gray-600 text-[14px] px-2 py-1"
                    />
                  )
                }

                {selectedIndustry.map((location: any) => (
                  <div
                    key={location.id}
                    className="flex items-center text-[10px] bg-gray-300 text-black px-2 py-1 rounded"
                  >
                    {location}
                    {
                      edit === false && (
                    <button 
                      onClick={() => handleRemoveLocation(location)}
                      className="ml-2 text-red-500"
                    >
                      &times;
                    </button>
                      )
                    }
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
                    onClick={() =>{

                      setSelectedIndustry([...selectedIndustry, data.industry]);
                      setIndustry("");
                    }
                    }
                    key={data.id}
                    className="p-2 cursor-pointer list-none hover:bg-gray-200"
                  >
                    {data.industry}
                  </li>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full">
            <MultiSelectComponent
              isMulti={true}
              label="Job type preferences"
              value={formData.job_type_preferences}
              options={jobTypeOptions}
              onChange={(selected) =>
                handleMultiSelectChange("job_type_preferences", selected)
              }
              error={errors.job_type_preferences}
              isDisabled={edit}
            />
          </div>

          <div className="w-full mt-8">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.actively_looking_for_new_job}
                onChange={() =>
                  handleCheckboxChange("actively_looking_for_new_job")
                }
                disabled={edit}
                className="h-4 w-4"
              />
              <span>Are you actively looking for a new job?</span>
            </label>
            {errors.actively_looking_for_new_job && (
              <p className="text-red-500 text-xs">
                {errors.actively_looking_for_new_job}
              </p>
            )}
          </div>
        </div>

        <div className="flex w-full space-x-2">
          <div className="w-full">
            <InputField
              label="Career Goals"
              name="career_goals"
              placeholder="Career Goals"
              value={formData.career_goals}
              onChange={handleChange}
              error={errors.career_goals}
              view={edit}
            />
          </div>

          <div className="w-full">
            <MultiSelectComponent
              isMulti={true}
              label="Professional development areas"
              value={formData.professional_development_areas}
              options={professionalDevelopmentAreasOptions}
              onChange={(selected) =>
                handleMultiSelectChange(
                  "professional_development_areas",
                  selected
                )
              }
              error={errors.professional_development_areas}
              isDisabled={edit}
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default JobSearch;
