import { useSelector } from "react-redux";
import {
  educationLevelOptions,
  experienceOptions
} from "../../../pages/Candidate/Auth/Employee/SignUp/options";
import InputField from "../../InputField/InputField";
import MultiSelectComponent from "../../MultiSelect/MultiSelect";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setemployeDetails } from "../../../Redux/reducer/userData";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";

const ProfileSetup = ({
  formData,
  setFormData,
  handleChange,
  errors,
  edit,
}: any) => {
  const handleMultiSelectChange = (field: string, selectedOptions: any) => {
    setFormData({ ...formData, [field]: selectedOptions });
  };

  const { employeDetails } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [skill, setSkill] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedProficiency, setSelectedProficiency] = useState<any>("");
  const [options, setOptions] = useState<any>([]);
  const [skillsList, setSkillsList] = useState<
    { name: string; proficiency: string }[]
  >(employeDetails?.key_skills);
  const [showAll, setShowAll] = useState(false);
  const displayedSkills = showAll ? skillsList : skillsList?.slice(0, 5);
  const value = ["1", "2", "3", "4", "5"];

  useEffect(() => {
    setSkillsList(employeDetails?.key_skills || []);
  }, [employeDetails?.key_skills]);

  useEffect(() => {
    dispatch(
      setemployeDetails({
        ...employeDetails,
        key_skills: skillsList,
      })
    );
  }, [skillsList]);

  const handleRemove = (data: any) => {
    if (skillsList?.length > 0) {
      setSkillsList(skillsList?.filter((skill) => skill.name !== data));
    }
  };

  const handleAddSkill = () => {
    if (
      selectedSkill.trim() !== "" &&
      selectedProficiency !== "" &&
      !skillsList?.some((s) => s.name === selectedSkill.trim())
    ) {
      setSkillsList([
        ...(skillsList || []),
        { name: selectedSkill.trim(), proficiency: selectedProficiency },
      ]);
      setSelectedSkill("");
      setSelectedProficiency("");
    }
  };

  const handleSearchSkill = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSkill(query);
    try {
      const response = await axios.get(
        "https://salarysafe.ai/api/v1/utils/skills/search",
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

  const handleRadioChange = (selected: any) => {
    setSelectedProficiency(selected);
  };

  console.log("options", options);
  useEffect(() => {
    if (skill === "") {
      setOptions([]);
    }
  }, [skill]);

  return (
    <fieldset className="border border-black p-4 rounded-md">
      <legend>Profile Setup</legend>
      <div className="flex flex-col">
        <div className="flex w-full space-x-2">
          <div className="w-full">
            <InputField
              label="Job Titles/Positions of Interest"
              name="job_titles_of_interest"
              placeholder="Manager"
              value={formData.job_titles_of_interest}
              onChange={handleChange}
              error={errors.job_titles_of_interest}
              view={edit}
            />
          </div>

          <div className="w-full">
            <MultiSelectComponent
              isMulti={false}
              label="Total Years of Experience:"
              value={formData.total_years_of_experience}
              options={experienceOptions}
              onChange={(selected) =>
                handleMultiSelectChange("total_years_of_experience", selected)
              }
              error={errors.total_years_of_experience}
              isDisabled={edit}
            />
          </div>
        </div>

        <div className="flex w-full space-x-2">
          <div className="w-full">
            <MultiSelectComponent
              isMulti={false}
              label="Education Level:"
              value={formData.education_level}
              options={educationLevelOptions}
              onChange={(selected) =>
                handleMultiSelectChange("education_level", selected)
              }
              error={errors.education_level}
              isDisabled={edit}
            />
          </div>

          <div className="w-full">
            {/* <MultiSelectComponent
              isMulti={false}
              label="Skills:"
              value={formData.key_skills}
              options={skillsOptions}
              onChange={(selected) =>
                handleMultiSelectChange("key_skills", selected)
              }
              error={errors.key_skills}
              isDisabled={edit}
            /> */}

            <div className="w-full mt-5">
              <label className="text-left text-gray-800 text-[16px] mt-5 font-normal">
                Skills:
              </label>
              {edit === false && (
                <>
                  <input
                    type="text"
                    value={skill}
                    onChange={handleSearchSkill}
                    placeholder="search skill here"
                    className="border rounded-[8px] outline-none border-gray-600 text-[14px] ml-3 px-2 py-1"
                  />

                  <div
                    className={`w-full ${
                      options?.length === 0 ? "hidden" : "h-[100px]"
                    } overflow-y-auto border rounded-md p-2 mt-3`}
                  >
                    {options.map((skillName: any, index: any) => (
                      <li
                        key={`skill-option-${index}`}
                        onClick={() => {
                          setSelectedSkill(skillName);
                        }}
                        className={`p-2 cursor-pointer rounded-lg list-none ${
                          selectedSkill == skillName ? "bg-amber-200" : ""
                        }`}
                      >
                        {skillName}
                      </li>
                    ))}
                  </div>

                  <div className="w-full flex gap-2 m-2">
                    {value.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={selectedProficiency === item}
                          onChange={() => handleRadioChange(item)}
                          className="form-checkbox h-[20px] w-[20px] border-gray-400 rounded-[8px]"
                        />
                        <label className="text-[14px] text-gray-600">
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="w-full flex justify-center p-2">
                    <div
                      className="h-[30px] text-[12px] w-[70px] text-center border border-gray-400 rounded-[8px] flex justify-center items-center cursor-pointer"
                      onClick={handleAddSkill}
                    >
                      Add
                    </div>
                  </div>
                </>
              )}
              {
                <div
                  className={`w-full ${
                    displayedSkills.length === 0 ? "h-[20px]" : "h-fit"
                  } overflow-y-auto`}
                >
                  <ul className="flex flex-wrap gap-1">
                    {displayedSkills?.map((item, index) => (
                      <>
                        <li
                          key={index}
                          className="w-[100px] m-[2px] relative h-fit bg-gradient-to-r from-blue-100 to-gray-200 text-white rounded-lg p-2 shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
                        >
                          {edit === false && (
                            <div
                              onClick={() => handleRemove(item.name)}
                              className="absolute right-1 top-1 cursor-pointer w-[12px] h-[12px] bg-black flex justify-center items-center rounded-full"
                            >
                              <RxCross2 className="text-white" size={10} />
                              {/* <RxCross2 className="text-white" size={10} /> */}
                            </div>
                          )}
                          <div className="font-semibold text-[8px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            {item.name}
                          </div>
                          <div className="text-[9px] text-black">
                            Proficiency: {item.proficiency}
                          </div>
                        </li>
                      </>
                    ))}
                  </ul>
                  {skillsList?.length > 5 && (
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="mt-4 text-blue rounded-full bg-gradient-to-r from-white to-red-300 hover:from-pink-600 hover:to-red-600 py-2 px-4 transition-all duration-300"
                    >
                      {showAll ? "Show less" : "Show all"}
                    </button>
                  )}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default ProfileSetup;
