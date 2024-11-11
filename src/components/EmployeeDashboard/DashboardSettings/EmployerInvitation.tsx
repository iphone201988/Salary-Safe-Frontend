// import { CandidateProfileType } from "../../../types";
 
  const EmployerInvitation = ({
    formData,
    setFormData,
    errors,
    edit,
  }: any) => {
   
    const handleCheckboxChange = (field: string) => {
      setFormData({ ...formData, [field]: !formData[field] });
    };
  
  
    return (
      <fieldset className="border border-black p-4 rounded-md">
        <legend>Employer Invitation</legend>
        <div className="flex flex-col">
          <div className="flex w-full space-x-2">
            
            <div className="w-1/2 mt-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.invite_employer}
                  onChange={() =>
                    handleCheckboxChange("invite_employer")
                  }
                  disabled={edit}
                  className="h-4 w-4"
                />
                <span>Invite an employer to participate in Salary-Safe?</span>
              </label>
              {errors.invite_employer && (
                <p className="text-red-500 text-xs">
                  {errors.invite_employer}
                </p>
              )}
            </div>
          </div>
        </div>
      </fieldset>
    );
  };
  
  export default EmployerInvitation;
  