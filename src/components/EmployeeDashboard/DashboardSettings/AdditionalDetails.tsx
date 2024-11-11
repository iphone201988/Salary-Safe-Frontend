// import { CandidateProfileType } from "../../../types";
import { ChangeEvent } from "react";

const AdditionalDetails = ({
  formData,
  setFormData,
  errors,
  edit
}: any) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: files[0],
      }));
    }
  };

  console.log("formData", formData);

  return (
    <fieldset className="border border-black p-4 rounded-md">
      <legend>Additional Details</legend>
      <div className="flex flex-col">
        <div className="w-full flex flex-col space-y-1">
          <label className="text-left">Upload Resume:</label>
          <input
            type="file"
            disabled={edit}
            accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .doc, .docx"
            name="resume_upload"
            onChange={handleFileChange}
            className="border p-2 w-full rounded"
          />
          {errors.resume_upload && (
            <small className="text-red-600 font-bold text-sm">
              {errors.resume_upload}
            </small>
          )}
        </div>

        <div className="w-full flex flex-col space-y-1">
          <label className="text-left">Upload Cover Letter</label>
          <input
          disabled={edit}
            type="file"
            accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .doc, .docx"
            name="cover_letter_upload"
            onChange={handleFileChange}
            className="border p-2 w-full rounded"
          />
          {errors.cover_letter_upload && (
            <small className="text-red-600 font-bold text-sm">
              {errors.cover_letter_upload}
            </small>
          )}
        </div>
      </div>
    </fieldset>
  );
};

export default AdditionalDetails;
