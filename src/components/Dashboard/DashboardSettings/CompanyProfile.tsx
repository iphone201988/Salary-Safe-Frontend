import { /* Autocomplete, */ useLoadScript } from "@react-google-maps/api";
import InputField from "../../InputField/InputField";
import { CompanyProfileType } from "../../../types";
import { industrys } from "../../../utils/helper";
import { useEffect, /* useRef,  */ useState } from "react";
// import { setemployeerDetails } from "../../../Redux/reducer/userData";
// import { useDispatch } from "react-redux";
import LocationSearch from "../../LocationSearch";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { setemployeerDetails } from "../../../Redux/reducer/userData";
import { useDispatch } from "react-redux";

interface Location {
  id: string;
  city: string;
  country: string;
  location_multiplier: number;
}

const CompanyProfile = ({
  formData,
  errors,
  setFormData,
  handleChange,
  edit,
}: CompanyProfileType) => {
  const libraries: any = ["places"];
  const dispatch = useDispatch();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBFBwlTTtqbm5uwk0tIWEOEwR9CXSeCJuA",
    libraries,
  });
  const { employeerDetails } = useSelector((state: RootState) => state.user);

  const [selectedLocations, setSelectedLocations] = useState<Location[] | any>(
    []
  );

  // const handlePlaceSelect = () => {
  //   const place = autocompleteRef.current?.getPlace();
  //   if (place && place.formatted_address) {
  //     // setFormData({ ...formData, location: place.formatted_address });
  //   }
  // };

  // const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (selectedLocations) {
      // dispatch(
      //   setemployeerDetails({
      //     ...employeerDetails,
      //     headquarters_location: `${selectedLocations[0]?.city === undefined ? "":selectedLocations[0]?.city} ${selectedLocations[0] ? ",":" "} ${selectedLocations[0]?.country === undefined ? "":selectedLocations[0]?.country}`,
      //   })
      // );

      setFormData({
        ...formData,
        companyLocation: `${
          selectedLocations[0]?.city === undefined
            ? ""
            : selectedLocations[0]?.city
        } ${selectedLocations[0] ? "," : " "} ${
          selectedLocations[0]?.country === undefined
            ? ""
            : selectedLocations[0]?.country
        }`,
      });
    }
  }, [selectedLocations]);

  console.log(
    "employeerDetails?.headquarters_location:::",
    employeerDetails?.headquarters_location
  );
  return (
    <fieldset className="border border-black p-4 rounded-md">
      <legend>Company Information</legend>
      <div className="flex flex-col">
        <div className="flex w-full space-x-2">
          <div className="w-full">
            <InputField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              error={errors.companyName}
              view={edit}
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700">Industry</label>
            <select
              name="industry"
              className={`border border-black rounded-md w-full p-2 ${
                errors?.industry && "border-red-600"
              }`}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              disabled={edit}
              value={formData.industry}
            >
              <option value="">Select Industry</option>
              {industrys.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
            </select>
            {errors?.industry && (
              <small className="text-red-600 font-bold text-sm">
                {errors.industry}
              </small>
            )}
          </div>
          <div className="w-full">
            <label className="block text-gray-700">Company Size</label>
            <select
              name="companySize"
              className={`border border-black rounded-md w-full p-2 ${
                errors?.companySize && "border-red-600"
              }`}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              value={formData.companySize}
              disabled={edit}
            >
              <option value="">Select Size</option>
              <option value="0-10">0-10</option>
              <option value="10-50">10-50</option>
              <option value="50-100">50-100</option>
              <option value="100 or above">100 or above</option>
            </select>
            {errors?.companySize && (
              <small className="text-red-600 font-bold text-sm">
                {errors.companySize}
              </small>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full space-x-2">
        {/* {isLoaded && (
          <div className="w-full">
            <label className="block text-gray-700">Headquarters</label>
            <Autocomplete
              onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              }
              onPlaceChanged={handlePlaceSelect}
            >
              <input
                name="companyLocation"
                value={formData.companyLocation}
                onChange={handleChange}
                placeholder="Search location"
                className={`border border-black rounded-md w-full p-2 ${
                  errors?.companyLocation && "border-red-600"
                }`}
                disabled={edit}
              />
            </Autocomplete>
            {errors?.companyLocation && (
              <small className="text-red-600 font-bold text-sm">
                {errors.companyLocation}
              </small>
            )}
          </div>
        )} */}
        <div className="w-full">
          <InputField
            label="Primary Contact"
            name="PrimaryContact"
            value={formData.PrimaryContact}
            onChange={handleChange}
            error={errors?.PrimaryContact}
            view={edit}
          />
        </div>
        <div className="w-full">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            view={edit}
          />
        </div>
        <div className="w-full">
          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            view={edit}
          />
        </div>
      </div>

      <div className="flex w-full space-x-2">
        {/* <div className="w-full">
          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            view={edit}
          />
        </div> */}

        {isLoaded && (
          <div className="w-full">
            <label className="block text-gray-700">Company Location :</label>
            {edit === false && (
              <LocationSearch
                placeholder="Search locations..."
                apiEndpoint="https://salarysafe.ai/api/v1/utils/locations/search"
                onSelectionChange={(locations: any) => {
                  setSelectedLocations(locations);
                }}
                selectMode="single"
                city={employeerDetails?.headquarters_location.split(",")[0]}
                country={employeerDetails?.headquarters_location.split(",")[1]}
              />
            )}
            {edit === true && (
              <div className="border border-black w-full rounded-lg p-1 bg-gray-100">
                {employeerDetails?.headquarters_location}
              </div>
            )}
          </div>
        )}
        {/* Company Size Select */}
        {/* <div className="w-full">
          <label className="block text-gray-700">Company Size</label>
          <select
            name="size"
            className={`border border-black rounded-md w-full p-2 `}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            // value={formData.size}
            disabled={edit}
          >
            <option value="">Select Size</option>
            <option value="0-10">0-10</option>
            <option value="10-50">10-50</option>
            <option value="50-100">50-100</option>
            <option value="100 or above">100 or above</option>
          </select>
        </div> */}
      </div>
      {/* Industry Select */}
      {/* <div className="w-full">
        <label className="block text-gray-700">Industry</label>
        <select
          name="industry"
          className={`border border-black rounded-md w-full p-2 `}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          value={formData.industry}
          disabled={edit}
        >
          <option value="">Select Industry</option>
          {industrys.map((data, index) => (
            <option key={index} value={data}>
              {data}
            </option>
          ))}
        </select>
      </div> */}
    </fieldset>
  );
};

export default CompanyProfile;
