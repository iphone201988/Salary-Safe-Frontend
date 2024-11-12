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

  console.log("formData", formData);
  console.log("formData", formData?.resume_upload != null);

  return (
    <fieldset className="border border-black p-4 rounded-md">
      <legend>Additional Details</legend>
      <div className="flex flex-col">
        <div className="w-full flex flex-row gap-[15px] space-y-1">
          <label className="text-left mt-3">Upload Resume :</label>
          {formData.resume_upload ? (
            <div className="flex justify-center items-center">
            <a 
              href="https://example.com/resume.pdf"
              download="resume.pdf"      
              className="flex items-center text-blue-500 hover:text-blue-700"
            >
              <GrDocumentPdf size={30} />
              <span className="ml-2">Download Resume</span>
            </a>
          </div>
          ) : (
            <input
              type="file"
              disabled={edit}
              accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .doc, .docx"
              name="resume_upload"
              onChange={handleFileChange}
              className="border p-2 w-[350px] rounded"
            />
          )}

          {errors.resume_upload && (
            <small className="text-red-600 font-bold text-sm">
              {errors.resume_upload}
            </small>
          )}
        </div>

        <div className="w-full flex flex-row gap-[15px] mt-5 space-y-1">
          <label className="text-left mt-3">Upload Cover Letter :</label>
          {
            formData?.cover_letter_upload  ? (
              <div className="flex justify-center items-center">
            <a 
              href="https://example.com/resume.pdf"
              download="cover.pdf"      
              className="flex items-center text-blue-500 hover:text-blue-700"
            >
              <GrDocumentPdf size={30} />
              <span className="ml-2">Download cover</span>
            </a>
          </div>
            ):(
<input
            disabled={edit}
            type="file"
            accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .doc, .docx"
            name="cover_letter_upload"
            onChange={handleFileChange}
            className="border p-2 w-[400px] rounded"
          />
            )
          }
          
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
