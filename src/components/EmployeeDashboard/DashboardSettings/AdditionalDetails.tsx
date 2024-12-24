// import { CandidateProfileType } from "../../../types";
import { ChangeEvent } from "react";
import { GrDocumentPdf } from "react-icons/gr";

const AdditionalDetails = ({ formData, setFormData, errors, edit }: any) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: files[0],
      }));
    }
  };


  return (
    <fieldset className="border border-black p-4 rounded-md">
      <legend>Additional Details</legend>
      <div className="flex flex-col">
        <div className="w-full flex flex-row gap-[15px] space-y-1">
          <label className="text-left mt-3">Upload Resume :</label>
          {edit === true && (
            <div className="flex justify-center items-center border border-gray-400 p-1 rounded-xl">
              <a
                href={`https://salarysafe.ai/static/${formData?.resume_upload}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:text-blue-700"
              >
                <GrDocumentPdf size={15} />
                <span className="ml-2">View Resume</span>
              </a>
            </div>
          )}

          {edit === false && (
            <input
              // value={formData.resume_upload}
              type="file"
              disabled={edit}
              accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .doc, .docx"
              name="resume_upload"
              onChange={handleFileChange}
              className="border p-2 w-[350px] rounded"
            />
          )}

          {edit === true && (
            <div className="flex justify-center text-[10px] items-center">
              {formData.resume_upload.split("/").pop()}
            </div>
          )}

          {errors.resume_upload && (
            <small className="text-red-600 font-bold text-sm">
              {errors.resume_upload}
            </small>
          )}
        </div>

        <div className="w-full flex flex-row gap-[15px] mt-5 space-y-1">
          <label className="text-left mt-3">Upload Cover Letter :</label>
          {edit === true && (
            <div className="flex justify-center items-center border border-gray-400 p-1 rounded-xl">
              <a
                href={`https://salarysafe.ai/static/${formData?.cover_letter_upload}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:text-blue-700"
              >
                <GrDocumentPdf size={15} />
                <span className="ml-2">View cover</span>
              </a>
            </div>
          )}

          {edit === false && (
            <input
              disabled={edit}
              type="file"
              accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .doc, .docx"
              name="cover_letter_upload"
              onChange={handleFileChange}
              className="border p-2 w-[400px] rounded"
            />
          )}

          {edit === true && (
            <div className="flex justify-center text-[10px] items-center">
              {formData?.cover_letter_upload.split("/").pop()}
            </div>
          )}

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
