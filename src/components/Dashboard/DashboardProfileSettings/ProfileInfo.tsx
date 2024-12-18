import { useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import EditableField from "./EditableField";

type ProfileInfoProps = {
  companyName: string;
  location: string;
  email: string;
  phone: string;
  size: string;
};

const ProfileInfo = ({
  companyName,
  location,
  email,
  phone,
  size,
}: ProfileInfoProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const handleEdit = () => setIsEditable((prev) => !prev);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    console.log(`${field} updated: `, e.target.value);
  };

  return (
    <div className="w-full flex gap-4">
      <div className="w-[20%]">
        <div className="w-full flex justify-center items-center">
          <img
            className="rounded-full text-center object-cover"
            height={100}
            width={100}
            src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
            alt="Profile Pic"
          />
        </div>

        <div className="w-[100%] flex flex-col gap-y-2">
          <h3 className="text-lg text-center font-bold">{companyName}</h3>
          <div className="text-center">
            <span className="font-bold text-sm">{location}</span>
          </div>
        </div>
      </div>
      <div className="w-[90%]">
        <div className="w-full flex justify-end">
          <div
            onClick={handleEdit}
            className="cursor-pointer h-[30px] w-[30px] border-2 border-black flex justify-center items-center"
          >
            <FaPenToSquare />
          </div>
        </div>
        <div className="h-[50%] flex justify-around gap-3">
          <EditableField
            label="Company size"
            value={size}
            isEditable={isEditable}
            onChange={(e) => handleInputChange(e, "size")}
          />
          <EditableField
            label="Email"
            value={email}
            isEditable={isEditable}
            onChange={(e) => handleInputChange(e, "email")}
          />
          <EditableField
            label="Phone number"
            value={phone}
            isEditable={isEditable}
            onChange={(e) => handleInputChange(e, "phone")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
