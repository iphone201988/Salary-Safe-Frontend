import { useState } from "react";
import {
  educationLevelOptions,
  experienceOptions,
} from "../../Candidate/Auth/Employee/SignUp/options";
import Button from "../../Register/Button/Button";
import Input from "../../Register/Input/Input";
import MultiSelectComponent from "../MultiSelect/Multi";
import { useNavigate } from "react-router-dom";

const ProfileCreation = () => {
  const navigate = useNavigate();
  const value = [`1`, `2`, `3`, `4`, `5`];
  const [skill, setSkill] = useState("");
  const [selectedProficiency, setSelectedProficiency] = useState<any>("");
  const [skillsList, setSkillsList] = useState<any>([]);
  const [showAll, setShowAll] = useState(false);
  const displayedSkills = showAll ? skillsList : skillsList.slice(0, 5);

  const handleAddSkill = () => {
    if (
      skill.trim() !== "" &&
      selectedProficiency !== "" &&
      !skillsList.some((s: any) => s.skill === skill.trim())
    ) {
      setSkillsList([
        ...skillsList,
        { skill: skill.trim(), proficiency: selectedProficiency },
      ]);
      setSkill("");
      setSelectedProficiency("");
    }
  };

  const handleRadioChange = (selected: any) => {
    setSelectedProficiency(selected);
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
            <div className="w-full">
              <Input
                label="Job Titles/Positions of Interest:"
                placeholder="enter job title here"
              />
              <MultiSelectComponent
                isMulti={false}
                label="Total Years of Experience:"
                options={experienceOptions}
              />
            </div>

            <MultiSelectComponent
              isMulti={false}
              label="Education Level:"
              options={educationLevelOptions}
            />
          </div>

          <div className="w-[320px]">
            <div className="w-full m-2 flex flex-col">
              <label className="text-[12px] mt-1 font-semibold">
                Add Skills :
              </label>

              <input
                type="text"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="Enter skill here"
                className="border rounded-[8px] outline-none border-gray-600 text-[14px] ml-2 px-2 py-1"
              />

              {skill && (
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
              )}

              <div className="w-full flex justify-center p-2">
                <div
                  className="h-[30px] text-[12px] w-[70px] text-center border border-gray-400 rounded-[8px] flex justify-center items-center cursor-pointer"
                  onClick={handleAddSkill}
                >
                  Add
                </div>
              </div>
            </div>

            <div className="w-full">
              <ul className="flex flex-wrap gap-4">
                {displayedSkills.map((item: any, index: any) => (
                  <li
                    key={index}
                    className="bg-gradient-to-r from-blue-100 to-purple-400 text-white rounded-lg p-2 shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"
                  >
                    <div className="font-semibold text-[14px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      {item.skill}
                    </div>
                    <div className="text-[12px] text-black">
                      Proficiency: {item.proficiency}
                    </div>
                  </li>
                ))}
              </ul>
              {skillsList.length > 5 && !showAll && (
                <button
                  onClick={() => setShowAll(true)}
                  className="mt-4 text-blue rounded-full bg-gradient-to-r from-white to-red-300 hover:from-pink-600 hover:to-red-600 py-2 px-4 transition-all duration-300"
                >
                  Show all
                </button>
              )}
              {skillsList.length > 5 && showAll && (
                <button
                  onClick={() => setShowAll(false)}
                  className="mt-4 text-blue rounded-full bg-gradient-to-r from-white to-red-300 hover:from-pink-600 hover:to-red-600 py-2 px-4 transition-all duration-300"
                >
                  Show less
                </button>
              )}
            </div>
          </div>
        </div>
        <Button
          text="submit"
          type="button"
          color="green"
          textColor="white"
          size="md"
          className="mt-4 text-center bg-[green]"
        />
      </div>
    </div>
  );
};

export default ProfileCreation;
