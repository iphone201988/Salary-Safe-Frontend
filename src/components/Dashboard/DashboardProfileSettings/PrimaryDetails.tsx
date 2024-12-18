import { FaPenToSquare } from "react-icons/fa6";
import DetailList from "./DetailList";

type PrimaryDeatilProps = {
  hiringGoal?: Array<string>;
  preferedjobLocation?: Array<string>;
  rolesOfInterest?: Array<string>;
  JobTypes?: Array<string>;
};

const PrimaryDetails = ({
  hiringGoal,
  preferedjobLocation,
  rolesOfInterest,
  JobTypes,
}: PrimaryDeatilProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-end">
        <div className="cursor-pointer h-[30px] w-[30px] border-2 border-black flex justify-center items-center">
          <FaPenToSquare />
        </div>
      </div>
      <div className="w-full flex gap-4">
        <div className="w-[50%]">
          <DetailList title="Hiring Goals" items={hiringGoal} />
          <DetailList
            title="Preferred Job Locations"
            items={preferedjobLocation}
          />
        </div>

        <div className="w-[50%]">
          <DetailList title="Role of Interest" items={rolesOfInterest} />
          <DetailList title="Job Types" items={JobTypes} />
        </div>
      </div>
    </div>
  );
};

export default PrimaryDetails;
