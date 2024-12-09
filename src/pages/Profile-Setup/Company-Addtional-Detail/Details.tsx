import { useNavigate } from "react-router-dom";
import { referralSourceOptions } from "../../Candidate/Auth/Employee/SignUp/options";
import Button from "../../Register/Button/Button";
import Input from "../../Register/Input/Input";
import MultiSelectComponent from "../MultiSelect/Multi";
import { useState } from "react";
import { TeamMember } from "../../../types";

const Details = () => {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: "", email: "", role: "" },
  ]);
  const handleAddMember = () => {
    setTeamMembers([...teamMembers, { name: "", email: "", role: "" }]);
  };

  const handleInputChange = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    const newMembers = [...teamMembers];
    newMembers[index][field] = value;
    setTeamMembers(newMembers);
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
        // onClick={() => navigate("/profile/")}
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
          Additional Details
        </div>

        <div className="flex gap-4">
          <div className="w-[320px] gap-3 flex flex-col">
          {teamMembers.map((member:any, index:any) => (
            <div key={index} className="w-[300px] h-[120px] p-3 flex gap-3 flex-col justify-center items-center bg-white shadow-lg rounded-lg border border-gray-300">
              <input
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter team member"
                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                value={member.name}
              />
              <input
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                onChange={(e) => handleInputChange(index, "email", e.target.value)}
                value={member.email}
              />
              <div className="flex gap-2">
                <div className="w-[100px] font-sm text-gray-700">
                  Select role :
                </div>
                <select
                  className="text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue=""
                  onChange={(e) => handleInputChange(index, "role", e.target.value)}
                  value={member.role}
                >
                  <option value="">Select role</option>
                  <option value="Admin">Admin</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
            </div>
            ))}
            <button
              onClick={handleAddMember}
              className="mt-2 text-sm rounded-xl p-2 w-[150px] bg-blue-400"
            >
              Add Another
            </button>
          </div>

          <div className="w-[320px]">
            <MultiSelectComponent
              isMulti={false}
              label="How did you hear about us?:"
              options={referralSourceOptions}
            />

            <Input
              label="Referral Code (Optional)"
              name="referral_code"
              placeholder="Enter Referral Code"
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
            onClick={() => navigate("/profile/dashboard-customization")}
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

export default Details;
