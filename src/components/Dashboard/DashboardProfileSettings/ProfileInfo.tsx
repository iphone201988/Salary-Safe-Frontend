type ProfileInfoProps = {
  companyName: string;
  location: string;
  email: string;
  phone: string;
};
const ProfileInfo = ({
  companyName,
  location,
  email,
  phone,
}: ProfileInfoProps) => {
  return (
    <div className="flex flex-col">
      <div>
        <img
          className="h-15 w-15 rounded-full object-cover"
          src="https://via.placeholder.com/150"
          alt="Profile Pic"
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <h3 className="text-lg font-bold">{companyName}</h3>
        {/* <p className="text-sm text-gray-500">{location}</p>
        <p className="text-sm text-gray-500">{email}</p>
        <p className="text-sm text-gray-500">{phone}</p> */}
        <div className="flex gap-x-2 items-center">
          {/* <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px
      rounded-md"
            onClick={() => handleEditClick("profile")}
          >
            Edit
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
