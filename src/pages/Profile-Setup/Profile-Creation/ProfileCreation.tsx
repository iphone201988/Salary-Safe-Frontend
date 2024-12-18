import { useEffect, useState } from "react";
import {
  educationLevelOptions,
  experienceOptions,
} from "../../Candidate/Auth/Employee/SignUp/options";
import Button from "../../Register/Button/Button";
import Input from "../../Register/Input/Input";
import MultiSelectComponent from "../MultiSelect/Multi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setemployeDetails } from "../../../Redux/reducer/userData";
import { RxCross2 } from "react-icons/rx";

const ProfileCreation = () => {
  const navigate = useNavigate();
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
  const token = useSelector((state: any) => state.auth.token);

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

  const handleRadioChange = (selected: any) => {
    setSelectedProficiency(selected);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("key_skills", JSON.stringify(skillsList));
    formData.append(
      "total_years_of_experience",
      employeDetails?.total_years_of_experience?.value || ""
    );
    formData.append(
      "education_level",
      employeDetails?.education_level?.value || ""
    );
    formData.append(
      "job_titles_of_interest",
      employeDetails?.job_titles_of_interest || ""
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
      navigate("/profile/about-salary");
    } catch (error) {
      console.error("Error updating candidate details:", error);
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

  console.log("option:::::::::", options);

  return (
    <div className="w-[750px] relative border border-gray-400 px-4 py-8 rounded-[20px] flex flex-col lg:flex-row justify-center items-center bg-[#ffffff]">
      <Button
        text="Skip"
        type="button"
        color="green"
        textColor="white"
        size="md"
        className="mt-4 text-center bg-black absolute right-3 top-0"
        onClick={() => navigate("/profile/about-salary")}
      />

      <div className="w-full lg:w-[350px] flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center h-full mb-6 lg:mb-0 rounded-lg">
          <img
            src={"/logo.png"}
            alt="Company Logo"
            className="w-full h-20 object-cover rounded-md mb-4"
          />
        </div>
        <div className="mb-2 mt-0 text-xl font-bold leading-tight text-black text-center lg:text-left">
          Profile Creation and Setup
        </div>

        <div className="flex gap-4">
          <div>
            <Input
              label="Job Titles/Positions of Interest:"
              placeholder="Enter job title here"
              name="job_titles_of_interest"
              value={employeDetails?.job_titles_of_interest}
              onChange={handleChange}
            />
            <MultiSelectComponent
              isMulti={false}
              label="Total Years of Experience:"
              options={experienceOptions}
              value={employeDetails.total_years_of_experience}
              onChange={(selected) =>
                handleMultiSelectChange("total_years_of_experience", selected)
              }
            />
            <MultiSelectComponent
              isMulti={false}
              label="Education Level:"
              options={educationLevelOptions}
              value={employeDetails.education_level}
              onChange={(selected) =>
                handleMultiSelectChange("education_level", selected)
              }
            />
          </div>

          <div className="w-[320px]">
            <label className="text-[12px] mt-1 font-semibold">
              Add Skills:
            </label>
            <input
              type="text"
              value={skill}
              onChange={handleSearchSkill}
              placeholder="search skill here"
              className="border rounded-[8px] outline-none border-gray-600 text-[14px] ml-2 px-2 py-1"
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
                  <label className="text-[14px] text-gray-600">{item}</label>
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

            <div className="w-full h-[200px] overflow-y-auto">
              <ul className="flex flex-wrap gap-1">
                {displayedSkills?.map((item, index) => (
                  <>
                    <li
                      key={index}
                      className="w-[100px] relative h-fit bg-gradient-to-r from-blue-100 to-gray-200 text-white rounded-lg p-2 shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
                    >
                      <div
                        onClick={() => handleRemove(item.name)}
                        className="absolute right-1 top-1 cursor-pointer w-[12px] h-[12px] bg-black flex justify-center items-center rounded-full"
                      >
                        <RxCross2 className="text-white" size={10} />
                      </div>
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
          </div>
        </div>
        <Button
          text="Next"
          type="button"
          color="white"
          textColor="blue"
          size="lg"
          className="mt-6 border border-blue-800"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ProfileCreation;
