import { useNavigate } from "react-router-dom";
import {
  jobAlertsFrequencyOptions,
  notificationPreferencesOptions,
  referralSourceOptions,
} from "../../Candidate/Auth/Employee/SignUp/options";
import Button from "../../Register/Button/Button";
import Input from "../../Register/Input/Input";
import MultiSelectComponent from "../MultiSelect/Multi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setemployeDetails } from "../../../Redux/reducer/userData";
import axios from "axios";
import { useState } from "react";
import * as Yup from "yup";
import { validateForm } from "../../../Schema/Schemas";

const AdditionalDetail = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { employeDetails } = useSelector((state: any) => state.user);
  const token = useSelector((state: any) => state.auth.token);
  const [files, setFiles] = useState({
    resume: null,
    coverLetter: null,
  });
  const [errors, setErrors] = useState<any>({});

  const additionalDetailsValidationSchema = Yup.object({
    notification_preferences: Yup.array()
      .min(1, "At least one notification preference is required")
      .required("Notification preferences are required"),
    job_alerts_frequency: Yup.string().required(
      "Job alert frequency is required"
    ),
    referral_source: Yup.string().required("Referral source is required"),
    resume_upload: Yup.string().required("Resume is required"),
    cover_letter_upload: Yup.string().required("Cover letter is required"),
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "resume" | "coverLetter"
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [type]: file,
    }));
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

  const handleSubmit = async () => {
    const formattedErrors = await validateForm(
      additionalDetailsValidationSchema,
      {
        notification_preferences: employeDetails?.notification_preferences,
        job_alerts_frequency: employeDetails?.job_alerts_frequency?.value,
        referral_source: employeDetails?.referral_source?.value,
        resume_upload: files?.resume,
        cover_letter_upload: files?.coverLetter,
      }
    );
    if (formattedErrors) {
      setErrors(formattedErrors);
      return;
    }

    const formData = new FormData();
    formData.append(
      "notification_preferences",
      JSON.stringify(
        employeDetails.notification_preferences?.map((data: any) => {
          return data?.value;
        })
      )
    );
    formData.append(
      "job_alerts_frequency",
      JSON.stringify(employeDetails.job_alerts_frequency?.value)
    );
    formData.append("referral_source", employeDetails.referral_source?.value);
    formData.append("referral_code", employeDetails.referral_code);

    if (files.resume) formData.append("resume_upload", files.resume);
    if (files.coverLetter)
      formData.append("cover_letter_upload", files.coverLetter);

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
      navigate("/candidate/dashboard");
    } catch (error) {
      console.error("Error updating candidate details:", error);
    }
  };
  return (
    <div className="w-[750px] relative border border-gray-400 px-4 py-8 rounded-[20px] flex flex-col lg:flex-row justify-center items-center bg-[#ffffff]">
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
          <div className="w-full">
            <div className="w-full flex flex-col space-y-1">
              <label className="text-left">Upload Resume (Optional):</label>
              <input
                type="file"
                accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.doc,.docx"
                name="resume_upload"
                className="border p-2 w-full rounded"
                onChange={(e) => handleFileChange(e, "resume")}
              />
              {errors.resume_upload && (
                <span className=" text-red-600 text-sm font-bold">
                  {errors.resume_upload}
                </span>
              )}
            </div>
            <div className="w-full flex flex-col space-y-1">
              <label className="text-left">
                Upload Cover Letter (Optional):
              </label>
              <input
                type="file"
                accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.doc,.docx"
                name="cover_letter_upload"
                className="border p-2 w-full rounded"
                onChange={(e) => handleFileChange(e, "coverLetter")}
              />
              {errors.cover_letter_upload && (
                <span className=" text-red-600 text-sm font-bold">
                  {errors.cover_letter_upload}
                </span>
              )}
              {/* <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="invite_employer"
                  name="invite_employer"
                  // checked={formData.invite_employer}
                  // onChange={handleChange}
                />
                <label htmlFor="invite_employer">
                  Invite an employer to participate in Salary-Safe?
                </label>
              </div> */}
              {/* {true && (
                <>
                  <Input
                    label="Employer Name"
                    name="employer_name"
                    placeholder="Enter Employer Name"
                  />
                  <Input
                    label="Contact Person’s Name"
                    name="contact_person_name"
                    placeholder="Enter Contact Person’s Name here"
                  />
                  <Input
                    label="Contact Email"
                    type="email"
                    name="contact_email"
                    placeholder="Enter Contact Email here"
                  />
                  <Input
                    label="Message to Employer (optional)"
                    name="message_to_employer"
                    placeholder="Enter Message to Employer"
                  />
                </>
              )} */}

              <MultiSelectComponent
                isMulti={true}
                label="Receive notifications via:"
                options={notificationPreferencesOptions}
                value={employeDetails?.notification_preferences}
                onChange={(selected) =>
                  handleMultiSelectChange("notification_preferences", selected)
                }
                error={errors?.notification_preferences}
              />
            </div>
          </div>

          <div className="w-[320px]">
            <MultiSelectComponent
              isMulti={false}
              label="Job Alerts Frequency:"
              options={jobAlertsFrequencyOptions}
              value={employeDetails?.job_alerts_frequency}
              onChange={(selected) =>
                handleMultiSelectChange("job_alerts_frequency", selected)
              }
              error={errors?.job_alerts_frequency}
            />

            <MultiSelectComponent
              isMulti={false}
              label="How did you hear about us?:"
              options={referralSourceOptions}
              value={employeDetails?.referral_source}
              onChange={(selected) =>
                handleMultiSelectChange("referral_source", selected)
              }
              error={errors?.referral_source}
            />

            <Input
              label="Referral Code (Optional)"
              name="referral_code"
              placeholder="Enter Referral Code"
              value={employeDetails?.referral_code}
              onChange={handleChange}
              errorMessage={errors?.referral_code}
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

export default AdditionalDetail;
