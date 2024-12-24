import { useNavigate } from "react-router-dom";
import {
  hiringGoalsOptions,
  JobTypeOptions,
  preferedJobLocationOption,
  rolesPostionOptions,
} from "../../Candidate/Auth/Employee/SignUp/options";
import Button from "../../Register/Button/Button";
// import Input from "../../Register/Input/Input";
import MultiSelectComponent from "../MultiSelect/Multi";
import { useDispatch } from "react-redux";
import { setemployeerDetails } from "../../../Redux/reducer/userData";
import { useSelector } from "react-redux";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import { validateForm } from "../../../Schema/Schemas";

const GoalsPreference = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employeerDetails } = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.auth.token);
  const [errors, setErrors] = useState<any>({});

  const goalsValidationSchema = Yup.object({
    job_types: Yup.array()
      .min(1, "At least one Job type is required")
      .required("Job types are required"),
    roles_of_interest: Yup.array()
      .min(1, "At least one Role of interest is required")
      .required("Role of interests are required"),
    preferred_job_locations: Yup.array()
      .min(1, "At least one Preferred job location is required")
      .required("Preferred job locations are required"),
    primary_hiring_goals: Yup.array()
      .min(1, "At least one Primary hiring goal is required")
      .required("Primary hiring goals are required"),
  });

  const handleMultiSelectChange = (field: string, selectedOptions: any) => {
    dispatch(
      setemployeerDetails({ ...employeerDetails, [field]: selectedOptions })
    );
  };
  const handleSubmit = async () => {
    const formattedErrors = await validateForm(goalsValidationSchema, {
      job_types: employeerDetails?.job_types,
      roles_of_interest: employeerDetails?.roles_of_interest,
      preferred_job_locations: employeerDetails?.preferred_job_locations,
      primary_hiring_goals: employeerDetails?.primary_hiring_goals,
    });

    if (formattedErrors) {
      setErrors(formattedErrors);
      return;
    }

    const formData = new FormData();
    formData.append(
      `job_types`,
      JSON.stringify(
        employeerDetails?.job_types?.map((data: any) => {
          return data?.value;
        })
      )
    );
    formData.append(
      `roles_of_interest`,
      JSON.stringify(
        employeerDetails?.roles_of_interest?.map((data: any) => {
          return data?.value;
        })
      )
    );
    formData.append(
      `preferred_job_locations`,
      JSON.stringify(
        employeerDetails?.preferred_job_locations?.map((data: any) => {
          return data?.value;
        })
      )
    );
    formData.append(
      `primary_hiring_goals`,
      JSON.stringify(
        employeerDetails?.primary_hiring_goals?.map((data: any) => {
          return data?.value;
        })
      )
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
        navigate("/profile/dashboard-customization");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-[550px] relative border border-gray-400 px-4 py-8 rounded-[20px] flex flex-col lg:flex-row justify-center items-center bg-[#ffffff]">
      
      {/* <Button
        text="Skip"
        type="button"
        color="green"
        textColor="white"
        size="md"
        className="mt-4 text-center bg-black absolute right-3 top-0"
        onClick={() => navigate("/profile/dashboard-customization")}
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
          Hiring Goals and Preferences
        </div>

        <div className="flex gap-4">
          <div>
            <div className="w-[500px]">
              {/* <Input
                label="Job Titles/Positions of Interest:"
                placeholder="enter job title here"
              /> */}
              <MultiSelectComponent
                isMulti={true}
                label="Primary Hiring Goals"
                options={hiringGoalsOptions}
                onChange={(selected) =>
                  handleMultiSelectChange("primary_hiring_goals", selected)
                }
                value={employeerDetails.primary_hiring_goals}
                error={errors?.primary_hiring_goals}
              />
              <MultiSelectComponent
                isMulti={true}
                label="Preferred Job Locations"
                options={preferedJobLocationOption}
                onChange={(selected) =>
                  handleMultiSelectChange("preferred_job_locations", selected)
                }
                value={employeerDetails.preferred_job_locations}
                error={errors?.preferred_job_locations}
              />

              <MultiSelectComponent
                isMulti={true}
                label="Roles/Positions of Interest"
                options={rolesPostionOptions}
                onChange={(selected) =>
                  handleMultiSelectChange("roles_of_interest", selected)
                }
                value={employeerDetails.roles_of_interest}
                error={errors?.roles_of_interest}
              />
              <MultiSelectComponent
                isMulti={true}
                label="Job Type"
                options={JobTypeOptions}
                onChange={(selected) =>
                  handleMultiSelectChange("job_types", selected)
                }
                value={employeerDetails.job_types}
                error={errors?.job_types}
              />
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
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default GoalsPreference;
