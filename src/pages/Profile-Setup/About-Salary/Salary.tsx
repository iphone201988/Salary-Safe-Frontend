import { useNavigate } from "react-router-dom";
import {
  benefitsOptions,
  salaryTypeOptions,
  viewSalaryPermissionOptions,
} from "../../Candidate/Auth/Employee/SignUp/options";
import Button from "../../Register/Button/Button";
import Input from "../../Register/Input/Input";
import MultiSelectComponent from "../MultiSelect/Multi";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ABoutSalary = () => {
  const navigate = useNavigate();
  const [genernalSalary, setGenernalSalary] = useState("");
  const [accecptsalary, setAccecptsalary] = useState("");
  const [viewSalaryPermission, setViewSalaryPermission] = useState<any>();
  const [benefits, setBenefits] = useState<any>();
  const [salaryType, setSalaryType] = useState<any>();
  const [open_to_performance_based_compensation, set_open_to_performance_based_compensation] = useState(false);
  const [willing_to_negociate, set_willing_to_negociate] = useState(false);
  const [hide_profile_from_current_employer, set_hide_profile_from_current_employer] = useState(false);
  const token = useSelector((state: any) => state.auth.token);
const handleSubmit = async () => {
  // Prepare the API request payload
  const data = {
    general_salary_range: genernalSalary,
    minimum_acceptable_salary: Number(accecptsalary),
    preferred_benefits: benefits.map((benefit:any)=>{return benefit?.value}),
    view_salary_expectations: viewSalaryPermission?.value,
    open_to_performance_based_compensation: open_to_performance_based_compensation,
    willing_to_negociate: willing_to_negociate,
    hide_profile_from_current_employer: hide_profile_from_current_employer,
    preferred_salary_type: salaryType?.value,
  };

  try {
    // Make the API call using Axios
    await axios.patch(
      'https://salarysafe.ai/api/v1/candidates/me',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    // Navigate to the next page
    navigate('/profile/job-search');
  } catch (error) {
    console.error('Error updating candidate details:', error);
    // Optionally handle the error (e.g., show a message to the user)
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
        onClick={()=>navigate("/profile/job-search")}
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
          Salary Expectations
        </div>

        <div className="flex gap-4">
          <div>
            <div className="w-full">
              <Input
                label="General Salary Range:"
                placeholder="enter salary range here"
                name="genernalSalary"
                value={genernalSalary}
                onChange={(e) => setGenernalSalary(e.target.value)}
              />
              <MultiSelectComponent
                isMulti={false}
                label="Preferred Salary Type:"
                options={salaryTypeOptions}
                value={salaryType}
                onChange={(selected) => setSalaryType(selected)}
              />
            </div>

            <div className="w-full flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="open_to_performance_based_compensation"
                name="open_to_performance_based_compensation"
                checked={open_to_performance_based_compensation}
                onChange={e =>set_open_to_performance_based_compensation(e.target.checked)}
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
                checked={willing_to_negociate}
                onChange={ e => set_willing_to_negociate(e.target.checked)}
              />
              <label htmlFor="willing_to_negociate">
                Willing to Negotiate?
              </label>
            </div>
          </div>

          <div className="w-[320px]">
            <Input
              label="Minimum Acceptable Salary (Optional):"
              placeholder="enter minium salary here"
              type="number"
              name="accecptsalary"
              value={accecptsalary}
              onChange={(e) => setAccecptsalary(e.target.value)}
            />

            <MultiSelectComponent
              isMulti={true}
              label="Preferred Benefits:"
              options={benefitsOptions}
              value={benefits}
              onChange={(selected) => setBenefits(selected)}
            />
            <MultiSelectComponent
              isMulti={false}
              label="Who can view your salary expectations?"
              options={viewSalaryPermissionOptions}
              value={viewSalaryPermission}
              onChange={(selected) => setViewSalaryPermission(selected)}
            />
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="hide_profile_from_current_employer"
                name="hide_profile_from_current_employer"
                  checked={hide_profile_from_current_employer}
                  onChange={ e => set_hide_profile_from_current_employer(e.target.checked)}
              />
              <label htmlFor="hide_profile_from_current_employer">
                Hide my profile from current employer(s)
              </label>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          {/* <Button
            text="Back"
            type="button"
            color="green"
            textColor="white"
            size="md"
            className="mt-4 text-center bg-[#ef4444]"
            onClick={() => navigate("/profile/add-skill")}
          /> */}
          <Button
            text="Submit"
            type="button"
            color="green"
            textColor="black"
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
